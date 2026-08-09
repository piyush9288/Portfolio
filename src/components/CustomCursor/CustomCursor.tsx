import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('[data-no-cursor]')) {
        setIsHovering(false);
        setHoverText('');
        return;
      }

      // Check for elements that should trigger hover state
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover')
      ) {
        setIsHovering(true);
        
        // Check for specific text to display in cursor
        const hoverEl = target.closest('[data-cursor-text]') as HTMLElement;
        if (hoverEl) {
          setHoverText(hoverEl.getAttribute('data-cursor-text') || '');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.1,
        }}
      />
      
      {/* Outer circle / Hover state */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9999]"
        style={{
          border: isHovering ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 16),
          y: mousePosition.y - (isHovering ? 32 : 16),
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {isHovering && hoverText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-white uppercase mix-blend-difference"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
