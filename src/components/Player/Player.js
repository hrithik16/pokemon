// SoundPlayer.js
import React, { useRef } from 'react';
import speaker from '../../assets/speaker.png'; // Adjust the path based on your project structure
import styles from './Player.module.css'; // Import the CSS module

const Player = ({ audioUrl }) => {
    const audioRef = useRef(null);

    const playSound = () => {
        audioRef.current.play();
    };

    return (
        <div>
            <audio ref={audioRef} src={audioUrl} />
            <button onClick={playSound} className={styles.button}>
                <img src={speaker} alt="Play Sound" className={styles.image} />
            </button>
        </div>
    );
};

export default Player;
