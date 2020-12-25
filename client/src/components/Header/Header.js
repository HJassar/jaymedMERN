import React from 'react';

import HeaderMenu from './HeaderMenu/HeaderMenu';
import Logo from './Logo/Logo';


import './Header.css'

const Header = () => {
    return (
        <header className='Header'>
            <Logo />
            <HeaderMenu />
        </header>
    )
}

export default Header;
