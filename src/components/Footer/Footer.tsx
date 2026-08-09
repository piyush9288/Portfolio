import React from 'react';
import type { PortfolioData } from '../../types/portfolio';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  data: PortfolioData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-surface border-t border-white/5 py-12 px-6 lg:px-12 relative z-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold tracking-tighter text-white">
            {data.name}
          </span>
          <span className="text-xs font-mono tracking-widest text-gray-500">
            {data.role}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-xs font-mono text-gray-500">
            © {currentYear} ALL RIGHTS RESERVED
          </span>
          
          <button 
            onClick={scrollToTop}
            data-no-cursor="true"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors duration-300 group cursor-pointer wave-circle"
            aria-label="Back to top"
          >
            <style>
              {`
                @keyframes circle-wave {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                .wave-circle:hover {
                  animation: circle-wave 1.5s ease-in-out infinite;
                }
              `}
            </style>
            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
