import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircle, faClock, faComment, faEyeSlash, faGift, faHandHolding, faHandHoldingHeart, faHighlighter, faShare, faShareAlt, faStickyNote, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import './Card.css';
import CommentSection from './CommentSection/CommentSection';
import axios from 'axios';

const Card = ({ cardId }) => {

    const [card, setCard] = useState({})
    const [showCommentSection, setShowCommentSection] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [read, setRead] = useState(false);


    useEffect(() => {
        axios
            .get(`/cards/${cardId}`)
            .then((res) => {
                setCard(res.data)
                setLoaded(true);
            })
    }, [])



    // Togglers
    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
        // onBookMark();
    }
    const toggleRead = () => {
        setRead(!read);
        console.log('click')
        // onRead();
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
                /><sub>0</sub>&nbsp;
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
                <h2>{card.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: card.content }} />
                <div className='Card__lower-bar' >
                    <Tools
                        onCommentSection={toggleCommentSection}
                    />
                    <div className='Card__level'>LVL {card.level}</div>
                </div>
                {/* {(showCommentSection) ? <CommentSection
                    commentIds={commentIds}
                /> : null} */}
            </div>
    )
}

export default Card;