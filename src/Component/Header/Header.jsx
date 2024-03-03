import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import AppClasses from './../../App.module.css';
const linkedInProfilePicture = "https://lh3.googleusercontent.com/a/ACg8ocLlR9vMC39g-UhfS6fI4NNYykogVDo1saw_n1KhlSf9IUeP=s317-c-no";

export default function Header({ isDarkMode, onToggleDarkMode }) {
    const firstName = "Arpit";
    return (
        <>
            <header className={`${classes.header}`}>
                <nav className={classes["nav-bar"]}>
                    <ul className={classes["left-list"]}>
                        <li className={classes["first-list-item"]}>
                            <Link to="/" className={classes["url-routes"]}>
                                <span>{firstName}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <nav className={classes["nav-bar"]}>
                    <ul className={classes["centered-list"]}>
                        <li>
                            <Link to="/" className={classes["url-routes"]}>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li><Link to="/skills" className={classes["url-routes"]}>Skills</Link></li>
                        <li><Link to="/projects" className={classes["url-routes"]}>Projects</Link></li>
                        <li><Link to="/education" className={classes["url-routes"]}>Education</Link></li>
                        <li><Link to="/experience" className={classes["url-routes"]}>Experience</Link></li>
                        <li><Link to="/contact" className={classes["url-routes"]}>Contact</Link></li>
                    </ul>
                </nav>

                <button className={classes["dark-mode-toggle"]} onClick={onToggleDarkMode}>
                    {isDarkMode ? '☀️' : '🌙'}
                </button>

            </header>
        </>
    );
}