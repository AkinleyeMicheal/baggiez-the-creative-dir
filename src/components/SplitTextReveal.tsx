import React, { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
    text: string;
    as?: any;
    className?: string;
    type?: 'chars' | 'words' | 'lines';
    delay?: number;
    duration?: number;
    stagger?: number;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
    text,
    as: Component = 'div',
    className = '',
    type = 'chars',
    delay = 0,
    duration = 1,
    stagger = 0.03,
}) => {
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split the text
        const split = new SplitType(textRef.current, { types: type });
        
        // Select the split elements based on type
        const elements = split[type === 'chars' ? 'chars' : type === 'words' ? 'words' : 'lines'];

        if (!elements) return;

        // Set initial state
        gsap.set(elements, {
            y: '100%',
            opacity: 0,
            rotateZ: 5,
        });

        // Create the animation
        const anim = gsap.to(elements, {
            y: '0%',
            opacity: 1,
            rotateZ: 0,
            duration: duration,
            stagger: stagger,
            ease: 'power4.out',
            delay: delay,
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 90%',
                once: true,
            },
        });

        return () => {
            anim.kill();
            split.revert();
        };
    }, [text, type, delay, duration, stagger]);

    return (
        <Component 
            ref={textRef} 
            className={`${className} overflow-hidden`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
            {text}
        </Component>
    );
};
