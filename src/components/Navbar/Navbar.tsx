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
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col justify-center px-10 sm:px-16"
          >
            {/* Background ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Vertical accent line */}
            <div className="absolute left-10 sm:left-16 top-0 bottom-0 w-[1px] bg-white/5" />

            <div className="flex flex-col gap-6 relative z-10">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-mono tracking-[0.3em] text-accent mb-4 flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-accent"></span>
                NAVIGATION
              </motion.div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-end gap-4 text-white w-fit"
                >
                  <span className="text-xs font-mono text-gray-500 mb-2 sm:mb-3">0{i + 1}</span>
                  <span className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase relative group-hover:text-accent transition-colors duration-300">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 + 0.3, ease: 'easeOut' }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative overflow-hidden mt-8 ml-4 sm:ml-8 px-8 py-4 border border-white/20 bg-white/5 text-white font-mono tracking-widest text-xs sm:text-sm rounded-full transition-all duration-500 hover:border-white w-fit"
              >
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500 font-bold">CONTACT ME</span>
              </motion.a>
            </div>

            {/* Menu Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 left-10 sm:left-16 right-10 sm:right-16 flex justify-between items-end border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-1 pl-4 sm:pl-6">
                <span className="text-[10px] sm:text-xs font-mono text-gray-500 tracking-widest uppercase">Piyush Raj</span>
                <span className="text-[10px] sm:text-xs font-mono text-gray-600 tracking-widest">© {new Date().getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                <span className="text-[10px] sm:text-xs font-mono text-gray-400 tracking-widest">SYSTEM ONLINE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
