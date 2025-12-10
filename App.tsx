import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Download, Linkedin } from 'lucide-react';

// Extracted About Section for Scroll Effects
const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCard = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-espresso-700">
      <div className="grid md:grid-cols-2 gap-12 items-start" style={{ perspective: '1000px' }}>
          <motion.div style={{ y: yText }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} 
              className="font-mono text-4xl mb-8 text-latte-100 overflow-hidden"
            >
              <span className="text-accent-orange">function</span> <span className="text-accent-blue">About_Me</span>()
            </motion.h2>
            <div className="font-mono text-sm text-latte-400 space-y-6 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-latte-500">// The Summary</span><br/>
                  Enthusiastic Computer Science and Engineering graduate with a strong foundation in AI, Machine Learning, and Web Development. 
                  Passionate about transforming ideas into intelligent solutions through innovative coding and research. 
                  Hands-on experience with deep learning, computer vision, and NLP projects.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <span className="text-latte-500">// The Philosophy</span><br/>
                  Interested in growing in a challenging environment and contributing to impactful technological advancements.
                  Always curious to learn new tools and technologies that expand creative and technical possibilities.
                </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ y: yCard, rotateX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 font-mono text-xs shadow-2xl hover:shadow-accent-orange/10 transition-shadow duration-500 transform-gpu"
          >
            <div className="flex gap-2 mb-4 border-b border-espresso-700 pb-2">
                <span className="text-latte-500">skills.json</span>
            </div>
            <pre className="text-accent-green overflow-x-auto">
{`{
  "languages": [
    "Python", "Java", "C",
    "JavaScript", "SQL"
  ],
  "ai_ml": {
    "frameworks": ["TensorFlow", "PyTorch"],
    "libs": ["OpenCV", "Scikit-learn"],
    "focus": ["Deep Learning", "NLP"]
  },
  "web": [
    "React", "Flask", "HTML/CSS"
  ],
  "tools": [
    "Docker", "Git", "VS Code", "n8n"
  ]
}`}
            </pre>
          </motion.div>
      </div>
    </section>
  );
};

// Extracted Contact Section
const ContactSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <section ref={containerRef} id="contact" className="py-32 px-6 bg-espresso-950 border-t border-espresso-700 relative overflow-hidden">
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 bg-[size:20px_20px] bg-grid-pattern opacity-10" 
        />
        
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span 
            variants={buttonVariants} custom={0}
            className="font-mono text-accent-green text-xs mb-4 block animate-pulse"
          >
            ● SIGNAL ESTABLISHED
          </motion.span>
          <motion.h2 
            variants={buttonVariants} custom={1}
            className="font-mono text-4xl md:text-6xl mb-12 text-latte-100 tracking-tighter"
          >
            Start a Session
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap">
            <motion.a 
              href="mailto:aionshihabshahriar@gmail.com" 
              variants={buttonVariants} custom={2}
              whileHover={{ scale: 1.05, backgroundColor: "#E67E22", color: "#0A0503" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-latte-100 text-espresso-950 font-mono font-bold text-sm transition-colors duration-300 min-w-[200px]" 
              data-hover
            >
              sh ./email_me.sh
            </motion.a>

            <motion.a 
              href="Shihab_Shahriar_Aion_Resume.pdf" 
              download="Shihab_Shahriar_Aion_Resume.pdf"
              variants={buttonVariants} custom={3}
              whileHover={{ scale: 1.05, borderColor: "#E67E22", color: "#E67E22" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-latte-500 text-latte-500 font-mono font-bold text-sm transition-colors duration-300 min-w-[200px] hover:bg-espresso-900/50 group" 
              data-hover
            >
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              wget ./resume.pdf
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/aion-a1i2o3n4/"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants} custom={4}
              whileHover={{ scale: 1.05, borderColor: "#2196F3", color: "#2196F3" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-latte-500 text-latte-500 font-mono font-bold text-sm transition-colors duration-300 min-w-[200px] hover:bg-espresso-900/50" 
              data-hover
            >
              <Linkedin className="w-4 h-4 mr-2" />
              curl linkedin.com
            </motion.a>
          </div>

        </motion.div>
    </section>
  );
};

function App() {
  return (
    <div className="bg-espresso-900 min-h-screen text-latte-100 selection:bg-accent-orange selection:text-espresso-950 relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Noise Texture Overlay for that "Premium Framer" feel */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>

      <Navbar />
      
      {/* 
        Scroll Architecture:
        Hero is Sticky at Top (z-0).
        Content Wrapper is Relative (z-10) with background.
        As user scrolls, Content slides UP over the Hero.
      */}
      
      <Hero />
      
      <div className="relative z-10 bg-espresso-900 w-full min-h-screen box-border shadow-[0_-25px_50px_rgba(0,0,0,0.8)]">
        <Gallery />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>

      <ChatWidget />
    </div>
  );
}

export default App;