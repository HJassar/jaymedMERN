import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { connect } from 'react-redux'

import Card from './Card/Card'

const Subject = ({ match, currentUser }) => {

    const subjectId = match.params.subjectId;

    const [title, setTitle] = useState('')
    const [loaded, setLoaded] = useState(false);
    const [cardIds, setCardIds] = useState([])
    const [readCards, setReadCards] = useState(currentUser.readCards || [])

    useEffect(() => {
        axios
            .get(`/subjects/${subjectId}`)
            .then((res) => {
                setTitle(res.data.title)
                setCardIds(res.data.cards)
                if (currentUser.length > 0) {
                    // temporary axios call, currentUser Reducer needs to be updated frequently
                    axios
                        .get(`/users/${currentUser._id}`)
                        .then(res => {
                            setReadCards(res.data.readCards);
                            setLoaded(true);
                        })
                } else {
                    setLoaded(true)
                }
            });

    }, [])

    return (
        (!loaded) ?
            <>
                loading
            </>
            :
            <>
                <h1>
                    {title}
                </h1>
                {cardIds.map(cId => {
                    return (
                        <Card
                            cardId={cId}
                            readCards={readCards}
                        />)
                })}
            </>
    )

}

const mapStateToProps = state => ({
    currentUser: state.currentUser.currentUser
})

export default connect(mapStateToProps)(Subject);