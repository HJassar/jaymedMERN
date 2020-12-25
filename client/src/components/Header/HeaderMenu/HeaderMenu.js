import React from 'react';
import { Link } from 'react-router-dom';

import './HeaderMenu.css'

const HeaderMenu = () => {

    return (
        <nav className='Header__menu'>
            <ul className='Header__menu-list'>
                <li className='Header__menu-item'>
                    <Link
                    to='/questions'
                        className='Header__menu-link'
                    >
                        Questions
                </Link>
                </li>
                <li className='Header__menu-item'>
                    <Link
                        to='/reading'
                        className='Header__menu-link'
                    >
                        Reading
                </Link>
                </li>
                <li className='Header__menu-item'>
                    <Link
                    to='/residency'
                    className='Header__menu-link'>
                        Residency
                </Link>
                </li>
                <li className='Header__menu-item'>
                    <Link
                    to='/contribute'
                    className='Header__menu-link'>
                        Contribute
                </Link>
                </li>
                <li 
                className='Header__menu-item'>
                    <Link 
                    to='/login'
                    className='Header__menu-link'>
                        Login
                </Link>
                </li>
            </ul>
        </nav>
    )
}

export default HeaderMenu;