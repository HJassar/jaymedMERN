import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css'

const Logo = () => {
    return (
        <div
            className='Logo'
        >
            <Link
                to='/'
                className='Logo__link'>
                <img src="/logo.png" alt=""
                />
            </Link>
        </div>
    )
}

export default Logo;
