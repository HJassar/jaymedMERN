import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css'

const Logo = () => {
    return (
        <div className='Logo'>
            <Link
                to='/'
                className='Logo__link'>
                <strong style={{fontSize:'1.5em'}}>JayMed</strong>
            </Link>
        </div>
    )
}

export default Logo;
