import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioData } from '../../types/portfolio';
import { ArrowRight, Mail, Phone, MapPin, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  data: PortfolioData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isMobile) {
      e.preventDefault();
      navigator.clipboard.writeText(data.contact.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-text-line',
        { y: 100, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative w-full section-padding bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background pointer-events-none" />

      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10 flex flex-col items-center text-center">
        
        <div className="text-xs font-mono tracking-widest text-accent mb-12 flex items-center justify-center gap-4 w-full">
          <span className="w-8 h-[1px] bg-accent"></span>
          GET IN TOUCH
          <span className="w-8 h-[1px] bg-accent"></span>
        </div>

        <div className="perspective-1000 mb-12 md:mb-20 w-full overflow-hidden">
          <h2 className="text-[8vw] sm:text-[7vw] md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.9]">
            <div className="overflow-hidden p-1 md:p-2"><div className="cta-text-line whitespace-nowrap">LET'S BUILD SOMETHING</div></div>
            <div className="overflow-hidden p-1 md:p-2"><div className="cta-text-line text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent whitespace-nowrap">INTELLIGENT.</div></div>
          </h2>
        </div>

        <a 
          href={`mailto:${data.contact.email}`}
          data-cursor-text="Email"
          className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          <div className="relative z-10 flex items-center gap-4 text-white group-hover:text-black transition-colors duration-500">
            <div className="relative overflow-hidden">
              <span className="inline-block text-sm md:text-base font-mono tracking-widest font-bold transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%] opacity-100 group-hover:opacity-0">LET'S TALK</span>
              <span className="absolute left-0 top-0 inline-block text-sm md:text-base font-mono tracking-widest font-bold transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100">LET'S TALK</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
              <ArrowRight className="w-5 h-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
            </div>
          </div>
        </a>

        <div className="mt-32 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-16">
          <a href={`mailto:${data.contact.email}`} data-no-cursor="true" className="flex flex-col items-center text-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-500" />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1 tracking-widest group-hover:text-white transition-colors duration-500">EMAIL</p>
              <p className="text-sm text-gray-300">{data.contact.email}</p>
            </div>
          </a>
          
          <a 
            href={`tel:${data.contact.phone.replace(/\s+/g, '')}`} 
            onClick={handlePhoneClick}
            data-no-cursor="true"
            className="flex flex-col items-center text-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500">
              <Phone className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-500" />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1 tracking-widest group-hover:text-white transition-colors duration-500">PHONE</p>
              <div className="text-sm text-gray-300 relative">
                {data.contact.phone}
                <span className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black font-bold text-xs px-2 py-1 rounded shadow-lg transition-all duration-300 pointer-events-none whitespace-nowrap ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  Copied!
                </span>
              </div>
            </div>
          </a>
          
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" data-no-cursor="true" className="flex flex-col items-center text-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0077b5] group-hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] transition-all duration-500">
              <Globe className="w-5 h-5 text-gray-400 group-hover:text-[#0077b5] group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-500" />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1 tracking-widest group-hover:text-white transition-colors duration-500">SOCIAL</p>
              <p className="text-sm text-gray-300">LinkedIn</p>
            </div>
          </a>
          
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1 tracking-widest">LOCATION</p>
              <p className="text-sm text-gray-300 max-w-[200px] leading-relaxed">{data.contact.address}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
