import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Error from '../../components/Error/Error';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Reading.css';

const Reading = () => {
    document.title = 'Reading';

    const [subjects, setSubjects] = useState([])
    const [errorResponse, setErrorResponse] = useState('')

    useEffect(() => {
        axios
            .get('/subjects')
            .then(res => {
                setSubjects(res.data);
                console.log(subjects)
            })
            .catch(err => {
                setErrorResponse(err.response)
                console.log(err.response)
            })
    }, [])

    return (
        <>
            <Breadcrumbs
                breadcrumbs={['All Subjects']}
            />
            {
                (subjects.length > 0) ?
                    subjects.map(subject => {
                        return (
                            <Link to={`/reading/${subject._id}`}>
                                {subject.title}
                            </Link>
                        )
                    }) :
                    (!errorResponse) ?
                        'loading'
                        :
                        <Error errorResponse={errorResponse} />
            }
        </>)
}

export default Reading;