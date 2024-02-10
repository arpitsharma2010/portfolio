import React, { useState } from 'react';
import classes from './Header.module.css';

export default function Header({ isDarkMode, onToggleDarkMode }) {
    return (
        <header className={`${classes.header} ${isDarkMode ? classes.darkMode : ''}`}>
            <div className={classes.logo}>Your Logo</div>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <label className={classes["toggle-switch"]}>
                <input type="checkbox" checked={isDarkMode} onChange={onToggleDarkMode} />
                <span className={`${classes["slider"]}`}></span>
            </label>
        </header>
    );
}