import React from 'react';

const Navbar = () => {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100, // Above Hero Content
            color: 'white',
            fontFamily: "'Impact', sans-serif", // Matching global font
            backdropFilter: 'blur(5px)' // Subtle glass effect
        }}>
            <div style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>
                STELLAR VOID
            </div>
            <div style={{ display: 'flex', gap: '30px' }}>
                <a href="#hero" style={{ textDecoration: 'none', color: 'white', letterSpacing: '1px' }}>HOME</a>
                <a href="#about" style={{ textDecoration: 'none', color: 'white', letterSpacing: '1px' }}>ABOUT</a>
                <a href="#services" style={{ textDecoration: 'none', color: 'white', letterSpacing: '1px' }}>SERVICES</a>
                <a href="#contact" style={{ textDecoration: 'none', color: 'white', letterSpacing: '1px' }}>CONTACT</a>
            </div>
        </nav>
    );
};

export default Navbar;
