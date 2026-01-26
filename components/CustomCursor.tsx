import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main cursor spring configuration
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail springs with graduated lag (increasing mass, decreasing stiffness)
  const trail1X = useSpring(cursorX, { damping: 20, stiffness: 120, mass: 0.6 });
  const trail1Y = useSpring(cursorY, { damping: 20, stiffness: 120, mass: 0.6 });

  const trail2X = useSpring(cursorX, { damping: 20, stiffness: 90, mass: 0.7 });
  const trail2Y = useSpring(cursorY, { damping: 20, stiffness: 90, mass: 0.7 });

  const trail3X = useSpring(cursorX, { damping: 20, stiffness: 60, mass: 0.8 });
  const trail3Y = useSpring(cursorY, { damping: 20, stiffness: 60, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-hover]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const checkVisibility = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsVisible(!isTouch);
    };

    checkVisibility();
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchstart', checkVisibility);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', checkVisibility);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing Elements (fades out when hovering interactive elements) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-orange pointer-events-none z-[9990] rounded-sm"
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 0 : 0.2
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-orange pointer-events-none z-[9991] rounded-sm"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 0 : 0.4
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-orange pointer-events-none z-[9992] rounded-sm"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 0 : 0.6
        }}
      />

      {/* Main Cursor Box */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 border border-latte-500/80 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? '#E67E22' : '#EBE0D6',
          backgroundColor: isHovering ? 'transparent' : 'transparent',
          borderRadius: isHovering ? '0px' : '2px',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Target Reticle Lines (Only visible when hovering) */}
      <motion.div
        className="fixed top-0 left-0 w-[40px] h-[1px] bg-accent-orange pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 1 : 0,
          scaleX: isHovering ? 1 : 0
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[1px] h-[40px] bg-accent-orange pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 1 : 0,
          scaleY: isHovering ? 1 : 0
        }}
      />
    </>
  );
};

export default CustomCursor;