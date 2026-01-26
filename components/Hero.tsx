import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { TypingText } from './TypingText';
import { Magnetic } from './Magnetic';

import { RippleEffect } from './ui/Ripple';
import { GridScan } from './GridScan';

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const navigate = useNavigate();
  console.log('Hero component rendering');
  const containerRef = useRef<HTMLDivElement>(null);
  const talkButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const scrollTo = useSmoothScroll();

  // Track scroll for parallax effects
  const { scrollY } = useScroll();

  // Refined parallax values for smoother "stickiness"
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const filter = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(8px)"]);

  // Floating background elements movement
  const bgY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -500]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale, y, filter }}
      className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-start overflow-hidden bg-espresso-950 px-6 md:px-24 z-0 perspective-1000"
    >
      {/* Background Tech Grid - Animated GridScan */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-espresso-900 via-transparent to-transparent opacity-50" />

      {/* Background Large Name Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <h1 className="text-[20vw] md:text-[15vw] font-mono font-bold text-latte-100/5 whitespace-nowrap uppercase tracking-tighter leading-none">
          SHIHAB SHAHRIAR AION
        </h1>
      </div>

      {/* Profile Picture - Top Right (Restored) */}
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="absolute top-20 right-6 md:top-32 md:right-24 z-20 group"
      >
        <div className="relative">
          {/* Technical Frame Accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent-orange opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent-orange opacity-60 group-hover:opacity-100 transition-opacity"></div>

          <div className="w-16 h-16 md:w-48 md:h-48 rounded-sm overflow-hidden border border-espresso-700 bg-espresso-900 group-hover:border-accent-orange/50 transition-colors duration-500 shadow-2xl shadow-black/50">
            <img
              src="/profile.jpg"
              alt="Shihab Shahriar Aion"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
          </div>

          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-scan-line opacity-[0.05] group-hover:opacity-[0.02] transition-opacity"></div>

          {/* Label Tag */}
          <div className="absolute -bottom-6 right-0 font-mono text-[8px] md:text-[10px] text-accent-orange/60 tracking-tighter uppercase whitespace-nowrap">
            <span className="text-latte-500">[</span>
            ID: AION_2000_SHI
            <span className="text-latte-500">]</span>
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Cube Wireframes */}
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute right-[10%] top-[15%] w-24 h-24 border border-accent-orange/20 opacity-20 hidden md:block"
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        animate={{ rotateX: -360, rotateY: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute right-[20%] bottom-[20%] w-16 h-16 border border-accent-blue/20 opacity-20 hidden md:block"
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Floating Code Decorations */}
      <motion.div style={{ y: bgY1 }} className="absolute right-10 top-[20%] font-mono text-xs text-latte-500 opacity-10 hidden md:block select-none z-0">
        <pre>{`
impl System {
  fn init() -> Self {
    Self { status: "OK" }
  }
}
        `}</pre>
      </motion.div>

      <motion.div style={{ y: bgY2 }} className="absolute right-32 top-[60%] font-mono text-xs text-accent-green opacity-10 hidden md:block select-none z-0">
        <pre>{`> cargo build --release`}</pre>
      </motion.div>

      <div className="z-10 max-w-5xl relative w-full mt-20 md:mt-0">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3 mb-4 md:mb-6 overflow-hidden whitespace-nowrap"
        >
          <div className="h-[1px] w-8 md:w-12 bg-accent-orange"></div>
          <span className="font-mono text-accent-orange text-[10px] md:text-sm tracking-widest uppercase">System Online</span>
        </motion.div>

        {/* Name Title 1 */}
        <div className="mb-2 md:mb-2 p-1 -m-1">
          <h1
            className="font-mono font-bold text-4xl sm:text-6xl md:text-8xl text-latte-100 tracking-tighter leading-none glitch-text cursor-default flex flex-wrap"
            data-hover
          >
            <TypingText text="SHIHAB" delay={0.2} className="text-waveform" />
          </h1>
        </div>

        {/* Name Title 2 */}
        <div className="mb-6 p-1 -m-1">
          <h1
            className="font-mono font-bold text-3xl sm:text-5xl md:text-8xl text-latte-500 tracking-tighter leading-none glitch-text cursor-default flex flex-wrap gap-x-2 md:gap-x-4"
            data-hover
          >
            <TypingText text="SHAHRIAR AION" delay={0.5} className="text-waveform" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="cursor-blink text-accent-orange inline-block"
            >_</motion.span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-mono text-latte-400 text-[10px] sm:text-sm md:text-base max-w-xl leading-relaxed border-l-2 border-espresso-700 pl-4 md:pl-6 backdrop-blur-sm"
        >
          <span className="text-accent-blue">const</span> <span className="text-latte-200">engineer</span> = <span className="text-accent-green">"Full Stack & Cloud"</span>;<br /><br />
          Specializing in distributed systems, high-throughput APIs, and scalable infrastructure.
          Designing clean code with the precision of a perfect espresso pull.
        </motion.div>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-6">
          <Magnetic>
            <motion.button
              ref={talkButtonRef}
              onClick={onOpenChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-transparent border border-latte-500/50 hover:border-accent-orange transition-colors cursor-none overflow-hidden"
              data-hover
            >
              <span className="relative z-10 font-mono text-[10px] md:text-xs text-latte-100 group-hover:text-espresso-950 transition-colors font-bold tracking-widest uppercase">
                Talk with Aion
              </span>
              <motion.div
                className="absolute inset-0 bg-accent-orange z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ type: 'tween', ease: 'circOut' }}
              />

              {/* Corner Accents */}
              <span className="absolute top-0 left-0 w-1 h-1 bg-latte-500 group-hover:bg-espresso-950 transition-colors z-20"></span>
              <span className="absolute bottom-0 right-0 w-1 h-1 bg-latte-500 group-hover:bg-espresso-950 transition-colors z-20"></span>

              <RippleEffect parentRef={talkButtonRef} />
            </motion.button>
          </Magnetic>

          <Magnetic>
            <motion.button
              ref={servicesButtonRef}
              onClick={() => navigate('/services')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-transparent border border-latte-500/50 hover:border-accent-blue transition-colors cursor-none overflow-hidden"
              data-hover
            >
              <span className="relative z-10 font-mono text-[10px] md:text-xs text-latte-100 group-hover:text-espresso-950 transition-colors font-bold tracking-widest uppercase">
                Services
              </span>
              <motion.div
                className="absolute inset-0 bg-accent-blue z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ type: 'tween', ease: 'circOut' }}
              />

              {/* Corner Accents */}
              <span className="absolute top-0 left-0 w-1 h-1 bg-latte-500 group-hover:bg-espresso-950 transition-colors z-20"></span>
              <span className="absolute bottom-0 right-0 w-1 h-1 bg-latte-500 group-hover:bg-espresso-950 transition-colors z-20"></span>

              <RippleEffect parentRef={servicesButtonRef} color="rgba(33, 150, 243, 0.3)" />
            </motion.button>
          </Magnetic>

          <div className="text-[10px] font-mono text-latte-500 flex flex-row sm:flex-col gap-4 sm:gap-0">
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              Lat: 34ms
            </motion.span>
            <span>Uptime: 99.9%</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 right-4 md:right-10 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-mono text-[10px] text-latte-500 text-right hidden sm:block">
          SCROLL_DOWN<br />
          v.2.0.4
        </span>
        <div className="w-[1px] h-12 bg-latte-500/30 overflow-hidden relative">
          <motion.div
            className="w-full h-1/2 bg-accent-orange absolute top-0"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;