import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircle, faClock, faComment, faEyeSlash, faGift, faHandHolding, faHandHoldingHeart, faHighlighter, faShare, faShareAlt, faStickyNote, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { updateReadCards } from '../../../../store/currentUser/currentUser.actions'

import CommentSection from './CommentSection/CommentSection'

import './Card.css';
import axios from 'axios';

const Card = ({ cardId, currentUser, updateReadCards }) => {

    const [card, setCard] = useState({})
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [commentCount, setCommentCount] = useState('');

    const [loaded, setLoaded] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const [readCards, setReadCards] = useState(currentUser.readCards || [])
    const [read, setRead] = useState(
        currentUser.readCards &&
        currentUser.readCards.includes(cardId)
    );

    useEffect(() => {
        axios
            .get(`/cards/${cardId}`)
            .then((res) => {
                setCard(res.data)
                setLoaded(true);
                setCommentCount(res.data.comments.length);
            })
    }, [])

    // Togglers
    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
        // onBookMark();
    }
    const toggleRead = () => {
        setRead(!read);
        axios.get(`/cards/${cardId}?action=read`)

        const sup = [...currentUser.readCards];
        (sup.includes(cardId)) ?
            sup.splice(sup.indexOf(cardId), 1) :
            sup.push(cardId);
        setReadCards(sup)

        updateReadCards(sup)
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
        (!loaded) ?
            <div className='Card'>
                loading...
            </div>
            :
            <div className={
                ['Card', read ? null : 'Card--unread'].join(' ')
            }>
                <TrackingTools />
                {card._id}
                <h2>{card.title}</h2>
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
                    /> :
                    null}
            </div>
    )
}




const mapStateToProps = state => ({
    // username: state.currentUser.currentUser.username,
    // readCards: state.currentUser.currentUser.readCards,
    currentUser: state.currentUser.currentUser

})

Card.propTypes = {
    updateReadCards: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    { updateReadCards }
)(Card);