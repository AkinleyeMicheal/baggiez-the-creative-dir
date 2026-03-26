import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // ↑ No useSpring at all — motion values are set and read directly,
    //   so the cursor position updates synchronously on every mousemove.

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
            const isPlayable = target.closest('[data-playable="true"]');
            const isViewable = target.closest('[data-viewable="true"]');

            if (isClickable || isPlayable || isViewable) {
                setIsHovering(true);
                if (isPlayable) setHoverText('PLAY');
                else if (isViewable) setHoverText('VIEW');
                else setHoverText('');
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
            className="fixed top-0 left-0 z-100 pointer-events-none flex items-center justify-center"
            style={{
                x: cursorX,       // ← raw motion value, no spring wrapper
                y: cursorY,       // ← raw motion value, no spring wrapper
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <motion.div
                className="absolute rounded-full border flex items-center justify-center"
                animate={{
                    width: isHovering ? (hoverText ? 72 : 56) : 32,
                    height: isHovering ? (hoverText ? 72 : 56) : 32,
                    backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.03)' : 'rgba(255, 79, 0, 0)',
                    borderColor: isHovering ? 'rgba(255, 79, 0, 0.4)' : 'rgba(161, 161, 170, 0.4)',
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
            >
                <motion.div className="absolute" animate={{ width: isHovering ? '3px' : '6px', height: '1px', backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)' }} style={{ left: '-3px' }} />
                <motion.div className="absolute" animate={{ width: isHovering ? '3px' : '6px', height: '1px', backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)' }} style={{ right: '-3px' }} />
                <motion.div className="absolute" animate={{ width: '1px', height: isHovering ? '3px' : '6px', backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)' }} style={{ top: '-3px' }} />
                <motion.div className="absolute" animate={{ width: '1px', height: isHovering ? '3px' : '6px', backgroundColor: isHovering ? 'rgba(255, 79, 0, 0.8)' : 'rgba(161, 161, 170, 0.8)' }} style={{ bottom: '-3px' }} />

                <motion.div className="absolute flex items-center justify-center" animate={{ opacity: hoverText ? 0 : 1, scale: isHovering ? 0.5 : 1 }}>
                    <div className="w-px h-1 bg-zinc-300 absolute" />
                    <div className="w-1 h-px bg-zinc-300 absolute" />
                </motion.div>

                {hoverText && (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-[9px] font-medium tracking-widest text-[#FF4F00] uppercase absolute">
                        {hoverText}
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    );
};