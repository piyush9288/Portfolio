import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import type { PortfolioData } from '../../types/portfolio';

interface SkillsProps {
  data: PortfolioData;
}

const getIconUrl = (skill: string) => {
  const s = skill.toLowerCase();
  
  // 100% Reliable Exact mappings for Frameworks and Languages
  switch (s) {
    case 'python': return 'https://skillicons.dev/icons?i=python';
    case 'numpy': return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg';
    case 'pandas': return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg';
    case 'scikit-learn': return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg';
    case 'tensorflow': return 'https://skillicons.dev/icons?i=tensorflow';
    case 'pytorch': return 'https://skillicons.dev/icons?i=pytorch';
    case 'matplotlib': return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg';
    case 'sql': return 'https://skillicons.dev/icons?i=mysql';
    
    case 'git': return 'https://skillicons.dev/icons?i=git';
    case 'github': return 'https://skillicons.dev/icons?i=github';
    case 'vs code': return 'https://skillicons.dev/icons?i=vscode';
    case 'postman': return 'https://skillicons.dev/icons?i=postman';
    case 'jupyter notebook': return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg';
    
    case 'postgresql': return 'https://skillicons.dev/icons?i=postgres';
    case 'mysql': return 'https://skillicons.dev/icons?i=mysql';
    case 'react': return 'https://skillicons.dev/icons?i=react';
    case 'fastapi': return 'https://skillicons.dev/icons?i=fastapi';
    
    // Generative AI
    case 'openai models': return 'https://api.iconify.design/simple-icons/openai.svg?color=white';
    case 'gemini': return 'https://api.iconify.design/logos/google-gemini.svg';
    case 'prompt engineering': return 'https://api.iconify.design/carbon/chat-bot.svg?color=%23f59e0b';
    case 'retrieval-augmented generation (rag)': return 'https://api.iconify.design/carbon/document-tasks.svg?color=%23ec4899';
    case 'langchain': return 'https://api.iconify.design/simple-icons/langchain.svg?color=white';
    
    // Machine Learning
    case 'supervised learning': return 'https://api.iconify.design/carbon/machine-learning.svg?color=%2310b981';
    case 'unsupervised learning': return 'https://api.iconify.design/carbon/chart-scatter.svg?color=%238b5cf6';
    case 'classification': return 'https://api.iconify.design/carbon/categories.svg?color=%23f59e0b';
    case 'regression': return 'https://api.iconify.design/carbon/chart-line.svg?color=%23ef4444';
    case 'clustering': return 'https://api.iconify.design/carbon/data-vis-1.svg?color=%2306b6d4';
    case 'feature engineering': return 'https://api.iconify.design/carbon/data-enrichment.svg?color=%233b82f6';
    case 'model evaluation': return 'https://api.iconify.design/carbon/chart-evaluation.svg?color=%23ec4899';

    // NLP
    case 'transformers': return 'https://api.iconify.design/carbon/network-4.svg?color=%238b5cf6';
    case 'nlp': return 'https://api.iconify.design/carbon/string-text.svg?color=%2310b981';
    case 'text embeddings': return 'https://api.iconify.design/carbon/character-patterns.svg?color=%23f59e0b';
    case 'semantic search': return 'https://api.iconify.design/carbon/search-advanced.svg?color=%2306b6d4';

    // Software Engineering
    case 'data structures': return 'https://api.iconify.design/carbon/data-structured.svg?color=%233b82f6';
    case 'algorithms': return 'https://api.iconify.design/carbon/function-math.svg?color=%23ec4899';
    case 'object-oriented programming': return 'https://api.iconify.design/carbon/object-storage.svg?color=%238b5cf6';
    case 'rest apis': return 'https://api.iconify.design/carbon/api.svg?color=%2310b981';
    case 'debugging': return 'https://api.iconify.design/carbon/debug.svg?color=%23ef4444';
    case 'unit testing': return 'https://api.iconify.design/carbon/test-tool.svg?color=%23f59e0b';
    case 'problem solving': return 'https://api.iconify.design/carbon/idea.svg?color=%2306b6d4';
      
    default: return 'https://api.iconify.design/carbon/code.svg?color=%233b82f6';
  }
};

