import React, { useEffect, useState } from 'react';

const CHARS = '—/\\|()[]{}<>+*^?#0123456789';

interface GlitchTextProps {
    text: string;
    delay?: number;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, delay = 0, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let frame: number;
        let iteration = 0;

        const startAnimation = () => {
            setStarted(true);
            const animate = () => {
                setDisplayText(
                    text
                        .split('')
                        .map((letter, index) => {
                            if (letter === ' ') return ' ';
                            if (index < iteration) return text[index];
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join('')
                );

                if (iteration >= text.length) {
                    cancelAnimationFrame(frame);
                } else {
                    iteration += 1 / 1.2; // Was 1/4 — increase this number to go even faster
                    frame = requestAnimationFrame(animate);
                }
            };
            frame = requestAnimationFrame(animate);
        };

        timeout = setTimeout(startAnimation, delay * 1000);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(frame);
        };
    }, [text, delay]);

    return (
        <span className={`relative inline-block font-clash -tracking-tight font-medium opacity-80 ${className}`}>
            <span className="opacity-0">{text}</span>
            <span className="absolute top-0 left-0 w-full h-full">
                {started ? displayText : ''}
            </span>
        </span>
    );
};