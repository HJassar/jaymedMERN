import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';

import './CommentSection.css';


const Comment = (props) => {

    const [children, setChildren] = useState([])
    const [commentText, setCommentText] = useState(
        props.commentText !== undefined ? props.commentText : 'Loading'
    );
    const [commentor, setCommentor] = useState(props.commentor);
    const [loaded, setLoaded] = useState(props.textComment !== undefined ? true : false)
    const [commentClass, setCommentClass] = useState('Comment')


    useEffect(() => {
        // setCommentText(props.commentText)

        // if (!loaded) {
        axios
            .get(`/comments/${props.commentId}`)
            .then(res => {
                setChildren(res.data.children);
                setCommentText(res.data.text);
                setCommentor(res.data.commentor.username);
                if (res.data.status === 'trash') {
                    console.log(res.data.status)
                    setCommentClass('Comment trash');
                }
                console.log(res.data)
                setLoaded(true);
            })
            .catch(err => {
                console.log(err)
            })
        // }
    },
        // []
        [props.commentId]
    )

    return (
        <div className={commentClass}>
            <strong>{commentor}</strong>: {commentText}

            <button
                onClick={
                    () => {
                        axios
                            .post('/comments/delete-comment',
                                { commentId: props.commentId })
                            .then(res => {
                                if (res.data) {
                                    console.log(res.data)
                                    setCommentClass('Comment trash');
                                }
                            })
                    }
                }
            ></button>
            {(children && children.length > 0) ?
                <><br /><br />
                    {children.map(child =>
                        <><Comment commentId={child._id} /></>
                    )}
                </> :
                null}
        </div>
    )
}

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

    const [theBunch, setTheBunch] = useState([<>Why</>])

    const handleCommentCount = (newCount) => {
        updateCommentCount(newCount)
    }

    return (
        <div className='CommentSection'>
            <h3>Comments</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                }}
            >
                <br />
                <Comments commentIds={commentIds} />

                {myComments}
                <textarea
                    className='CommentSection__textarea'
                    value={newComment}
                    disabled={sendingComment}
                    onInput={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            setSendingComment(true)
                            e.target.value = ''
                            e.target.disable = true;
                            const localToken = localStorage.getItem('token');
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
                                        commentText={res.data.text}
                                        commentor={res.data.commentor.username}
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