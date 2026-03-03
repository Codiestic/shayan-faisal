import React, { useEffect, useState, useRef } from 'react';

/**
 * DecryptedText
 * 
 * Animation effect that reveals text by scrambling characters (decryption style).
 */
const DecryptedText = ({
    text,
    speed = 100,
    maxIterations = 20,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    encryptedClassName = "",
    animateOn = "mount", // 'mount', 'view', 'hover' (hover logic handled by parent usually for this specific request, but implemented here)
    revealDirection = "start", // 'start', 'end', 'center' (not fully impl in this basic version, defaulting to left-to-right)
    sequential = false, // If true, reveal one by one. If false, all scrambling.
    onDecryptionComplete,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealIndex, setRevealIndex] = useState(0);
    const intervalRef = useRef(null);
    const iterationRef = useRef(0);

    // Helpers
    const randomChar = () => characters[Math.floor(Math.random() * characters.length)];

    const startDecryption = () => {
        setIsScrambling(true);
        iterationRef.current = 0;
        setRevealIndex(0);

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => {
                let nextText = text.split('').map((char, index) => {
                    if (index < revealIndex) {
                        return char; // Already revealed
                    }
                    return randomChar();
                }).join('');

                // Logic to advance reveal
                // We want to reveal the whole string over 'maxIterations' roughly, 
                // or just scramble for a bit then reveal.

                // Simple approach: Every tick, increment iteration. 
                // Reveal index advances based on total duration logic.

                iterationRef.current++;

                if (sequential) {
                    // Reveal one character every few ticks?
                    // Let's make it smoother: reveal proportional to iterations
                    const progress = iterationRef.current / maxIterations;
                    const targetIndex = Math.floor(progress * text.length);
                    setRevealIndex(targetIndex);
                } else {
                    // Reveal linear
                    const charsPerTick = Math.max(1, text.length / maxIterations);
                    setRevealIndex(current => current + charsPerTick);
                }

                return nextText;
            });

            if (iterationRef.current >= maxIterations) {
                clearInterval(intervalRef.current);
                setDisplayText(text);
                setIsScrambling(false);
                if (onDecryptionComplete) onDecryptionComplete();
            }

        }, speed);
    };

    useEffect(() => {
        if (animateOn === 'mount') {
            startDecryption();
        }
    }, [animateOn, text]);

    // Handle Hover if needed (not primary use case here but good for completeness)
    const handleMouseEnter = () => {
        if (animateOn === 'hover' && !isScrambling) startDecryption();
    };

    return (
        <span
            className={`${parentClassName} ${className}`}
            onMouseEnter={handleMouseEnter}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }} // Ensure inline block for transforms
        >
            {displayText.split('').map((char, i) => (
                <span key={i} className={i < revealIndex ? '' : encryptedClassName}>
                    {char}
                </span>
            ))}
        </span>
    );
};

export default DecryptedText;
