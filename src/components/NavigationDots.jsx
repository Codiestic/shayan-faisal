import React, { useState, useEffect } from 'react';

const NavigationDots = () => {
    const [activeSection, setActiveSection] = useState('hero');

    const sections = [
        { id: 'hero', label: 'VOID' },
        { id: 'about', label: 'ABOUT' },
        { id: 'skills', label: 'ARSENAL' },
        { id: 'projects', label: 'CREATIONS' },
        { id: 'contact', label: 'LINK' }
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            sections.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav style={{
            position: 'fixed',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 100
        }}>
            {sections.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                    <div
                        key={id}
                        className="nav-dot-container"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            cursor: 'pointer'
                        }}
                        onClick={() => scrollToSection(id)}
                    >
                        {/* Label (Tooltip) - Shows on Hover or Active */}
                        <span style={{
                            color: isActive ? '#ffae00' : 'rgba(255,255,255,0.7)',
                            marginRight: '15px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '0.8rem',
                            letterSpacing: '2px',
                            opacity: isActive ? 1 : 0, // Only show label when active by default? or hover? 
                            // Let's hide by default and rely on hover via CSS or state, 
                            // But for simplicity/cleanliness, let's keep it simple: visible on hover logic via CSS class? 
                            // Inline styles are tricky for hover. Let's make it always visible if active.
                            transition: 'all 0.3s ease',
                            pointerEvents: 'none',
                            textShadow: isActive ? '0 0 10px rgba(255, 174, 0, 0.5)' : 'none'
                        }}>
                            {label}
                        </span>

                        {/* Dot */}
                        <div style={{
                            width: isActive ? '12px' : '8px',
                            height: isActive ? '12px' : '8px',
                            borderRadius: '50%',
                            backgroundColor: isActive ? '#ffae00' : 'rgba(255, 255, 255, 0.3)',
                            border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            boxShadow: isActive ? '0 0 15px 2px rgba(255, 69, 0, 0.6)' : 'none'
                        }} />

                        {/* Hover handling (CSS in JS workaround without styled-components) */}
                        <style>
                            {`
                                .nav-dot-container:hover span {
                                    opacity: 1 !important;
                                }
                                .nav-dot-container:hover div {
                                    background-color: #ff4500 !important;
                                    transform: scale(1.2);
                                }
                            `}
                        </style>
                    </div>
                );
            })}
        </nav>
    );
};

export default NavigationDots;
