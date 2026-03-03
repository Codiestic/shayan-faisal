import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function initBlackHole(container, onEnter) {
    if (!container) return;

    // --- Configuration ---
    const config = {
        starCount: 45000,
        starFieldRadius: 1200,
        bloomStrength: 0.4, // Reduced from 0.7 to prevent Whiteout
        bloomRadius: 0.7,
        bloomThreshold: 0.75
    };

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000004, 0.085);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 5, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    container.appendChild(renderer.domElement);

    // --- Post Processing ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        config.bloomStrength, config.bloomRadius, config.bloomThreshold
    );
    composer.addPass(bloomPass);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.rotateSpeed = 0.6;
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 100;

    // --- Theme (Interstellar / Inferno) ---
    // --- Theme (Monochromatic Void) ---
    const theme = {
        diskHot: new THREE.Color(0xffffff), // Pure White Core
        diskMid: new THREE.Color(0xd0d0d0), // Light Silver
        diskEdge: new THREE.Color(0x808080), // Grey Edge
        diskDeep: new THREE.Color(0x202020), // Dark Grey/Black
        lensing: new THREE.Color(0xffffff),
        glow: new THREE.Color(0xffffff),
        photonSphere: new THREE.Color(0xffffff),
        primaryWave: new THREE.Color(0x808080),
        secondaryWave: new THREE.Color(0x404040),
        tertiaryWave: new THREE.Color(0x202020)
    };

    // --- Objects ---

    // 1. Stars
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.starCount * 3);
    const colors = new Float32Array(config.starCount * 3);
    const sizes = new Float32Array(config.starCount);
    const alphas = new Float32Array(config.starCount);

    const baseColor = new THREE.Color(0xffffff);
    const blueColor = new THREE.Color(0xe0e0e0); // Light Grey
    const yellowColor = new THREE.Color(0xc0c0c0); // Silver
    const redColor = new THREE.Color(0xa0a0a0); // Grey

    for (let i = 0; i < config.starCount; i++) {
        const i3 = i * 3;
        // Golden ratio distribution for even spread sphere
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / config.starCount);
        const r = Math.cbrt(Math.random()) * config.starFieldRadius; // Cubic root for uniform volume

        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);

        // Color variation
        const starColor = baseColor.clone();
        const type = Math.random();
        if (type < 0.5) starColor.lerp(blueColor, Math.random() * 0.3);
        else if (type < 0.85) starColor.lerp(yellowColor, Math.random() * 0.2);
        else starColor.lerp(redColor, Math.random() * 0.15);

        colors[i3] = starColor.r; colors[i3 + 1] = starColor.g; colors[i3 + 2] = starColor.b;

        // Size variation
        const sizeRand = Math.random();
        if (sizeRand > 0.997) sizes[i] = THREE.MathUtils.randFloat(1.5, 2.2);
        else if (sizeRand > 0.98) sizes[i] = THREE.MathUtils.randFloat(0.8, 1.5);
        else sizes[i] = THREE.MathUtils.randFloat(0.3, 0.8);

        alphas[i] = Math.random() * 0.5 + 0.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const starMaterial = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            attribute float size; attribute float alpha; varying vec3 vColor; varying float vAlpha;
            void main() {
                vColor = color; vAlpha = alpha;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (350.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform float uTime; varying vec3 vColor; varying float vAlpha;
            void main() {
                float r = length(gl_PointCoord - vec2(0.5));
                if (r > 0.5) discard;
                float twinkle = sin(uTime * (vAlpha * 2.0) + vAlpha * 10.0) * 0.2 + 0.8;
                gl_FragColor = vec4(vColor * twinkle, vAlpha);
            }
        `,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);


    // 2. Black Hole Core
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 64, 32),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    scene.add(core);

    // 3. Accretion Disk (The Main Event)
    const diskGeo = new THREE.RingGeometry(1.15, 5.5, 128, 64);
    const diskMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColorHot: { value: theme.diskHot },
            uColorMid: { value: theme.diskMid },
            uColorEdge: { value: theme.diskEdge },
            uColorDeep: { value: theme.diskDeep },
            uCameraPosition: { value: camera.position },
            uOpacity: { value: 1.0 } // Add Opacity Control
        },
        vertexShader: `
            varying vec2 vUv; varying vec3 vPos; varying float vR;
            void main() {
                vUv = uv; vPos = position; vR = length(position.xy);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime; uniform vec3 uCameraPosition; uniform float uOpacity; // Add definition
            uniform vec3 uColorHot; uniform vec3 uColorMid; uniform vec3 uColorEdge; uniform vec3 uColorDeep;
            varying vec3 vPos; varying float vR;
            
            // Noise
            float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
            float noise(vec2 p) {
                vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
                           mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
            }
            float fbm(vec2 p) {
                float v = 0.0; float a = 0.5;
                for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
                return v;
            }

            void main() {
                float dist = vR;
                float normDist = (dist - 1.15) / (5.5 - 1.15); // 0 to 1
                float angle = atan(vPos.y, vPos.x);
                
                // Rotation
                float speed = 5.0 / (dist * dist + 0.1);
                float rotAngle = angle - uTime * speed * 0.2;
                
                // Noise Pattern
                float n = fbm(vec2(dist * 2.0, rotAngle * 4.0));
                
                // Color ramp
                vec3 col = mix(uColorHot, uColorMid, smoothstep(0.0, 0.3, normDist));
                col = mix(col, uColorEdge, smoothstep(0.3, 0.7, normDist));
                col = mix(col, uColorDeep, smoothstep(0.7, 1.0, normDist));
                
                // Intensity modulation by noise
                col *= (0.5 + 1.0 * n);
                
                // Relativistic Beaming (Simple Approximation)
                // If disk is moving towards camera, it's brighter.
                // Tangent vector is (-y, x). User is at uCamera.
                vec3 tang = normalize(vec3(-vPos.y, vPos.x, 0.0));
                vec3 view = normalize(uCameraPosition - vPos);
                float beam = dot(tang, view); // -1 to 1
                // We only beam on the side moving towards us.
                float boost = 1.0 + 0.5 * beam; 
                col *= boost;

                // Alpha fade out
                float alpha = smoothstep(0.0, 0.1, normDist) * (1.0 - smoothstep(0.9, 1.0, normDist));
                alpha *= (0.6 + 0.4 * n);
                alpha *= uOpacity; // Apply Global Opacity

                gl_FragColor = vec4(col * 2.5, alpha); // Boost brightness for Bloom
            }
        `,
        transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.rotation.x = Math.PI / 2.5; // Tilted view
    scene.add(disk);

    // 4. Photon Sphere (Glowing Ring)
    const photonGeo = new THREE.SphereGeometry(1.5, 64, 32);
    const photonMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: theme.photonSphere }, uTime: { value: 0 }, uOpacity: { value: 1.0 } },
        vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
            uniform vec3 uColor; varying vec3 vNormal; uniform float uOpacity;
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0,0,1)), 4.0);
                gl_FragColor = vec4(uColor, intensity * 0.8 * uOpacity);
            }
        `,
        transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const photonSphere = new THREE.Mesh(photonGeo, photonMat);
    scene.add(photonSphere);


    // --- Animation Logic ---
    let frameId;
    let isEntering = false;
    let entryStart = 0;
    const entryDuration = 3.5;
    const startPos = new THREE.Vector3();
    const targetPos = new THREE.Vector3(0, 0, 0.1);

    const clock = new THREE.Clock();

    function animate() {
        frameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        const delta = clock.getDelta();

        // Update uniforms
        starMaterial.uniforms.uTime.value = elapsed;
        diskMat.uniforms.uTime.value = elapsed;
        diskMat.uniforms.uCameraPosition.value.copy(camera.position);

        // Rotate Stars slowly
        stars.rotation.y = elapsed * 0.01;

        // Intro Animation
        if (isEntering) {
            const t = (elapsed - entryStart) / entryDuration;
            if (t <= 1.0) {
                // Smooth Step Ease
                const ease = t * t * (3 - 2 * t);
                camera.position.lerpVectors(startPos, targetPos, ease);
                camera.lookAt(0, 0, 0);

                // Intensify bloom as we get closer
                bloomPass.strength = 0.4 + ease * 0.8;

                // Fade Out Black Hole objects at the very end to prevent white flash
                if (t > 0.8) {
                    const fadeT = (t - 0.8) / 0.2; // 0 to 1 over the last 20%
                    const opacity = 1.0 - fadeT;
                    diskMat.uniforms.uOpacity.value = opacity;
                    photonMat.uniforms.uOpacity.value = opacity;
                }
            } else {
                // Finished
                if (onEnter) {
                    onEnter();
                    // Stop calling onEnter repeatedly
                    onEnter = null;
                }
            }
        } else {
            controls.update();
        }

        composer.render();
    }

    animate();

    // --- Resize Handler ---
    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        bloomPass.resolution.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- API ---
    return {
        triggerEntry: () => {
            isEntering = true;
            entryStart = clock.getElapsedTime();
            startPos.copy(camera.position);
            controls.enabled = false;
        },
        dispose: () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            // Disposing geometries/materials is good practice but omitted for brevity in this snippet
        }
    };
}
