import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import AppClasses from './../../App.module.css';
const linkedInProfilePicture = "https://lh3.googleusercontent.com/a/ACg8ocLlR9vMC39g-UhfS6fI4NNYykogVDo1saw_n1KhlSf9IUeP=s317-c-no";

export default function Header({ isDarkMode, onToggleDarkMode }) {
    return (
        <>
            <header className={`${classes.header}`}>
                <nav className={classes["nav-bar"]}>
                    <ul className={classes["url-list"]}>
                        <li>
                            <Link to="/" className={classes["url-routes"]}>
                                <span className={classes.logoSection}>
                                    <div className={classes.logoContainer}>
                                        <img src={linkedInProfilePicture} className={classes.avatar} alt='Avatar' />
                                    </div>
                                </span>
                            </Link>
                        </li>
                        <li><div className={`${classes["logo-separator"]} ${isDarkMode ? AppClasses["light-mode"] : AppClasses["dark-mode"]}`}></div></li>
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

                <label className={classes["toggle-switch"]}>
                    <input type="checkbox" checked={isDarkMode} onChange={onToggleDarkMode} />
                    <span className={`${classes["slider"]}`}></span>
                </label>

            </header>
        </>
    );
}