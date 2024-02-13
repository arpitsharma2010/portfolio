import React from 'react';
import classes from './Footer.module.css';

export default function Footer({ isDarkMode }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${classes.footer}`}>
            <div className={classes["footer-content"]}>
                <p> {currentYear} Arpit Sharma. All rights reserved.</p>
                {/* <div className={classes["social-icons"]}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className={`${classes["fa"]} ${classes["fa-facebook"]}`}></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className={`${classes["fa"]} ${classes["fa-twitter"]}`}></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className={`${classes["fa"]} ${classes["fa-instagram"]}`}></i>
                    </a>
                </div> */}
            </div>
        </footer>
    );
}