const FloatingTechIcons = ({ skills }: { skills: string[] }) => {
  const { viewport } = useThree();
  
  // Use a higher threshold since the canvas aspect ratio makes it wider than the phone screen
  const isMobile = viewport.width < 18; 

  return (
    <group>
      {skills.slice(0, 12).map((skill, i) => {
        const total = Math.min(skills.length, 12);
        
        // Use max 3 columns on mobile to ensure it's not too wide
        const maxCols = isMobile ? 3 : 5;
        const columns = total > maxCols ? maxCols : total; 
        const row = Math.floor(i / columns);
        const col = i % columns;
        
        // Dynamically compute spacing so grid never exceeds 80% of the viewport bounds
        const availableWidth = viewport.width * 0.8;
        const availableHeight = viewport.height * 0.8;
        
        const spacingX = columns > 1 ? Math.min(4.0, availableWidth / (columns - 1)) : 0;
        
        const totalRows = Math.ceil(total / columns);
        const spacingY = totalRows > 1 ? Math.min(4.5, availableHeight / (totalRows - 1)) : 0;
        
        const startX = -((columns - 1) * spacingX) / 2;
        const startY = ((totalRows - 1) * spacingY) / 2;
        
        const x = startX + col * spacingX;
        const y = startY - row * spacingY;
        const z = 0;

        return (
          <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[x, y, z]}>
            <Html center transform sprite distanceFactor={isMobile ? 12.5 : 15}>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#0a0a1a]/80 backdrop-blur-xl border border-indigo-500/40 p-3 md:p-5 flex items-center justify-center shadow-[0_4px_15px_rgba(34,211,238,0.1)] hover:border-cyan-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
                <img 
                  src={getIconUrl(skill)} 
                  alt={skill} 
                  className="w-full h-full object-contain filter drop-shadow-md brightness-110" 
                />
              </div>
            </Html>
          </Float>
        );
      })}
    </group>
  );
};

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="relative w-full pt-16 pb-24 md:pt-20 md:pb-32 bg-[#030014] overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
              <h2 className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase font-bold">
                Expertise
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-white whitespace-nowrap overflow-hidden">
              Technical Arsenal
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-indigo-200/60 max-w-md text-base leading-relaxed border-l-2 border-indigo-500/30 pl-4"
          >
            A comprehensive toolset bridging modern software engineering with advanced artificial intelligence and machine learning.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Side - Categories List */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {data.skillCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative p-5 border cursor-hover transition-all duration-300 overflow-hidden flex items-center gap-6 ${
                  activeCategory === idx 
                  ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
                  : 'border-indigo-500/20 bg-indigo-900/10 hover:border-indigo-400/50 hover:bg-indigo-900/30'
                }`}
                onMouseEnter={() => setActiveCategory(idx)}
                onMouseLeave={() => setActiveCategory(null)}
                data-cursor-text="VIEW"
              >
                {/* Left Active Indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${activeCategory === idx ? 'bg-cyan-400' : 'bg-transparent group-hover:bg-indigo-400/50'}`}></div>
                
                {/* Index Number */}
                <div className={`font-mono text-xl font-bold transition-colors duration-300 ${activeCategory === idx ? 'text-cyan-400' : 'text-indigo-500/40'}`}>
                  0{idx + 1}
                </div>
                
                <div className="flex flex-col">
                  <h4 className={`text-lg font-bold tracking-wide transition-colors duration-300 ${activeCategory === idx ? 'text-white' : 'text-indigo-100/80 group-hover:text-indigo-100'}`}>
                    {cat.title}
                  </h4>
                  <p className="text-xs font-mono text-indigo-300/50 mt-1 uppercase tracking-wider">
                    {cat.skills.length} Technologies
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Dynamic 3D Display & Skills */}
          <div className="lg:col-span-8">
            <div className="sticky top-24 relative h-[500px] lg:h-[600px] rounded-sm border border-indigo-500/20 bg-indigo-900/5 flex flex-col items-center justify-center overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />

              <AnimatePresence mode="wait">
                {activeCategory !== null ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full flex flex-col relative z-10"
                  >
                    {/* 3D Canvas Area */}
                    <div className="h-3/5 w-full relative">
                      {/* Grid Floor overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none z-10 border-b border-indigo-500/20"></div>
                      
                      {/* Pulled camera much further back to z=16 so the widely spaced grid fits in the frame */}
                      <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
                        <Suspense fallback={null}>
                          <FloatingTechIcons skills={data.skillCategories[activeCategory].skills} />
                        </Suspense>
                      </Canvas>
                    </div>

                    {/* Skills Tag Area */}
                    <div className="h-2/5 w-full p-6 md:p-8 flex flex-col justify-start bg-indigo-950/20 backdrop-blur-sm border-t border-indigo-500/20">
                      <motion.h4 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm sm:text-base md:text-xl font-bold text-cyan-400 mb-4 md:mb-6 tracking-normal sm:tracking-wider uppercase flex items-center gap-2 sm:gap-3 whitespace-nowrap overflow-hidden"
                      >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0"></span>
                        {data.skillCategories[activeCategory].title}
                      </motion.h4>
                      
                      <div className="flex flex-wrap gap-3">
                        {data.skillCategories[activeCategory].skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 + 0.2, type: 'spring', damping: 12 }}
                            className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-sm font-mono text-indigo-100 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-colors cursor-hover shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-indigo-300/40 font-mono text-sm relative z-10"
                  >
                    <div className="w-16 h-16 rounded-full border border-dashed border-indigo-500/30 flex items-center justify-center mb-6 animate-spin-slow">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                    [ HOVER OVER A SYSTEM TO INITIALIZE ]
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Skills;
