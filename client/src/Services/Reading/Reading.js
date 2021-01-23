import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Error from '../../components/Error/Error';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Reading.css';

const Reading = () => {
    document.title = 'Reading';

    const [subjects, setSubjects] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        axios
            .get('/subjects')
            .then(res => {
                setSubjects(res.data);
            })
            .catch(err => {
                setErrorMessage(err.response)
            })
    }, [subjects])

    return (
        <>
            <Breadcrumbs
                breadcrumbs={['All Subjects']}
            />
            {
                (subjects.length > 0) ?
                    subjects.map(subject => {
                        return (
                            <Link to={`/reading/${subject._id}`}
                            style={{
                                textDecoration:'none'
                                }}>
                                <div className='Card'
                                style={{
                                    maxWidth: '480px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    textAlign: 'center'
                                }}
                                >
                                    <h2>
                                        {subject.title}
                                    </h2>
                                </div>
                            </Link>
                        )
                    }) :
                    (!errorMessage) ?
                        'loading'
                        :
                        <Error errorMessage={errorMessage} />
            }
        </>)
}

export default Reading;