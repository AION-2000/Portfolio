import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Terminal, Users, Database, Code, ShieldCheck, Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import { RippleEffect } from './ui/Ripple';

const stats = [
    { label: "AI Models Deployed", value: 12, suffix: "+", icon: <Database size={16} /> },
    { label: "Git Commits (AIOVerse)", value: 2450, suffix: "+", icon: <Code size={16} /> },
    { label: "Research Nodes", value: 4, suffix: "", icon: <Users size={16} /> },
    { label: "Uptime Protocol", value: 99.9, suffix: "%", icon: <ShieldCheck size={16} /> },
];

const testimonials = [
    {
        user: "Researcher@DIU",
        content: "Aion's approach to XAI implementation is remarkably clinical. The Grad-CAM visualizations were instrumental for our model debugging.",
        tag: "ACADEMIC_LOG"
    },
    {
        user: "Founder@AIOVerse",
        content: "The terminal-style booking system and automated lead management transformed our technical onboarding process instantly.",
        tag: "CLIENT_SIGNAL"
    },
    {
        user: "DevOps@GlobalNet",
        content: "High-throughput logic and clean Dockerized deployments. Aion delivers with the precision of a perfect espresso pull.",
        tag: "TECH_REVIEW"
    }
];

const StatCounter = ({ label, value, suffix, icon }: typeof stats[0]) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="p-6 bg-espresso-950/40 border border-espresso-700/50 rounded-sm group hover:border-accent-orange/40 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-accent-orange opacity-60 group-hover:opacity-100 transition-opacity">
                {icon}
                <span className="font-mono text-[10px] uppercase tracking-widest">{label}</span>
            </div>
            <div className="font-mono text-3xl md:text-4xl font-bold text-latte-100 tracking-tighter">
                {count.toLocaleString()}{suffix}
            </div>
        </div>
    );
};

const TrustNode: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonialRef = useRef<HTMLDivElement>(null);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="trust" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-t border-espresso-700 relative overflow-hidden">
            {/* Header */}
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <span className="font-mono text-accent-blue text-xs mb-3 block animate-pulse uppercase tracking-[0.3em]">● DATA_VALIDATION_ACTIVE</span>
                    <h2 className="font-mono text-3xl md:text-6xl text-latte-100 tracking-tighter uppercase">
                        The Trust <span className="text-accent-orange">Node</span>
                    </h2>
                </div>
                <p className="font-mono text-xs text-latte-500 max-w-sm border-l border-espresso-700 pl-4 py-1">
                    Quantifiable impact and verified peer feedback from the AIOVerse development network.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-32">
                {stats.map((stat, idx) => (
                    <StatCounter key={idx} {...stat} />
                ))}
            </div>

            {/* Testimonials Console */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-orange/10 to-accent-blue/10 blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-espresso-950 border border-espresso-700 rounded-sm overflow-hidden">
                    {/* Console Header */}
                    <div className="bg-espresso-900/50 px-4 py-3 border-b border-espresso-700 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-accent-blue" />
                            <span className="font-mono text-[10px] text-latte-400 uppercase tracking-widest">FEEDBACK_LOGS_V.4.2</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prev} className="p-1 hover:text-white text-latte-500 transition-colors"><ChevronLeft size={16} /></button>
                            <button onClick={next} className="p-1 hover:text-white text-latte-500 transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    {/* Console Body */}
                    <div className="p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="text-accent-green opacity-40 mb-4"><Quote size={32} /></div>
                                <p className="font-mono text-lg md:text-2xl text-latte-200 leading-relaxed italic">
                                    "{testimonials[currentIndex].content}"
                                </p>
                                <div className="flex items-center gap-4 pt-4 border-t border-espresso-800">
                                    <div className="w-10 h-10 bg-espresso-800 rounded-full flex items-center justify-center font-mono text-accent-blue text-xs border border-espresso-700">
                                        USR
                                    </div>
                                    <div>
                                        <div className="font-mono text-sm text-latte-100 uppercase tracking-tighter">
                                            {testimonials[currentIndex].user}
                                        </div>
                                        <div className="font-mono text-[9px] text-accent-blue uppercase tracking-widest mt-1 opacity-60">
                                            {testimonials[currentIndex].tag}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Console Footer */}
                    <div className="bg-espresso-900/30 px-4 py-2 border-t border-espresso-700/50 flex items-center gap-4">
                        <div className="flex gap-1.5">
                            {testimonials.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-accent-orange' : 'bg-espresso-700'}`}
                                />
                            ))}
                        </div>
                        <span className="font-mono text-[8px] text-latte-600 uppercase tracking-widest">
                            Signal {currentIndex + 1}/{testimonials.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustNode;
