import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
    return (
        <footer className='Footer'>
            <nav className='Footer__nav'>
                <ul className='Footer__nav-list'>
                    <li className='Footer__nav-item'>
                        <Link
                            to='/contribute'
                            className='Footer__nav-link'>
                            Contribute
                </Link>
                    </li>
                    <li className='Footer__nav-item'>
                        <Link
                            to='/about'
                            className='Footer__nav-link'>
                            About
                </Link>
                    </li>
                    <li className='Footer__nav-item'>
                        <Link
                            to='/privacy'
                            className='Footer__nav-link'>
                            Privacy
                </Link>
                    </li>
                    <li className='Footer__nav-item'>
                        <Link
                            to='/terms'
                            className='Footer__nav-link'>
                            Terms
                </Link>
                    </li>
                    <li className='Footer__nav-item'>
                        <Link
                            to='/contact'
                            className='Footer__nav-link'>
                            Contact
                </Link>
                    </li>
                </ul>

            </nav>
    All rights reserved
        </footer>
    )
}

export default Footer;