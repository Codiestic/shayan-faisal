import React from 'react';

const Skills = () => {
    const skillCategories = [
        {
            title: "OFFENSIVE SECURITY",
            skills: [
                { name: "Penetration Testing", level: 95 },
                { name: "Metasploit / Burp Suite", level: 90 },
                { name: "Network Exploitation", level: 85 },
                { name: "Social Engineering", level: 80 }
            ]
        },
        {
            title: "DEFENSIVE OPS",
            skills: [
                { name: "SIEM / Splunk", level: 85 },
                { name: "Incident Response", level: 90 },
                { name: "Malware Analysis", level: 75 },
                { name: "Forensics", level: 80 }
            ]
        },
        {
            title: "DEVELOPMENT",
            skills: [
                { name: "Python / Scripting", level: 90 },
                { name: "React / JavaScript", level: 85 },
                { name: "Secure Coding", level: 95 },
                { name: "C++ / Assembly", level: 70 }
            ]
        }
    ];

    const generateBar = (level) => {
        const totalChars = 20;
        const filledChars = Math.floor((level / 100) * totalChars);
        const emptyChars = totalChars - filledChars;
        // Use Orange/Red styling for the bar
        return `[${'#'.repeat(filledChars)}${'.'.repeat(emptyChars)}]`;
    };

    return (
        <section id="skills" style={{
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
                padding: '2rem',
                maxWidth: '1000px',
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
                    ./SKILLS_LOADOUT
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {skillCategories.map((cat, idx) => (
                        <div key={idx}>
                            <h3 style={{
                                color: 'white',
                                borderBottom: '1px dashed var(--accent-primary)',
                                paddingBottom: '0.5rem',
                                marginBottom: '1.5rem',
                                fontSize: '1.2rem'
                            }}>
                                {cat.title}
                            </h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {cat.skills.map(skill => (
                                    <div key={skill.name} style={{ fontFamily: 'var(--hacker-font)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                                            <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{skill.name}</span>
                                            <span style={{ color: 'var(--hacker-text)', fontSize: '0.9rem' }}>{skill.level}%</span>
                                        </div>
                                        <div style={{ color: 'var(--hacker-text)', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            {generateBar(skill.level)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications Block */}
                <div style={{ marginTop: '3rem', borderTop: '1px solid var(--accent-primary)', paddingTop: '2rem' }}>
                    <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>// CERTIFIED_OPERATOR</div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {['OSCP', 'CISSP', 'CEH', 'CompTIA Sec+'].map(cert => (
                            <span key={cert} style={{
                                border: '1px solid var(--hacker-text)', // Orange Border
                                padding: '0.5rem 1rem',
                                color: 'var(--hacker-text)', // Orange Text
                                fontSize: '0.9rem',
                                background: 'rgba(255, 183, 0, 0.1)'
                            }}>{cert}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
