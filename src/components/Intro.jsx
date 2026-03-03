import React, { useRef, useState } from 'react';
import './Intro.css';
// Ensure strict path if needed, but standard import should work if file exists
import ThreeBlackHole from './ThreeBlackHole';

const Intro = ({ onComplete }) => {
    const [isEntering, setIsEntering] = useState(false);
    const triggerEntryRef = useRef(null);

    const handleEnterClick = () => {
        setIsEntering(true);
        // Trigger the camera fly-in animation in Three.js
        if (triggerEntryRef.current) {
            triggerEntryRef.current();
        } else {
            // Fallback if ref is missing
            console.warn("ThreeBlackHole ref missing, forcing finish");
            handleAnimationComplete();
        }

        // SAFETY FALLBACK
        setTimeout(() => {
            handleAnimationComplete();
        }, 3800);
    };

    // Callback passed to ThreeBlackHole
    const handleAnimationComplete = () => {
        if (onComplete) onComplete();
    };

    return (
        <div className={`intro-container ${isEntering ? 'entering' : ''}`}>
            {/* WebGL Black Hole Background */}
            <div className="three-background">
                <ThreeBlackHole
                    onEnter={handleAnimationComplete}
                    triggerEntry={triggerEntryRef}
                />
            </div>

            {/* Overlay Content */}
            <div className="intro-content">
                <button className="enter-button" onClick={handleEnterClick}>
                    ENTER VOID
                </button>
            </div>
        </div>
    );
};

export default Intro;
