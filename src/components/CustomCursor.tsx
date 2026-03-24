import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Smooth spring configuration for the cinematic feel
    const springConfig = { damping: 25, stiffness: 700, mass: 0.05 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if device is touch-enabled
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check if hovering over clickable elements
            const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
            
            // Check if hovering over media
            const isPlayable = target.closest('[data-playable="true"]');
            const isViewable = target.closest('[data-viewable="true"]');

            if (isClickable || isPlayable || isViewable) {
                setIsHovering(true);
                
                if (isPlayable) {
                    setHoverText('PLAY');
                } else if (isViewable) {
                    setHoverText('VIEW');
                } else {
                    setHoverText('');
                }
            } else {
                setIsHovering(false);
                setHoverText('');
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
            setHoverText('');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        // Add a class to body to hide default cursors
        document.body.classList.add('custom-cursor-enabled');

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            document.body.classList.remove('custom-cursor-enabled');
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            {/* Outer Circle */}
            <motion.div
                className="absolute rounded-full border flex items-center justify-center"
                animate={{
                    width: isHovering ? (hoverText ? 72 : 56) : 32,
                    height: isHovering ? (hoverText ? 72 : 56) : 32,
                    backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.03)' : 'rgba(255, 79, 0, 0)',
                    borderColor: isHovering ? 'rgba(255, 79, 0, 0.4)' : 'rgba(161, 161, 170, 0.4)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {/* Crosshair lines (Top, Bottom, Left, Right) */}
                <motion.div 
                    className="absolute"
                    animate={{
                        width: isHovering ? '3px' : '6px',
                        height: '1px',
                        backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)',
                    }}
                    style={{ left: '-3px' }}
                />
                <motion.div 
                    className="absolute"
                    animate={{
                        width: isHovering ? '3px' : '6px',
                        height: '1px',
                        backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)',
                    }}
                    style={{ right: '-3px' }}
                />
                <motion.div 
                    className="absolute"
                    animate={{
                        width: '1px',
                        height: isHovering ? '3px' : '6px',
                        backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)',
                    }}
                    style={{ top: '-3px' }}
                />
                <motion.div 
                    className="absolute"
                    animate={{
                        width: '1px',
                        height: isHovering ? '3px' : '6px',
                        backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)',
                    }}
                    style={{ bottom: '-3px' }}
                />

                {/* Center dot/cross */}
                <motion.div
                    className="absolute flex items-center justify-center"
                    animate={{
                        opacity: hoverText ? 0 : 1,
                        scale: isHovering ? 0.5 : 1,
                    }}
                >
                    <div className="w-[1px] h-[4px] bg-zinc-300 absolute" />
                    <div className="w-[4px] h-[1px] bg-zinc-300 absolute" />
                </motion.div>

                {/* Hover Text */}
                {hoverText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-medium tracking-widest text-[#FF4F00] uppercase absolute"
                    >
                        {hoverText}
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    );
};
