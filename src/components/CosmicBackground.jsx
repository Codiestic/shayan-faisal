import React, { useState, useEffect } from 'react';
import './BlackHole.css'; // Shared styles
import Particles from './Particles';
import Aurora from './Aurora';

const CosmicBackground = ({ isRevealed }) => {
    const [blurAmount, setBlurAmount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Blur intensity increases with scroll, capped at 10px
            const maxBlur = 20;
            const threshold = 0; // Start blurring immediately on scroll
            if (scrollY < threshold) {
                setBlurAmount(0);
            } else {
                const calculatedBlur = Math.min(((scrollY - threshold) / 500) * maxBlur, maxBlur);
                setBlurAmount(calculatedBlur);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="cosmic-background-fixed"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none', // Allow clicking through to text
                zIndex: 1, // ON TOP of Hero Text (Z=0)
                opacity: 1, // ALWAYS VISIBLE
                // transition: 'opacity 2.0s ease-in-out', // Removed transition for immediate show
                filter: `blur(${blurAmount}px)`,
                willChange: 'filter'
            }}
        >
            {/* 1. Background Particles */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                <Particles
                    particleColors={["#ffffff", "#a0a0a0", "#404040"]}
                    particleCount={150}
                    speed={0.15}
                    alphaParticles={true}
                />
            </div>

            {/* 2. Aurora */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2, mixBlendMode: 'screen' }}>
                <Aurora
                    colorStops={['#000000', '#505050', '#ffffff']}
                    amplitude={1.2}
                    blend={0.5}
                />
            </div>

            {/* 3. The Void */}
            <div className="blackhole-void" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '350px',
                height: '350px',
                backgroundColor: '#000',
                borderRadius: '50%',
                boxShadow: '0 0 60px 20px rgba(255, 255, 255, 0.2)', // White glow
                zIndex: 20
            }}></div>
        </div>
    );
};

export default CosmicBackground;
