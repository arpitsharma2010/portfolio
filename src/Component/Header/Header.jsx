import { Link } from 'react-router-dom';
import classes from './Header.module.css';

export default function Header({ isDarkMode, onToggleDarkMode }) {
    return (
        <>
            <header className={`${classes.header} ${isDarkMode ? classes.darkMode : ''}`}>
                <Link to="/" className={classes["logo"]}>Your Logo</Link>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <label className={classes["toggle-switch"]}>
                    <input type="checkbox" checked={isDarkMode} onChange={onToggleDarkMode} />
                    <span className={`${classes["slider"]}`}></span>
                </label>
            </header>
        </>
    );
}