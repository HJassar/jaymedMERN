import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import Login from '../../../Services/Login/Login'

import { connect } from 'react-redux';

import './HeaderMenu.css'
import axios from 'axios';

const HeaderMenu = ({ currentUser }) => {

    const currentPath = useLocation().pathname.split('/')[1];
    const subjectPath = useLocation();

    return (
        <nav className='Header__menu'>
            <ul className='Header__menu-list'>
                <li className='Header__menu-item'>
                    <Link
                        to='/questions'
                        className={
                            ['Header__menu-link',
                                (currentPath === 'questions') ?
                                    'currentPath' : null
                            ].join(' ')}
                    >
                        Questions
                </Link>
                </li>
                <li className='Header__menu-item'>
                    <Link
                        to='/reading'
                        className={
                            ['Header__menu-link',
                                (currentPath === 'reading') ?
                                    'currentPath' : null
                            ].join(' ')}
                    >
                        Reading
                </Link>
                </li>
                <li className='Header__menu-item'>
                    <Link
                        to='/residency'
                        className={
                            ['Header__menu-link',
                                (currentPath === 'residency') ?
                                    'currentPath' : null
                            ].join(' ')}
                    >
                        Residency
                </Link>
                </li>
                <li className='Header__menu-item'>
                    <Link
                        to='/contribute'
                        className={
                            ['Header__menu-link',
                                (currentPath === 'contribute') ?
                                    'currentPath' : null
                            ].join(' ')}
                    >
                        Contribute
                </Link>
                </li>

                <li
                    className='Header__menu-item'>
                    {(currentUser) ?
                        <>
                            <Link
                                to='/dashboard'
                                className={
                                    ['Header__menu-link',
                                        (currentPath.search('dashboard') !== -1) ?
                                            'currentPath' : null
                                    ].join(' ')}
                            >
                                {currentUser.username}
                            </Link> &nbsp;
                            <button
                                className='logout-btn'
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                    return (
                                        <Redirect to='/' />
                                    )
                                }}
                            > logout</button>
                        </>
                        :
                        <Link
                            to={{
                                pathname: "/login",
                                state: { from: subjectPath }
                            }}

                            className={
                                ['Header__menu-link',
                                    (currentPath === 'login') ?
                                        'currentPath' : null
                                ].join(' ')}
                        >Login</Link>
                    }
                </li>

            </ul>
        </nav >
    )
}



const mapStateToProps = state => ({
    currentUser: state.currentUser.currentUser
})

export default connect(mapStateToProps)(HeaderMenu);