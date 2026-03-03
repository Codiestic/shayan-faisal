import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Project_Alpha.exe",
            type: "DASHBOARD OPTIMIZATION",
            desc: "Legacy system overhaul resulting in 400% performance increase. Implemented React lazy loading and WebWorker offloading.",
            status: "DEPLOYED",
            size: "4MB",
            tags: ["React", "Redux", "Node"]
        },
        {
            title: "Nebula_Stream.sh",
            type: "DATA VISUALIZATION",
            desc: "Real-time telemetry monitoring for IoT satellite clusters. Utilizing WebGL for high-fidelity particle rendering.",
            status: "ACTIVE",
            size: "12MB",
            tags: ["WebGL", "Three.js", "Socket.io"]
        },
        {
            title: "Cyber_Core.bat",
            type: "E-COMMERCE PLATFORM",
            desc: "Secure payment gateway integration with 3D product previews. PCI-DSS compliant architecture.",
            status: "AUDITED",
            size: "8kb",
            tags: ["Next.js", "Stripe", "PostgreSQL"]
        }
    ];

    return (
        <section id="projects" style={{
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
                maxWidth: '1100px',
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
                    ./PROJECTS_DIR
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {/* Header Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1.5fr 3fr 1fr',
                        borderBottom: '1px solid var(--accent-primary)',
                        paddingBottom: '0.5rem',
                        color: 'var(--accent-primary)',
                        fontSize: '0.9rem',
                        letterSpacing: '1px'
                    }}>
                        <span>FILENAME</span>
                        <span>TYPE</span>
                        <span>MISSION_BRIEF</span>
                        <span>STATUS</span>
                    </div>

                    {/* Rows */}
                    {projects.map((proj, index) => (
                        <div key={index} style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1.5fr 3fr 1fr',
                            padding: '1.5rem 0',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontFamily: 'var(--hacker-font)',
                            borderBottom: '1px dashed #333',
                            alignItems: 'start'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 183, 0, 0.1)'; // Orange Dim
                                e.currentTarget.style.paddingLeft = '10px';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.paddingLeft = '0px';
                            }}
                        >
                            <div>
                                <span style={{ color: 'var(--hacker-text)', display: 'block', fontSize: '1.1rem' }}>{proj.title}</span>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {proj.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: '0.7rem', border: '1px solid #444', padding: '2px 6px', color: '#888' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <span style={{ color: 'white', fontSize: '0.9rem' }}>{proj.type}</span>

                            <span style={{ color: '#ccc', fontSize: '0.95rem', paddingRight: '1rem', lineHeight: '1.5' }}>
                                {proj.desc}
                            </span>

                            <span style={{
                                color: proj.status === 'DEPLOYED' ? '#16a34a' : proj.status === 'ACTIVE' ? '#3b82f6' : '#eab308',
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                            }}>
                                [{proj.status}]
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '1.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem', textAlign: 'right' }}>
                    > Encrypted connection established.
                </div>
            </div>
        </section>
    );
};

export default Projects;
