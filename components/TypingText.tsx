import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  stagger = 0.03
}) => {
  const characters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay 
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span variants={childVariants} key={index} className="origin-bottom">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};