import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 3000 }) => {
    const mesh = useRef<THREE.Points>(null);
    const mouse = useRef({ x: 0, y: 0 });

    // Generate random positions for particles
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const distance = Math.random() * 10;
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            let x = distance * Math.sin(theta) * Math.cos(phi);
            let y = distance * Math.sin(theta) * Math.sin(phi);
            let z = distance * Math.cos(theta);

            positions.set([x, y, z], i * 3);
        }
        return positions;
    }, [count]);

    // Handle mouse movement for subtle interaction
    useFrame((state) => {
        if (!mesh.current) return;
        
        // Update mouse position smoothly
        mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.mouse.x * Math.PI) / 4, 0.05);
        mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.mouse.y * Math.PI) / 4, 0.05);

        // Rotate the particle system based on mouse position and time
        mesh.current.rotation.y = state.clock.elapsedTime * 0.05 + mouse.current.x;
        mesh.current.rotation.x = state.clock.elapsedTime * 0.02 + mouse.current.y;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#FF4F00"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.3}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const HeroBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <Particles count={4000} />
            </Canvas>
        </div>
    );
};
