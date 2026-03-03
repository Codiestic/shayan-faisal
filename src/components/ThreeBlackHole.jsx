import React, { useEffect, useRef } from 'react';
import { initBlackHole } from './BlackHoleEngine';

const ThreeBlackHole = ({ onEnter, triggerEntry }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Initialize the Engine
        const engine = initBlackHole(mountRef.current, onEnter);

        // Bind the trigger API
        if (triggerEntry) {
            triggerEntry.current = engine.triggerEntry;
        }

        // Cleanup
        return () => {
            if (engine && engine.dispose) engine.dispose();
        };
    }, []); // Run once on mount

    return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />;
};

export default ThreeBlackHole;
