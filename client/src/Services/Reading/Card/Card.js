import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircle, faClock, faComment, faEyeSlash, faGift, faHandHolding, faHandHoldingHeart, faHighlighter, faShare, faShareAlt, faStickyNote, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import './Card.css';
import CommentSection from './CommentSection/CommentSection';

const Card = ({ content, title, bookmarkedProp, onBookMark, readProp, onRead, level }) => {

    const [bookmarked, setBookmarked] = useState(bookmarkedProp)
    const [read, setRead] = useState(readProp);


    // Togglers
    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
        onBookMark();
    }
    const toggleRead = () => {
        setRead(!read);
        onRead();
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
                <FontAwesomeIcon
                    className=
                    {(read) ?
                        ['Card__tracking-tool', 'Card__tracking-tool--read'].join(' ') :
                        ['Card__tracking-tool', 'Card__tracking-tool--unread'].join(' ')
                    }

                    onClick={() => { toggleRead() }}

                    icon={faCircle} />
                &nbsp;
            </div>
        )
    }

    const Tools = () => {
        return (
            <div class='Card__tools'>
                <FontAwesomeIcon
                    className='Card__tool'
                    icon={faComment} />&nbsp;
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
        <div className={
            ['Card', read ? null : 'Card--unread'].join(' ')
        }>
            <TrackingTools />
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content }} />
            <div className='Card__lower-bar' >
                <Tools />
                <div className='Card__level'>LVL {level}</div>
            </div>
            <CommentSection />
        </div>
    )
}

export default Card;