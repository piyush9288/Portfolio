import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioData } from '../../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  data: PortfolioData;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const panels = gsap.utils.toArray('.project-panel') as HTMLElement[];
      
      // Calculate snap points for the timeline
      const moveDuration = panels.length > 1 ? panels.length - 1 : 1;
      const pauseDuration = 1; // 1 unit of pause at the end
      const totalDuration = moveDuration + pauseDuration;
      const snapPoints = [];
      for (let i = 0; i <= moveDuration; i++) {
        snapPoints.push(i / totalDuration);
      }
      snapPoints.push(1);

      const mainScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: snapPoints,
          end: () => `+=${scrollContainer.offsetWidth + window.innerHeight}`,
          onLeave: () => {
            // Hide the last project when scrolling down into the footer
            if (panels.length > 0) {
              const lastPanelContent = panels[panels.length - 1].children[0].children;
              gsap.set(lastPanelContent, { opacity: 0, y: 100 });
            }
          },
          onEnterBack: () => {
            // Animate it back up smoothly when scrolling up into the projects section
            if (panels.length > 0) {
              const lastPanelContent = panels[panels.length - 1].children[0].children;
              gsap.to(lastPanelContent, {
                opacity: 1,
                y: 0,
                stagger: 0.4,
                duration: 2.0,
                ease: 'power2.out'
              });
            }
          }
        }
      });
      
      mainScrollTimeline.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        duration: moveDuration
      })
      .to({}, { duration: pauseDuration });
      
      // Animations within panels
      panels.forEach((panel, index) => {
        // Select the Content Side and Visual Side containers
        const contentElems = panel.children[0].children;
        
        if (index === 0) {
          // First project animates vertically when scrolling down into the section
          gsap.fromTo(contentElems,
            { opacity: 0, y: 100 },
            {
              opacity: 1, 
              y: 0,
              stagger: 0.4,
              duration: 2.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%', // Animate when section is 75% in viewport
                toggleActions: 'play none none reverse'
              }
            }
          );
        } else {
          // Subsequent projects animate horizontally as they scroll into view
          gsap.fromTo(contentElems, 
            { opacity: 0, x: 100 },
            { 
              opacity: 1, 
              x: 0,
              stagger: 0.3,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: mainScrollTimeline,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Dynamic animated visual generators based on project ID
  const getVisual = (id: string) => {
    switch(id) {
      case 'ai-personal-os':
        return (
          <div className="w-full h-full flex flex-col justify-center items-center gap-3 md:gap-4 relative p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
            <div className="flex flex-wrap justify-center items-center gap-1.5 md:gap-4 z-10 text-[10px] sm:text-xs md:text-sm font-mono text-gray-400">
              <motion.span 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="px-2 py-1 md:px-3 md:py-1 border border-white/20 rounded-full bg-white/5"
              >
                TASKS
              </motion.span>
              <span className="text-accent">→</span>
              <motion.span 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="px-2 py-1 md:px-3 md:py-1 border border-white/20 rounded-full bg-white/5"
              >
                GOALS
              </motion.span>
              <span className="text-accent">→</span>
              <motion.span 
                animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,255,255,0)", "0px 0px 20px rgba(0,255,255,0.5)", "0px 0px 0px rgba(0,255,255,0)"] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="px-2 py-1 md:px-3 md:py-1 border border-accent bg-accent/20 rounded-full text-white font-bold"
              >
                AI CORE
              </motion.span>
            </div>
            <div className="mt-4 md:mt-8 w-32 h-32 md:w-48 md:h-48 border border-white/10 rounded-full flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
               <div className="absolute w-full h-[1px] bg-accent/50 rotate-45" />
               <div className="absolute w-full h-[1px] bg-accent/50 -rotate-45" />
               <div className="w-16 h-16 md:w-24 md:h-24 border border-accent/50 rounded-full animate-[spin_10s_reverse_linear_infinite] flex items-center justify-center relative">
                  {/* Moving data packets on the ring */}
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full rounded-full"
                  >
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_15px_white] absolute top-[-4px] md:top-[-6px] left-1/2 -translate-x-1/2" />
                  </motion.div>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-accent rounded-full shadow-[0_0_20px_var(--color-accent)] animate-pulse" />
               </div>
            </div>
          </div>
        );
      case 'smart-research-assistant':
        return (
          <div className="w-full h-full flex flex-col justify-center items-center gap-3 md:gap-6 relative p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background" />
            
            <div className="flex flex-col items-center z-10 w-full max-w-sm">
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-base border border-white/10 bg-white/5 rounded backdrop-blur-sm"
              >
                DOCUMENT
              </motion.div>
              
              {/* Flowing data line */}
              <div className="h-6 md:h-10 w-[2px] bg-white/10 relative overflow-hidden my-1.5 md:my-2">
                <motion.div 
                  animate={{ y: [-40, 40] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-1/2 bg-cyan-400 blur-[2px]" 
                />
              </div>

              <div className="flex gap-2 md:gap-4 flex-wrap justify-center max-w-[200px] md:max-w-none">
                {[1,2,3,4].map((item, i) => (
                  <motion.div 
                    key={item} 
                    animate={{ y: [0, -10, 0], borderColor: ["rgba(6,182,212,0.3)", "rgba(6,182,212,1)", "rgba(6,182,212,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-8 h-8 md:w-10 md:h-10 bg-cyan-500/10 border-2 rounded-lg flex items-center justify-center text-xs md:text-sm font-mono text-cyan-200"
                  >
                    E{item}
                  </motion.div>
                ))}
              </div>
              
              {/* Flowing data line */}
              <div className="h-6 md:h-10 w-[2px] bg-cyan-500/20 relative overflow-hidden my-1.5 md:my-2">
                <motion.div 
                  animate={{ y: [-40, 40] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  className="w-full h-1/2 bg-cyan-400 blur-[2px]" 
                />
              </div>

              <motion.div 
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 15px rgba(6,182,212,0.3)", "0 0 30px rgba(6,182,212,0.8)", "0 0 15px rgba(6,182,212,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-4 py-2 md:px-8 md:py-3 border border-cyan-400 bg-cyan-900/30 rounded-xl text-cyan-300 font-bold tracking-widest backdrop-blur-md text-xs md:text-base text-center"
              >
                LLM ANSWER
              </motion.div>
            </div>
          </div>
        );
      case 'ai-resume-analyzer':
        return (
          <div className="w-full h-full flex flex-col justify-center items-center gap-4 relative py-6">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-900/30 via-background to-background" />
             
             <div className="relative z-10 flex flex-col sm:grid sm:grid-cols-2 gap-4 md:gap-8 w-full max-w-lg px-4 md:px-8">
                {/* Resume Scanning Animation */}
                <div className="border border-white/20 bg-white/5 p-4 md:p-5 rounded-lg flex flex-col gap-3 md:gap-4 relative overflow-hidden h-28 md:h-40 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                   <div className="w-full h-1.5 md:h-2 bg-white/10 rounded" />
                   <div className="w-3/4 h-1.5 md:h-2 bg-white/10 rounded" />
                   <div className="w-5/6 h-1.5 md:h-2 bg-white/10 rounded" />
                   <div className="w-1/2 h-1.5 md:h-2 bg-white/10 rounded" />
                   <div className="w-full h-1.5 md:h-2 bg-white/10 rounded" />
                   
                   {/* Laser Scanner */}
                   <motion.div 
                     animate={{ y: [-10, 100, -10] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute top-0 left-0 w-full h-[2px] bg-violet-400 shadow-[0_0_15px_rgba(139,92,246,1)] z-20" 
                   >
                     <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-violet-500/40 to-transparent pointer-events-none" />
                   </motion.div>
                </div>
                
                {/* Metrics */}
                <div className="flex flex-col justify-center gap-4 md:gap-6">
                   <div className="flex flex-col gap-1 md:gap-2">
                     <div className="flex items-center justify-between text-[10px] md:text-xs font-mono">
                       <span className="text-gray-300">NLP PARSING</span>
                       <span className="text-green-400">100%</span>
                     </div>
                     <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         animate={{ width: ["0%", "100%", "100%"] }} 
                         transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 1] }}
                         className="h-full bg-green-500" 
                       />
                     </div>
                   </div>

                   <div className="flex flex-col gap-1 md:gap-2">
                     <div className="flex items-center justify-between text-[10px] md:text-xs font-mono">
                       <span className="text-gray-300">ATS SCORE</span>
                       <span className="text-cyan-400">92%</span>
                     </div>
                     <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         animate={{ width: ["0%", "92%", "92%"] }} 
                         transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                         className="h-full bg-cyan-400" 
                       />
                     </div>
                   </div>

                   <div className="flex flex-col gap-1 md:gap-2">
                     <div className="flex items-center justify-between text-[10px] md:text-xs font-mono">
                       <span className="text-gray-300">SUGGESTIONS</span>
                       <motion.span 
                         animate={{ opacity: [0, 1, 1] }} 
                         transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 1] }}
                         className="text-violet-400"
                       >
                         GENERATED
                       </motion.span>
                     </div>
                     <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         animate={{ width: ["0%", "100%", "100%"] }} 
                         transition={{ duration: 3, repeat: Infinity, times: [0, 0.6, 1], delay: 0.4 }}
                         className="h-full bg-violet-400" 
                       />
                     </div>
                   </div>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="h-screen w-full bg-background overflow-hidden flex items-center"
    >
      <div 
        ref={scrollContainerRef} 
        className="flex h-full w-[300vw]"
      >
        {data.projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel relative w-screen h-full flex items-start lg:items-center justify-center pt-28 pb-6 px-6 md:pt-32 md:pb-12 md:px-12 lg:p-24"
          >

            <div className="w-full px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-24 h-auto lg:h-[80vh] items-center relative z-10 max-h-full lg:max-h-[90vh] overflow-y-auto lg:overflow-visible">
              
              {/* Content Side */}
              <div className="flex flex-col justify-center h-full order-2 lg:order-1 relative z-10 lg:pt-0">
                
                {/* Header Section: Number + Title side-by-side on both mobile and PC */}
                <div className="flex items-start lg:items-center gap-2 sm:gap-4 lg:gap-8 mb-4 md:mb-8 relative">
                  
                  {/* Background Project Number - Side-by-side everywhere */}
                  <div className="-ml-3 sm:-ml-2 lg:ml-0 text-[25vw] sm:text-[20vw] lg:text-[8vw] xl:text-[10vw] font-bold text-white/[0.08] lg:text-white/[0.04] leading-[0.8] select-none flex-shrink-0">
                    {index + 1}
                  </div>
                  
                  <div className="flex flex-col justify-start pt-1 sm:pt-2 lg:pt-0 -ml-1 sm:ml-0">
                    <div className="text-xs font-mono tracking-widest text-accent mb-2 sm:mb-4 lg:mb-4">
                      {project.date}
                    </div>
                    
                    <h3 className="project-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tighter leading-none text-outline text-outline-hover transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
                
                <div className="project-desc space-y-1.5 sm:space-y-2 md:space-y-4 mb-4 md:mb-8">
                  {project.description.map((text, i) => (
                    <p key={i} className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
                
                <div className="project-tech flex flex-wrap gap-2 sm:gap-3 mt-auto">
                  {project.technologies.map((t, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 sm:px-4 sm:py-2 border border-white/10 rounded-full text-[10px] sm:text-xs font-mono tracking-wide text-gray-300 bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Side */}
              <div 
                className="h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] border border-white/10 bg-surface rounded-xl overflow-hidden order-1 lg:order-2 cursor-hover group relative"
                data-cursor-text="VIEW"
              >
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-xl transition-colors duration-500 z-20 pointer-events-none" />
                
                {getVisual(project.id)}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
