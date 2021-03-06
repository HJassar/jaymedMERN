import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Redirect, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircle, faClock, faComment, faEyeSlash, faHandHoldingHeart, faHighlighter, faShareAlt, faStickyNote, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { pushCardToReadCardsState, popCardFromReadCardsState } from '../../../../store/currentUser/currentUser.actions'

import CommentSection from './CommentSection/CommentSection'

import './Card.css';
import axios from 'axios';

const localToken = localStorage.getItem('token');


const Card = ({ cardId, currentUser, pushCardToReadCardsState, popCardFromReadCardsState }) => {
    const subjectPath = useLocation();

    const [card, setCard] = useState({})
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [commentCount, setCommentCount] = useState('');

    const [loaded, setLoaded] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [bookmarked, setBookmarked] = useState(false);

    // const [readCards, setReadCards] = useState(currentUser ? currentUser.readCards : [])
    const [read, setRead] = useState(
        currentUser.readCards.includes(cardId)
    );

    useEffect(() => {
        axios
            .get(`/cards/${cardId}`,
                { headers: { 'authorization': localToken } }
            )
            .then((res) => {
                setCard(res.data)
                setLoaded(true);
                setCommentCount(res.data.comments.length);
            })
            .catch(error => {
                console.log(error)
            })
    }, [cardId])

    // Togglers
    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
        // onBookMark();
    }
    const toggleRead = () => {
        if (localToken === null) {
            return setRedirect(true)
        }
        setRead(!read);
        axios.get(`/cards/${cardId}?action=read`,
            { headers: { 'authorization': localToken } }
        )


        currentUser.readCards.includes(cardId) ?
            popCardFromReadCardsState(cardId) :
            pushCardToReadCardsState(cardId)

        // setReadCards(sup)

    }

    const toggleCommentSection = () => {
        setShowCommentSection(!showCommentSection);
    }

    const TrackingTools = () => {
        return (
            <div className='Card__tracking-tools'>
                <FontAwesomeIcon
                    className='Card__tracking-tool'
                    icon={faEyeSlash} />&nbsp;
                <FontAwesomeIcon
                    className='Card__tracking-tool'
                    icon={faClock} />&nbsp;
                <FontAwesomeIcon
                    className=
                    {(bookmarked) ?
                        ['Card__tracking-tool', 'Card__tracking-tool--bookmarked'].join(' ') :
                        'Card__tracking-tool'
                    }

                    onClick={() => { toggleBookmark() }}

                    icon={faBookmark} />&nbsp;
                <button
                    className='Card__button'
                    onClick={() => { toggleRead() }}
                >
                    <FontAwesomeIcon
                        pointerEvents='none'
                        className=
                        {(read) ?
                            ['Card__tracking-tool', 'Card__tracking-tool--read'].join(' ') :
                            ['Card__tracking-tool', 'Card__tracking-tool--unread'].join(' ')
                        }
                        icon={faCircle} />
                </button>
                &nbsp;
            </div>
        )
    }

    const Tools = ({ onCommentSection }) => {
        return (
            <div class='Card__tools'>
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faComment}
                    onClick={onCommentSection}
                /><sub>{commentCount}</sub>&nbsp;
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faThumbsUp} />&nbsp;
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faHandHoldingHeart} />&nbsp;
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faShareAlt} />&nbsp; | &nbsp;
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faHighlighter} />&nbsp;
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faStickyNote} />
            </div>
        )
    }

    const updateCommentCount = (newCount) => {
        setCommentCount(newCount);
    }

    return (
        redirect ?
            <Redirect push to={
                {
                    pathname: "/login",
                    state: { from: subjectPath }
                }
            }

            />
            :
            (!loaded) ?
                <div className='Card'>
                    loading...
            </div>
                :
                <div
                    className={
                        ['Card', read ? null : 'Card--unread'].join(' ')
                    }
                    key={card._id}
                >
                    <TrackingTools />
                    <h2
                        style={{ display: 'inline' }}
                    >{card.title}</h2>
                    {currentUser.roles.includes('editor') ?
                        <button style={{ display: 'inline' }}>edit</button> : null}
                    <p dangerouslySetInnerHTML={{ __html: card.content }} />
                    <div className='Card__lower-bar' >
                        <Tools
                            onCommentSection={toggleCommentSection}
                        />
                        <div className='Card__level'>LVL {card.level}</div>
                    </div>
                    {(showCommentSection) ?
                        <CommentSection
                            commentIdsProp={card.comments}
                            parent={{ parentId: cardId, parentType: 'card' }}
                            updateCommentCount={updateCommentCount}
                        />
                        :
                        null}
                </div>
    )
}




const mapStateToProps = state => ({
    // username: state.currentUser.currentUser.username,
    // readCards: state.currentUser.currentUser.readCards,
    currentUser: state.currentUser

})

Card.propTypes = {
    pushCardToReadCardsState: PropTypes.func.isRequired,
    popCardFromReadCardsState: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    { pushCardToReadCardsState, popCardFromReadCardsState }
)(Card);