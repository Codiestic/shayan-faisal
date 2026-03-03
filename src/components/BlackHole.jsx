import React, { useRef, useState, useEffect } from 'react';
import ThreeBlackHole from './ThreeBlackHole';
import './BlackHole.css';

const BlackHole = ({ onReveal, isReady, scrollRef }) => {
    const [scrollY, setScrollY] = useState(0);

    /* --- Scroll Listener ---
       We need to listen to the scroll event of the main container (mainInterfaceRef) 
       to drive the animation values. 
    */
    useEffect(() => {
        if (!scrollRef || !scrollRef.current) return;

        const handleScroll = () => {
            if (scrollRef.current) {
                setScrollY(scrollRef.current.scrollTop);
            }
        };

        const currentRef = scrollRef.current;
        currentRef.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        // Trigger Reveal Callback
        if (isReady && onReveal) {
            setTimeout(onReveal, 500);
        }

        return () => {
            if (currentRef) currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [scrollRef, isReady, onReveal]);

    const handleScrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /* --- Animation Math --- */
    // Scroll Range for the effect (e.g., 0 to 600px)
    const maxScroll = 800;
    const progress = Math.min(scrollY / maxScroll, 1);

    // 1. Title Zoom: Scales DOWN (zooms away/into hole)
    // Starts at 1.0, ends at 0.4
    const titleScale = 1 - (progress * 0.6);

    // 2. Title Blur: Increases
    // Starts at 0px, ends at 15px
    const titleBlur = progress * 15;

    // 3. Title Opacity: Fades out slightly or stays? 
    // User said "zooms... blurs... stays there". So let's keep it visible but blurred.
    // Maybe fade to 0.5?
    const titleOpacity = 1 - (progress * 0.5);

    // 4. Buttons: Fade out QUICKLY
    // They should be gone by 300px
    const buttonProgress = Math.min(scrollY / 300, 1);
    const contentOpacity = 1 - buttonProgress;
    const contentPointerEvents = contentOpacity > 0.1 ? 'auto' : 'none';

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>

            {/* Background: 3D Black Hole (Fixed Visual) */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                <ThreeBlackHole />
            </div>

            {/* Fixed Title Container 
                Using position: fixed to keep it centered "forever" (until covered by next section)
            */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${titleScale})`,
                filter: `blur(${titleBlur}px)`,
                opacity: titleOpacity,
                zIndex: 1, // Low Z-Index so content scrolls OVER it
                textAlign: 'center',
                width: '100%',
                pointerEvents: 'none', // Allow clicking through
                transition: 'transform 0.1s linear, filter 0.1s linear, opacity 0.1s linear',
                willChange: 'transform, filter, opacity'
            }}>
                <h1 className="shaniestic-title" style={{
                    fontSize: '6rem',
                    marginBottom: '1rem',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                    color: 'white'
                }}>
                    SHANIESTIC
                </h1>
            </div>

            {/* Subtitle & Buttons Container 
                These need to fade out. 
                If we use position: fixed, they stay centered and just fade.
                If we use position: absolute, they scroll up.
                User: "Buttons... fades out".
                Let's use Fixed + Opacity so they don't visually "climb" the shrinking title.
            */}
            <div style={{
                position: 'fixed',
                top: '60%', // Positioned below the centered title
                left: '50%',
                transform: 'translate(-50%, 0)',
                zIndex: 2,
                textAlign: 'center',
                width: '100%',
                opacity: contentOpacity,
                pointerEvents: contentPointerEvents,
                transition: 'opacity 0.1s linear'
            }}>
                <p style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    color: '#ddd',
                    fontSize: '1.2rem',
                    marginBottom: '3rem',
                    letterSpacing: '5px',
                    textTransform: 'uppercase'
                }}>
                    Creative Developer | Cybersecurity Practitioner
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => handleScrollTo('projects')}
                        style={{
                            background: 'transparent',
                            border: '1px solid white',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'white';
                        }}
                    >
                        Explore Work
                    </button>

                    <button
                        onClick={() => handleScrollTo('contact')}
                        style={{
                            background: 'white',
                            border: '1px solid white',
                            color: 'black',
                            padding: '1rem 2.5rem',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = 'black';
                        }}
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlackHole;
