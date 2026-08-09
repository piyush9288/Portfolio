import React from 'react';
import { motion } from 'framer-motion';
import type { PortfolioData } from '../../types/portfolio';
import { GraduationCap } from 'lucide-react';

interface EducationProps {
  data: PortfolioData;
}

const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <section id="education" className="relative w-full section-padding bg-surface border-t border-white/5">
      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10">
        
        <div className="mb-16">
          <h2 className="text-xs font-mono tracking-widest text-accent mb-4 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span>
            ACADEMIC BACKGROUND
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
            Education
          </h3>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 py-4">
          {data.education.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full border-2 border-surface bg-accent shadow-[0_0_10px_var(--color-accent)]" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-2 text-sm font-mono tracking-widest text-gray-400">
                <span className="text-accent">{edu.duration}</span>
                <span className="hidden md:block w-8 h-[1px] bg-white/10"></span>
                <span>{edu.gpa}</span>
              </div>
              
              <h4 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 mt-4 text-white group-hover:text-accent transition-colors">
                {edu.institution}
              </h4>
              
              <p className="text-xl text-gray-400 font-light max-w-2xl flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-white/50 shrink-0 mt-1" />
                {edu.degree}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Education;
