import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { connect } from 'react-redux'

import Card from './Card/Card'

const Subject = ({ match }) => {

    const subjectId = match.params.subjectId;

    const [title, setTitle] = useState('')
    const [loaded, setLoaded] = useState(false);
    const [cardIds, setCardIds] = useState([])

    useEffect(() => {
        axios
            .get(`/subjects/${subjectId}`)
            .then((res) => {
                setTitle(res.data.title)
                setCardIds(res.data.cards)
                setLoaded(true)
            });
    }, [subjectId])

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
                        />)
                })}
            </>
    )

}

const mapStateToProps = state => ({
    currentUser: state.currentUser.username
})

export default connect(mapStateToProps)(Subject);