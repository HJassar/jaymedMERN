import React from 'react';
import axios from 'axios'

import './Questions.css';
import Login from '../Login/Login'

const Questions = () => {
    document.title = 'JayMed';

    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quibusdam, iure nihil, quam cumque hic eum modi obcaecati mollitia, possimus quos quia dolorum omnis beatae distinctio culpa molestiae amet dicta.'

    const tokenLocal = JSON.parse(localStorage.getItem('currentUser')) || null;
    const token = tokenLocal !== null ? tokenLocal.token : '';


    return (
        <>
            <h1>Questions</h1>
        </>
    )
}

export default Questions;