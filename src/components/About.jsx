import React from 'react';

const About = () => {
    return (
        <section id="about" style={{
            minHeight: '100vh',
            padding: '4rem 2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
                backdropFilter: 'blur(5px)',
                border: '1px solid var(--hacker-border)', // Red Border
                padding: '2rem',
                maxWidth: '900px',
                width: '100%',
                boxShadow: '0 0 20px var(--hacker-border-dim)',
                fontFamily: 'var(--hacker-font)', // Monospace
                color: '#fff',
                position: 'relative'
            }}>
                {/* Terminal Header Decoration */}
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '20px',
                    background: '#000',
                    padding: '0 10px',
                    color: 'var(--hacker-green)', // Keep Directory Green
                    fontWeight: 'bold',
                    border: '1px solid var(--hacker-border)' // Red Border
                }}>
                    ./SYSTEM_INFO
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                    {/* Avatar / Identity Block */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{
                            border: '1px dashed var(--accent-primary)',
                            height: '250px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            <span style={{ color: 'var(--hacker-text)', fontFamily: 'var(--hacker-font)' }}>[USER_IMG_NOT_FOUND]</span>
                        </div>
                        <div style={{
                            border: '1px solid var(--accent-primary)',
                            padding: '1rem',
                            fontFamily: 'var(--hacker-font)',
                            fontSize: '0.9rem',
                            color: '#aaa'
                        }}>
                            <div style={{ marginBottom: '0.5rem' }}>ID: SHAYAN_FAISAL</div>
                            <div style={{ marginBottom: '0.5rem' }}>ROLE: <span style={{ color: 'var(--hacker-text)' }}>CYBERSECURITY_PRACTITIONER</span></div>
                            <div style={{ marginBottom: '0.5rem' }}>CLEARANCE: LEVEL_5</div>
                            <div style={{ marginTop: '0.5rem', color: 'var(--hacker-green)' }}>STATUS: ONLINE</div>
                        </div>
                    </div>

                    {/* Detailed Context */}
                    <div>
                        <h2 style={{
                            color: 'white',
                            marginBottom: '1.5rem',
                            borderBottom: '1px solid var(--hacker-border)', // Red Border
                            display: 'inline-block',
                            fontFamily: 'var(--hacker-font)',
                            fontSize: '2rem'
                        }}>
                            MISSION_OBJECTIVE
                        </h2>

                        <p style={{ marginBottom: '1.5rem', color: '#ddd', lineHeight: '1.8', fontFamily: 'var(--hacker-font)' }}>
                            &gt; Dedicated to securing digital frontiers through rigorous vulnerability assessment and creative problem-solving.
                            <br /><br />
                            &gt; My mission is simple: <span style={{ color: 'var(--hacker-text)' }}>Identify weaknesses before they are exploited.</span>
                        </p>

                        {/* Stats Grid (Reference Parity) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1rem',
                            marginTop: '2rem'
                        }}>
                            <div style={{ textAlign: 'center', border: '1px solid var(--accent-primary)', padding: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', color: 'var(--hacker-text)', fontWeight: 'bold' }}>300+</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>ENGAGEMENTS</div>
                            </div>
                            <div style={{ textAlign: 'center', border: '1px solid var(--accent-primary)', padding: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', color: 'var(--hacker-border)', fontWeight: 'bold' }}>50+</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>CRITICAL BUGS</div>
                            </div>
                            <div style={{ textAlign: 'center', border: '1px solid var(--accent-primary)', padding: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', color: 'var(--hacker-green)', fontWeight: 'bold' }}>10k</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>CUPS OF COFFEE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
