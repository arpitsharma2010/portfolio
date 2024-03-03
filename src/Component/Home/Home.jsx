import React from 'react';
import styles from './Home.module.css';

const myImage = 'https://lh3.googleusercontent.com/a/ACg8ocLlR9vMC39g-UhfS6fI4NNYykogVDo1saw_n1KhlSf9IUeP=s317-c-no';

const Home = () => {
    const name = 'Arpit Sharma';
    const introduction = 'Full Stack Developer with a focus on backend development.';

    return (
        <div className={styles['home-container']}>
            {/* Left side with name, profession, and current role */}
            <div className={styles['left-content']}>
                <p>Greetings, </p>
                <h2>I'm {name}</h2>
                <p>{introduction}</p>
            </div>

            {/* Right side with your image */}
            <div className={styles['right-content']}>
                <img src={myImage} alt="Your Image" />
            </div>
        </div>
    );
};

export default Home;

