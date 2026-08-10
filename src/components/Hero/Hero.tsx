import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Scene } from './Scene';
import type { PortfolioData } from '../../types/portfolio';

interface HeroProps {
  data: PortfolioData;
}

// Custom hook for an infinite looping typing effect
const useTypewriter = (text: string, typingSpeed: number = 80, deletingSpeed: number = 40, delay: number = 2500) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      setDisplayedText(text.substring(0, i));

      if (!isDeleting) {
        if (i < text.length) {
          i++;
          timeoutId = setTimeout(tick, typingSpeed);
        } else {
          isDeleting = true;
          timeoutId = setTimeout(tick, delay); // pause at the end
        }
      } else {
        if (i > 0) {
          i--;
          timeoutId = setTimeout(tick, deletingSpeed);
        } else {
          isDeleting = false;
          timeoutId = setTimeout(tick, 500); // pause before retyping
        }
      }
    };

    timeoutId = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [text, typingSpeed, deletingSpeed, delay]);
  
  return displayedText;
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Split name for styling
  const nameParts = data.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Typewriter effect for the role
  const typedRole = useTypewriter(`< ${data.role} />`, 70);

  useEffect(() => {
    // Advanced GSAP animation for text elements
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Top meta reveal
      tl.fromTo(
        '.hero-meta-tech',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Name characters reveal (elastic spring effect)
      tl.fromTo(
        '.name-char',
        { y: 80, opacity: 0, rotateX: -60, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          scale: 1,
          duration: 1.2, 
          stagger: 0.04, 
          ease: 'elastic.out(1, 0.5)'
        },
        "-=0.6"
      );
      
      // Divider line reveal
      tl.fromTo(
        '.hero-divider',
        { width: 0, opacity: 0 },
        { width: '100%', opacity: 1, duration: 1.5, ease: 'power3.inOut' },
        "-=0.8"
      );

      // Description text reveal
      tl.fromTo(
        '.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "-=0.5"
      );
      
      // Badges popping in
      tl.fromTo(
        '.tech-badge',
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
        "-=0.5"
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#030014]"
    >
      {/* 3D Background */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] md:inset-0 md:h-full z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Tech Overlay Grid & Gradient */}
      {/* Gradient to ensure text readability against 3D scene */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b md:bg-gradient-to-r from-[#030014] via-[#030014]/70 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full lg:w-2/3 xl:w-3/5 px-6 md:px-16 lg:px-24 flex flex-col h-full justify-start pt-[10vh] gap-6 md:gap-0 md:py-0 md:justify-center pointer-events-none">
        
        {/* Top Meta tag */}
        <div className="hero-meta-tech flex items-center gap-4 md:mb-8">
          <div className="w-12 h-[2px] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] relative">
            {/* Blinking start node */}
            <motion.div 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-cyan-400 rounded-full"
            />
          </div>
          <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-bold whitespace-nowrap overflow-hidden">
            System Online // Profile
          </span>
        </div>

        {/* Middle Content Grouped for perfect vertical distribution on mobile */}
        <div className="flex flex-col">
          {/* Main Title */}
          <div className="perspective-1000 z-30">
            <h1 className="text-[12vw] sm:text-[10vw] md:text-7xl lg:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase font-heading flex flex-row items-end whitespace-nowrap">
              {/* First Name - Solid White */}
              <div className="flex pb-2">
                {firstName.split('').map((char, i) => (
                  <span key={`f-${i}`} className="name-char inline-block text-white drop-shadow-lg">
                    {char}
                  </span>
                ))}
              </div>
              {/* Space between names - kept tight on all mobile screens */}
              <div className="w-3 md:w-6 lg:w-8 flex-shrink-0"></div>
              {/* Last Name - Glowing Gradient */}
              <div className="flex pb-2">
                {lastName.split('').map((char, i) => (
                  <span key={`l-${i}`} className="name-char inline-block bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </h1>
          </div>
          
          {/* Modern Glowing Divider */}
          <div className="hero-divider h-[1px] max-w-2xl bg-gradient-to-r from-indigo-500 to-transparent my-3 md:my-6 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-[2px] bg-cyan-400 blur-[2px]"></div>
          </div>

          {/* Dynamic Typewriter Role & Description */}
          <div className="hero-desc mt-2 md:mt-4 max-w-3xl">
            <h2 className="text-xs min-[400px]:text-[0.85rem] sm:text-base md:text-3xl text-indigo-200 font-mono font-medium tracking-widest sm:tracking-wide mb-6 h-10 flex items-center whitespace-nowrap overflow-hidden">
              {typedRole}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 sm:w-3 h-5 sm:h-8 bg-cyan-400 ml-2 sm:ml-3 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              />
            </h2>
            <div className="relative border-l-2 border-indigo-500/40 pl-4 sm:pl-6 py-2">
              {/* Decorative corner accent */}
              <div className="absolute top-0 -left-[2px] w-[2px] h-4 bg-cyan-400"></div>
              <p className="text-sm sm:text-base md:text-xl text-gray-400 font-light tracking-normal sm:tracking-wide leading-relaxed">
                {data.about}
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="md:mt-12 flex flex-wrap gap-4">
          {['React 3D', 'Creative Coding', 'Full Stack', 'WebGL'].map((tech, idx) => (
            <div key={idx} className="tech-badge px-5 py-2 rounded-sm border border-indigo-500/30 bg-indigo-900/20 backdrop-blur-md text-indigo-100 font-mono text-xs md:text-sm tracking-widest uppercase hover:border-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-300 transition-all duration-300 pointer-events-auto cursor-default">
              {tech}
            </div>
          ))}
        </div>

        {/* Modern Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-4 cursor-pointer cursor-hover pointer-events-auto group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <div className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400 transition-colors duration-500">
            {/* Pulsing ring */}
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-cyan-400"
            />
            {/* Bouncing dot */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]"
            />
          </div>
          <span className="text-xs font-mono tracking-[0.3em] text-white/50 group-hover:text-cyan-400 transition-colors duration-500">INITIATE_SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
