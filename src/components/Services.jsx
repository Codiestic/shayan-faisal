import React from 'react';

const Services = () => {
    const services = [
        {
            title: "Penetration Testing",
            icon: "🔓",
            description: "Simulating real-world cyberattacks to identify vulnerabilities before malicious actors do. Comprehensive assessments of network infrastructure and applications."
        },
        {
            title: "Web App Security",
            icon: "🌐",
            description: "Deep-dive analysis of web applications to detect injection flaws, authentication weaknesses, and XSS vulnerabilities using industry-standard methodologies."
        },
        {
            title: "Network Infrastructure",
            icon: "📡",
            description: "Evaluating firewall configurations, routing protocols, and internal network architecture to ensure a hardened defense posture against lateral movement."
        },
        {
            title: "Security Consultation",
            icon: "🛡️",
            description: "Strategic guidance on security policies, compliance standards (ISO 27001, GDPR), and implementation of best-practice defense mechanisms."
        },
        {
            title: "Bug Hunting",
            icon: "🐛",
            description: "Proactive vulnerability research and responsible disclosure. Detailed reporting on zero-day exploits and logic flaws in enterprise software."
        },
        {
            title: "Cybersecurity Practitioner",
            icon: "💻",
            description: "Continuously evolving skillset through active participation in home lab setups, CTFs, and real-world simulations. Dedicated to mastering the art of defense and offense."
        }
    ];

    return (
        <section id="services" style={{
            minHeight: '100vh',
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
                maxWidth: '1200px',
                width: '100%',
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
                    border: '1px solid var(--hacker-border)', // Red Border
                    fontFamily: 'var(--hacker-font)'
                }}>
                    ./ACTIVE_MODULES
                </div>

                <h2 style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)',
                    color: 'white',
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    Operational Capabilities
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {services.map((service, index) => (
                        <div key={index} style={{
                            border: '1px solid var(--accent-primary)',
                            padding: '2rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            transition: 'all 0.3s ease',
                            cursor: 'crosshair',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--hacker-text)'; // Orange/Yellow
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 183, 0, 0.2)';
                                e.currentTarget.querySelector('.icon').style.transform = 'scale(1.2) rotate(5deg)';
                                e.currentTarget.querySelector('h3').style.color = 'var(--hacker-text)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.querySelector('.icon').style.transform = 'scale(1) rotate(0deg)';
                                e.currentTarget.querySelector('h3').style.color = 'white';
                            }}
                        >
                            <div className="icon" style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                transition: 'transform 0.3s ease',
                                display: 'inline-block'
                            }}>{service.icon}</div>

                            <h3 style={{
                                color: 'white',
                                fontFamily: 'var(--hacker-font)',
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                transition: 'color 0.3s ease'
                            }}>
                                {service.title}
                            </h3>

                            <p style={{
                                color: '#ccc',
                                lineHeight: '1.6',
                                fontFamily: 'var(--hacker-font)',
                                fontSize: '0.95rem'
                            }}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
