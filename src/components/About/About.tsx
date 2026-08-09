import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { PortfolioData } from '../../types/portfolio';

interface AboutProps {
  data: PortfolioData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for the large background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const features = [
    { title: "AI / ML", desc: "Building intelligent predictive models", icon: "🧠" },
    { title: "GENERATIVE AI", desc: "RAG systems & LLM integrations", icon: "⚡" },
    { title: "BACKEND", desc: "Scalable APIs with Python & FastAPI", icon: "⚙️" },
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full pt-16 pb-24 md:pt-20 md:pb-32 bg-[#030014] overflow-hidden"
    >
      {/* Decorative background text */}
      <motion.div 
        style={{ x: bgX }}
        className="absolute top-[15%] left-0 whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0"
      >
        <h2 className="text-[18vw] font-bold leading-none tracking-tighter text-cyan-400">
          ARCHITECTURE
        </h2>
      </motion.div>

      {/* Grid Lines with Moving Data Animations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Horizontal Line 1 */}
        <div className="absolute top-[25%] w-full h-[1px] bg-indigo-500/10">
          <motion.div
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="w-1/4 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
          />
        </div>
        {/* Horizontal Line 2 */}
        <div className="absolute top-[65%] w-full h-[1px] bg-indigo-500/10">
          <motion.div
            animate={{ x: ['300%', '-100%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60"
          />
        </div>
        {/* Horizontal Line 3 (Bottom) */}
        <div className="absolute bottom-[10%] w-full h-[1px] bg-indigo-500/10">
          <motion.div
            animate={{ x: ['-50%', '200%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="w-1/5 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80"
          />
        </div>
        
        {/* Vertical Line 1 */}
        <div className="absolute left-[15%] lg:left-[25%] h-full w-[1px] bg-indigo-500/10">
          <motion.div
            animate={{ y: ['-100%', '400%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="h-1/4 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-70"
          />
        </div>
        {/* Vertical Line 2 */}
        <div className="absolute right-[15%] lg:right-[30%] h-full w-[1px] bg-indigo-500/10">
          <motion.div
            animate={{ y: ['400%', '-100%'] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
            className="h-1/5 w-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-70"
          />
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        {/* Full width container, no max-w limits */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 relative w-full">
          
          {/* Left Column - Headers */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="xl:w-1/3 flex-shrink-0"
          >
            {/* Meta Tag */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] relative">
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-cyan-400 rounded-full"
                />
              </div>
              <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">
                Introduction
              </span>
            </div>

            {/* Title */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1] uppercase perspective-1000">
              <motion.div 
                initial={{ opacity: 0, y: 30, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="pb-3 whitespace-nowrap overflow-hidden"
              >
                <span className="text-white">Merging</span>{' '}
                <span className="text-indigo-200">Software</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">with AI.</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="xl:w-2/3 flex flex-col justify-center">
            {/* Main Paragraph - Highlight on scroll */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.04 } },
                hidden: {}
              }}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-indigo-100/50 mb-12 md:mb-20"
            >
              {data.about.split(' ').map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0.2, y: 15, color: '#4b5563' },
                    visible: { opacity: 1, y: 0, color: '#e0e7ff', transition: { duration: 0.5 } }
                  }}
                  className="inline-block mr-3 lg:mr-4"
                >
                  {word}
                </motion.span>
              ))}
              <br/>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
                }}
                className="inline-block mt-6 sm:mt-8 text-cyan-200/60 text-base sm:text-lg md:text-2xl lg:text-3xl"
              >
                Specializing in Natural Language Processing, Retrieval-Augmented Generation, and full-stack system architecture.
              </motion.span>
            </motion.div>

            {/* Tech Feature Panels */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-indigo-500/20 relative"
            >
              {/* Glowing decorative dot on border */}
              <div className="absolute top-[-2px] left-0 w-32 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } }
                  }}
                  className="group relative p-8 border border-indigo-500/20 bg-indigo-900/10 backdrop-blur-sm hover:bg-indigo-800/30 transition-all duration-500 overflow-hidden cursor-hover" 
                  data-cursor-text="EXPLORE"
                >
                  {/* Hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Bottom border glow on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-400 group-hover:w-full transition-all duration-500"></div>
                  
                  <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform origin-left">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-wider mb-2 sm:mb-3 text-indigo-100 group-hover:text-cyan-300 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-indigo-200/60 font-mono tracking-wide leading-relaxed group-hover:text-indigo-100/90 transition-colors duration-300">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
