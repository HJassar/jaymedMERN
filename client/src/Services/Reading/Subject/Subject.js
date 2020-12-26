import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from './Card/Card'

const Subject = (props) => {

    const subjectId = props.match.params.subjectId;

    const [title, setTitle] = useState('')
    const [loaded, setLoaded] = useState(false);
    const [cardIds, setCardIds] = useState([])

    useEffect(() => {
        axios
            .get(`/subjects/${subjectId}`)
            .then((res) => {
                setLoaded(true)
                setTitle(res.data.title)
                setCardIds(res.data.cards)
                console.log(subjectId)

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
                        />)
                })}
            </>
    )

}

export default Subject;