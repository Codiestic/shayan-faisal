import React, { useEffect, useRef } from 'react';

const Particles = ({
    particleColors = ['#ffffff'],
    particleCount = 200,
    particleSpread = 10,
    speed = 0.1,
    particleBaseSize = 100,
    moveParticlesOnHover = false,
    alphaParticles = false,
    disableRotation = false,
    pixelRatio = 1, // Default to 1 to match performance preferences
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Set size
        const resize = () => {
            // Use parent or window if parent is zero height
            const parent = canvas.parentElement;
            canvas.width = (parent.offsetWidth || window.innerWidth) * pixelRatio;
            canvas.height = (parent.offsetHeight || window.innerHeight) * pixelRatio;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            ctx.scale(pixelRatio, pixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const initParticles = () => {
            const p = [];
            const width = canvas.width / pixelRatio;
            const height = canvas.height / pixelRatio;

            for (let i = 0; i < particleCount; i++) {
                p.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: (Math.random() * 0.5 + 0.5) * (particleBaseSize / 50), // Scale base size
                    dx: (Math.random() - 0.5) * speed,
                    dy: (Math.random() - 0.5) * speed,
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    alpha: alphaParticles ? Math.random() * 0.6 + 0.4 : 1,
                });
            }
            particlesRef.current = p;
        };
        initParticles();

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = (e.clientX - rect.left); // Removed pixelRatio multiply as rect is in CSS pixels
            mouseY = (e.clientY - rect.top);
        };
        if (moveParticlesOnHover) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // Animation loop
        const animate = () => {
            // Clear with transparency
            const width = canvas.width / pixelRatio;
            const height = canvas.height / pixelRatio;

            ctx.clearRect(0, 0, width, height);

            particlesRef.current.forEach((p) => {
                // Move
                p.x += p.dx;
                p.y += p.dy;

                // Wrap around screen
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Hover Effect
                if (moveParticlesOnHover) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const angle = Math.atan2(dy, dx);
                        const force = (100 - dist) / 100;
                        p.x -= Math.cos(angle) * force * 1.5;
                        p.y -= Math.sin(angle) * force * 1.5;
                    }
                }

                // Draw
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [particleColors, particleCount, speed, particleBaseSize, pixelRatio, moveParticlesOnHover, alphaParticles, disableRotation]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
};

export default Particles;
