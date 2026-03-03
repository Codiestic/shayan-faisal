import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExecute = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;
        const mailtoLink = `mailto:shaniestic@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
    };

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--accent-primary)',
        color: 'white',
        padding: '0.8rem',
        fontFamily: 'var(--hacker-font)',
        width: '100%',
        marginBottom: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s'
    };

    return (
        <section id="contact" style={{
            minHeight: '80vh',
            padding: '4rem 2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                border: '1px solid var(--hacker-border)', // Red Border
                padding: '3rem',
                maxWidth: '700px',
                width: '100%',
                fontFamily: 'var(--hacker-font)',
                position: 'relative',
                boxShadow: '0 0 20px var(--hacker-border-dim)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '20px',
                    background: '#000',
                    padding: '0 10px',
                    color: 'var(--hacker-green)', // Green Directory
                    fontWeight: 'bold',
                    border: '1px solid var(--hacker-border)' // Red Border
                }}>
                    ./ESTABLISH_UPLINK
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{ color: 'white', fontSize: '1.2rem' }}>
                        SECURE CHANNEL READY. <br /> <span style={{ color: '#aaa', fontSize: '0.9rem' }}>INITIATE TRANSMISSION SEQUENCE.</span>
                    </p>
                </div>

                <form onSubmit={handleExecute} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="AGENT_NAME"
                        style={inputStyle}
                        onChange={handleChange}
                        onFocus={(e) => e.target.style.borderColor = 'var(--hacker-text)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="RETURN_ADDRESS (EMAIL)"
                        style={inputStyle}
                        onChange={handleChange}
                        onFocus={(e) => e.target.style.borderColor = 'var(--hacker-text)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="MISSION_TITLE (SUBJECT)"
                        style={inputStyle}
                        onChange={handleChange}
                        onFocus={(e) => e.target.style.borderColor = 'var(--hacker-text)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="ENCRYPTED_MESSAGE_BODY..."
                        rows="5"
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onChange={handleChange}
                        onFocus={(e) => e.target.style.borderColor = 'var(--hacker-text)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        required
                    />

                    <button type="submit" style={{
                        background: 'transparent',
                        border: '1px solid var(--hacker-text)', // Orange Border
                        color: 'var(--hacker-text)', // Orange Text
                        padding: '1rem 3rem',
                        fontFamily: 'var(--hacker-font)',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        marginTop: '1rem',
                        alignSelf: 'center', // Center button
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--hacker-text)';
                            e.target.style.color = 'black';
                            e.target.style.boxShadow = '0 0 15px var(--hacker-text)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--hacker-text)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        &gt; EXECUTE_SEND_MAIL
                    </button>
                </form>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    borderTop: '1px dashed var(--hacker-border)', // Red dashed
                    paddingTop: '1.5rem',
                    marginTop: '2.5rem',
                    fontSize: '0.9rem'
                }}>
                    <a href="https://github.com/Codiestic" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--hacker-text)'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>[GITHUB]</a>
                    <a href="https://linkedin.com/in/shaniestic" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--hacker-text)'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>[LINKEDIN]</a>
                    <a href="https://snapchat.com/shaniseez" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--hacker-text)'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>[SNAPCHAT]</a>
                </div>

                <footer style={{ marginTop: '2rem', textAlign: 'center', color: '#555', fontSize: '0.8rem' }}>
                    root@shayan:~# shutdown -h now
                </footer>
            </div>
        </section>
    );
};

export default Contact;
