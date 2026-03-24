import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Create a liquid-like distortion based on time and hover state
    float distortion = sin(uv.y * 10.0 + uTime * 2.0) * 0.02 * uHover;
    distortion += cos(uv.x * 10.0 + uTime * 2.0) * 0.02 * uHover;
    
    // Apply distortion to the UV coordinates
    vec2 distortedUv = uv + vec2(distortion);
    
    // Sample the texture with the distorted UVs
    vec4 color = texture2D(uTexture, distortedUv);
    
    // Add a slight color shift on hover
    color.r += distortion * 0.5;
    color.b -= distortion * 0.5;
    
    gl_FragColor = color;
}
`;

const DistortionMaterial = ({ imageUrl, isHovered }: { imageUrl: string; isHovered: boolean }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(imageUrl);

    // Initialize uniforms
    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uHover: { value: 0 },
        uTime: { value: 0 },
    }), [texture]);

    // Update uniforms on frame
    useFrame((state) => {
        if (!materialRef.current) return;
        
        // Smoothly interpolate hover state
        materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uHover.value,
            isHovered ? 1 : 0,
            0.1
        );
        
        // Update time for the animation
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    });

    return (
        <shaderMaterial
            ref={materialRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
        />
    );
};

interface DistortionImageProps {
    imageUrl: string;
    className?: string;
}

export const DistortionImage: React.FC<DistortionImageProps> = ({ imageUrl, className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ position: 'absolute', inset: 0 }}>
                <mesh>
                    <planeGeometry args={[2, 2]} />
                    <React.Suspense fallback={<meshBasicMaterial color="#111" />}>
                        <DistortionMaterial imageUrl={imageUrl} isHovered={isHovered} />
                    </React.Suspense>
                </mesh>
            </Canvas>
        </div>
    );
};
