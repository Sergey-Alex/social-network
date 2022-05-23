import React from 'react';
import classes from './Header.module.css'
const Header = () => {
    return (
        <header className={classes.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/512px-Twitter-logo.svg.png"
                alt=""/>
        </header>
    );
};

export default Header;