"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Users, Database, Code, ShieldCheck } from 'lucide-react';
import { TestimonialSlider, type Review } from './ui/TestimonialSlider';

const stats = [
    { label: "AI Models Deployed", value: 12, suffix: "+", icon: <Database size={16} /> },
    { label: "Git Commits (AIOVerse)", value: 2450, suffix: "+", icon: <Code size={16} /> },
    { label: "Research Nodes", value: 4, suffix: "", icon: <Users size={16} /> },
    { label: "Uptime Protocol", value: 99.9, suffix: "%", icon: <ShieldCheck size={16} /> },
];

const reviews: Review[] = [
    {
        id: "1",
        name: "Researcher",
        affiliation: "DIU ACADEMIC_LOG",
        quote: "Aion's approach to XAI implementation is remarkably clinical. The Grad-CAM visualizations were instrumental for our model debugging.",
        imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
        thumbnailSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    },
    {
        id: "2",
        name: "Founding Lead",
        affiliation: "AIOVerse CLIENT_SIGNAL",
        quote: "The terminal-style booking system and automated lead management transformed our technical onboarding process instantly.",
        imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
        thumbnailSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"
    },
    {
        id: "3",
        name: "DevOps Engineer",
        affiliation: "GlobalNet TECH_REVIEW",
        quote: "High-throughput logic and clean Dockerized deployments. Aion delivers with the precision of a perfect espresso pull.",
        imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000",
        thumbnailSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200"
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

            {/* Testimonials Console Integration */}
            <div className="relative group p-1 bg-gradient-to-r from-espresso-700/20 to-espresso-800/20 rounded-sm border border-espresso-700/50">
                <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
                    <Terminal size={14} className="text-accent-blue" />
                    <span className="font-mono text-[10px] text-latte-400 uppercase tracking-widest">FEEDBACK_LOGS_PRO_V.5.0</span>
                </div>
                <TestimonialSlider reviews={reviews} className="bg-transparent" />
            </div>
        </section>
    );
};

export default TrustNode;
