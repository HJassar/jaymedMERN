import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';

import './CommentSection.css';

import { Redirect, useLocation } from 'react-router-dom';

import { connect } from 'react-redux'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const localToken = localStorage.getItem('token')

const mapStateToProps = state => ({
    currentUser: state.currentUser.currentUser
})

const Comment = connect(mapStateToProps)(({ textCommentProp, commentorProp, currentUser, commentId }) => {

    const [children, setChildren] = useState([])
    const [commentText, setCommentText] = useState(
        textCommentProp !== undefined ? textCommentProp : 'Loading'
    );
    const [commentor, setCommentor] = useState(commentorProp);
    const [loaded, setLoaded] = useState(textCommentProp !== undefined ? true : false)
    const [commentClass, setCommentClass] = useState('Comment')

    const [hiddenComment, setHiddenComment] = useState(false)

    useEffect(() => {
        axios
            .get(`/comments/${commentId}`,
                { headers: { 'authorization': localToken } }
            )
            .then(res => {
                if (res.data.status !== 'hidden') {
                    setChildren(res.data.children)
                    setCommentText(res.data.text);
                    setCommentor(res.data.commentor.username);
                    setLoaded(true);
                } else {
                    setLoaded(true);
                    setHiddenComment(true);
                }

            })
            .catch(err => {
                console.log(err)
            })
    },
        [commentId]
    )

    return (
        <div
            style={{ position: 'relative' }}
            className={commentClass}>
            {loaded ?
                hiddenComment ?
                    <>
                        <em style={{ 'color': 'gray' }} >Deleted comment</em>
                    </>
                    :
                    <><strong>{commentor}</strong> : { commentText}
                        {currentUser && currentUser.username === commentor ?
                            < button
                                className='Card__button'
                                style={{
                                    position: 'absolute',
                                    right: '1em',
                                    top: '1em'
                                }}
                                onClick={
                                    () => {
                                        axios
                                            .post('/comments/delete-comment',
                                                { commentId: commentId },
                                                { headers: { 'authorization': localToken } }

                                            )
                                            .then(res => {
                                                if (res.data) {
                                                    console.log(res.data)
                                                    setCommentClass('Comment trash');
                                                }
                                            })
                                    }
                                }
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button> :
                            null}
                        {/* {
                        (children && children.length > 0) ?
                            <><br /><br />
                                {children.map(child =>
                                    <><Comment commentId={child._id} /></>
                                )}
                            </> :
                            null
                    } */}
                    </>
                :
                <>loading</>
            }
        </div >

    )
})

const Comments = ({ commentIds }) => {
    if (commentIds.length > 0) {
        return commentIds.map(commentId => {
            return <Comment commentId={commentId} />
        })
    } else { return <p>No Comments yet!</p> }
}

const CommentSection = ({ commentIdsProp, parent, updateCommentCount }) => {
    const [newComment, setNewComment] = useState('');
    const [commentIds, setCommentIds] = useState(commentIdsProp);
    const [sendingComment, setSendingComment] = useState(false);
    const [commentCount, setCommentCount] = useState(commentIdsProp.length)

    const [myComments, setMyComments] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const handleCommentCount = (newCount) => {
        updateCommentCount(newCount)
    }

    const subjectPath = useLocation();

    return (
        redirect ?
            <Redirect push to={
                {
                    pathname: "/login",
                    state: { from: subjectPath }
                }
            }

            /> :
            <div className='CommentSection'>
                <h3>Comments</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                    }}
                >
                    {/* <br /> */}
                    <Comments commentIds={commentIds} />

                    {myComments}
                    <hr />
                    <textarea
                        placeholder='Comment here...'
                        className='CommentSection__textarea'
                        value={newComment}
                        disabled={sendingComment}
                        onInput={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                if (localToken === null) setRedirect(true);
                                setSendingComment(true)
                                e.target.value = ''
                                e.target.disable = true;
                                axios
                                    .post('/comments/new',
                                        {
                                            text: newComment,
                                            parent
                                        }, {
                                        headers: {
                                            'authorization': localToken
                                        }
                                    })
                                    .then((res) => {
                                        console.log(res.data)
                                        setNewComment('');
                                        setSendingComment(false)
                                        setMyComments([...myComments, <Comment
                                            textCommentProp={res.data.text}
                                            commentorProp={res.data.commentor.username}
                                            commentId={res.data._id} />])
                                        e.target.focus()
                                        setCommentCount(commentCount + 1)
                                        handleCommentCount(commentCount + 1)
                                    })
                            }

                        }}
                        id="" cols="30" rows="1"
                    />
                    {/* <input type="submit" value="Comment" /> */}
                </form>
            </div>
    )
}

export default CommentSection;