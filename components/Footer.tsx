import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-16 bg-espresso-950 text-center border-t border-espresso-700 text-latte-500 font-mono text-xs overflow-hidden">
      {/* Subtle moving background mesh for depth */}
      <motion.div 
          className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-5 pointer-events-none"
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Social Links */}
        <div className="flex gap-6">
            <a href="https://github.com/AION-2000?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors flex items-center gap-2" data-hover>
                <Github size={16} />
                <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/aion-a1i2o3n4/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors flex items-center gap-2" data-hover>
                <Linkedin size={16} />
                <span>LinkedIn</span>
            </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4"
        >
          <span className="text-accent-orange">const</span> year = {new Date().getFullYear()};
          <span className="text-latte-500">;</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="opacity-60"
        >
          Shihab Shahriar Aion •{' '}
          <motion.span 
              className="text-accent-green inline-block"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            All Systems Operational
          </motion.span>
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;