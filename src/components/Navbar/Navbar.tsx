import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EDUCATION', href: '#education' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            className="text-xl font-bold tracking-tighter text-white cursor-hover flex items-center gap-2"
            data-cursor-text="HOME"
          >
            PIYUSH RAJ
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  data-no-cursor="true"
                  className="text-sm font-mono tracking-widest text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 relative group inline-block"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <a 
              href="#contact" 
              data-no-cursor="true"
              className="group relative overflow-hidden px-6 py-2 border border-white/20 rounded-full text-sm font-mono tracking-widest transition-all duration-500 hover:scale-105 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] inline-block"
            >
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
              <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">CONTACT</span>
            </a>
            
            <button
              onClick={toggleTheme}
              data-no-cursor="true"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-all duration-300 z-[60]"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="flex flex-col justify-center items-center w-10 h-10 z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`w-6 h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'}`}></span>
              <span className={`w-6 h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[0px]' : 'translate-y-1'}`}></span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-surface flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tighter text-white"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 + 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative overflow-hidden mt-8 px-8 py-3 border border-white/20 text-white font-mono tracking-widest text-sm rounded-full transition-all duration-500 hover:border-white"
              >
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">CONTACT ME</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
