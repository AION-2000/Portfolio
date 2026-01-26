"use client";

import React, { useRef } from "react";
import ElectricBorder from "./ui/ElectricBorder";
import { Sparkles, Zap, Shield, Rocket, ArrowLeft, Check, Terminal, Brain, Eye, MessageSquare, Globe, UserCheck, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GridScan } from "./GridScan";
import { RippleEffect } from "./ui/Ripple";

const serviceTiers = [
    {
        title: "Starter AI & Web",
        price: "৳10,000 – ৳18,000",
        description: "Best for: Students, small businesses, academic & MVP projects.",
        features: [
            "Basic AI/ML model (classification / prediction)",
            "Python + Flask backend",
            "Simple database integration (MySQL / SQLite)",
            "Responsive web interface (HTML, CSS)",
            "Basic model explanation (intro-level XAI)",
            "Source code + setup guidance"
        ],
        color: "#7df9ff",
        icon: <Rocket className="size-6 text-blue-300" />,
        delivery: "5–7 days",
        note: "Ideal for final-year projects, demos, and proof-of-concept apps"
    },
    {
        title: "Advanced AI App",
        price: "৳25,000 – ৳45,000",
        description: "Best for: Startups, research work, smart systems.",
        features: [
            "Custom Deep Learning model",
            "Computer Vision or NLP-based system",
            "Explainable AI (Grad-CAM / feature interpretation)",
            "REST API integration",
            "Database-connected application",
            "Performance tuning & testing",
            "Technical documentation"
        ],
        color: "#E67E22",
        icon: <Zap className="size-6 text-orange-400" />,
        delivery: "10–15 days",
        pill: "Highly Recommended",
        note: "Suitable for production-ready AI systems & research publications"
    },
    {
        title: "Full AI Product",
        price: "৳60,000 – ৳1,20,000",
        description: "Best for: Companies, funded startups, enterprise solutions.",
        features: [
            "End-to-end AI system design",
            "Multimodal AI (Image + Text + Logic)",
            "Advanced Explainable AI integration",
            "Secure backend + scalable database",
            "Modern frontend (React)",
            "Docker-based deployment setup",
            "Post-delivery support (7–14 days)"
        ],
        color: "#2ECC71",
        icon: <Shield className="size-6 text-green-400" />,
        delivery: "20–30 days",
        note: "Complete AI-powered product, ready for real users"
    }
];

const specializedServices = [
    {
        title: "XAI Implementation",
        price: "৳8,000 – ৳15,000",
        icon: <Brain className="size-5 text-accent-blue" />,
        items: [
            "Model interpretability",
            "Grad-CAM visualizations",
            "AI decision explanation reports"
        ]
    },
    {
        title: "Computer Vision",
        price: "৳15,000 – ৳30,000",
        icon: <Eye className="size-5 text-accent-orange" />,
        items: [
            "Image classification / detection",
            "Gesture recognition systems",
            "Image captioning"
        ]
    },
    {
        title: "NLP & AI Chatbots",
        price: "৳12,000 – ৳25,000",
        icon: <MessageSquare className="size-5 text-accent-green" />,
        items: [
            "RAG-based chatbots",
            "Company policy assistants",
            "AI tutors"
        ]
    },
    {
        title: "AI-Powered Web",
        price: "৳18,000 – ৳40,000",
        icon: <Globe className="size-5 text-purple-400" />,
        items: [
            "AI Image Generator",
            "Prompt-to-UI systems",
            "Custom AI web tools"
        ]
    }
];

const ServiceTierCard = ({ tier, idx, onInitiate }: { tier: typeof serviceTiers[0], idx: number, onInitiate: (n: string) => void }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    return (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 + 0.3 }} className="relative h-full">
            {tier.pill && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-accent-orange text-espresso-950 px-4 py-1 rounded-full font-mono font-bold text-[10px] uppercase tracking-widest shadow-lg">
                    {tier.pill}
                </div>
            )}
            <ElectricBorder color={tier.color} speed={1.2} chaos={0.1} borderRadius={12} className="h-full">
                <div className="p-8 md:p-10 bg-espresso-900/40 backdrop-blur-xl rounded-xl border border-espresso-700/50 h-full flex flex-col group hover:bg-espresso-900/60 transition-colors duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div className="p-3 bg-espresso-950/50 rounded-lg border border-espresso-700">{tier.icon}</div>
                        <div className="text-right flex flex-col items-end">
                            <div className="flex items-center gap-1 mb-1">
                                <Clock size={10} className="text-accent-green" />
                                <span className="font-mono text-[8px] text-latte-500 uppercase tracking-widest leading-none">Delivery</span>
                            </div>
                            <span className="font-mono text-xs text-accent-green font-bold">{tier.delivery}</span>
                        </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-mono font-bold mb-1 group-hover:text-latte-100 transition-colors uppercase leading-tight">{tier.title}</h3>
                    <div className="mb-6">
                        <span className="text-2xl md:text-3xl font-mono font-bold text-accent-orange">{tier.price}</span>
                    </div>
                    <p className="text-latte-400 font-mono text-[10px] md:text-xs mb-8 leading-relaxed border-l-2 border-espresso-700 pl-4 py-1">
                        {tier.description}
                    </p>
                    <div className="mb-10 flex-grow">
                        <div className="text-[9px] font-mono text-latte-500 uppercase tracking-widest mb-4 opacity-70">Core_Scope:</div>
                        <ul className="space-y-4 font-mono text-xs text-latte-300">
                            {tier.features.map(f => (
                                <li key={f} className="flex items-start gap-3">
                                    <Check className="size-3 mt-1 text-accent-green flex-shrink-0" />
                                    <span className="leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <div className="mb-4 flex items-center gap-2 p-2 bg-espresso-950/30 rounded-sm border border-espresso-800/50">
                            <Sparkles size={10} className="text-accent-blue flex-shrink-0" />
                            <span className="text-[9px] font-mono text-latte-500 leading-tight italic">{tier.note}</span>
                        </div>
                        <motion.button
                            ref={btnRef}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onInitiate(tier.title)}
                            className="w-full relative py-4 bg-transparent border border-latte-100/20 text-latte-100 font-mono font-bold text-xs hover:bg-latte-100 hover:text-espresso-950 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Terminal size={12} />
                                INITIATE_SESSION()
                            </span>
                            <RippleEffect parentRef={btnRef} />
                        </motion.button>
                    </div>
                </div>
            </ElectricBorder>
        </motion.div>
    );
};

const SpecializedServiceNode = ({ special, idx, onInitiate }: { special: typeof specializedServices[0], idx: number, onInitiate: (n: string) => void }) => {
    const nodeRef = useRef<HTMLButtonElement>(null);
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-6 bg-espresso-900/30 border border-espresso-700/50 rounded-sm hover:border-accent-blue/50 transition-colors group relative flex flex-col">
            <div className="p-2 bg-espresso-950/50 rounded-sm w-fit mb-4 group-hover:scale-110 transition-transform">{special.icon}</div>
            <h4 className="font-mono font-bold text-sm mb-1 uppercase text-latte-200">{special.title}</h4>
            <div className="text-accent-orange font-mono text-sm font-bold mb-4">{special.price}</div>
            <ul className="space-y-2 mb-6 flex-grow">
                {special.items.map(item => (
                    <li key={item} className="text-[10px] font-mono text-latte-500 flex items-start gap-2">
                        <span className="w-1 h-1 bg-accent-blue rounded-full mt-1.5 flex-shrink-0" />
                        <span className="leading-snug">{item}</span>
                    </li>
                ))}
            </ul>
            <button
                ref={nodeRef}
                onClick={() => onInitiate(special.title)}
                className="w-full relative py-2 bg-espresso-800 border border-espresso-700 font-mono text-[9px] text-latte-400 hover:bg-accent-blue hover:text-espresso-950 transition-all uppercase tracking-widest overflow-hidden"
            >
                <span className="relative z-10">Request_Node</span>
                <RippleEffect parentRef={nodeRef} color="rgba(33, 150, 243, 0.3)" />
            </button>
        </motion.div>
    );
};

interface ServicesProps {
    onInitiate: (serviceName: string) => void;
}

export default function Services({ onInitiate }: ServicesProps) {
    return (
        <div className="min-h-screen bg-espresso-950 text-latte-100 py-16 md:py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <GridScan
                    sensitivity={0.5}
                    lineThickness={1}
                    linesColor="#392e4e"
                    gridScale={0.15}
                    scanColor="#E67E22"
                    scanOpacity={0.2}
                    enablePost
                    bloomIntensity={0.5}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                    <Link to="/" className="group inline-flex items-center gap-2 font-mono text-xs md:text-sm text-accent-orange hover:text-latte-100 transition-colors">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span>return_to_main_node()</span>
                    </Link>
                </motion.div>

                <div className="text-center mb-16 md:mb-24">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 rounded-full mb-6 font-mono text-[10px] text-accent-orange">
                        <Terminal size={12} />
                        <span>DEVELOPMENT_SERVICE_PACKAGES_V.2026</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-mono font-bold mb-6 tracking-tighter uppercase">
                        AI Service <span className="text-accent-blue">Matrix</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-latte-400 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed">
                        Scale your digital ecosystem with localized AI solutions and precision-engineered full-stack implementations.
                    </motion.p>
                </div>

                {/* Main Tiers */}
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-10 mb-32">
                    {serviceTiers.map((tier, idx) => (
                        <ServiceTierCard key={tier.title} tier={tier} idx={idx} onInitiate={onInitiate} />
                    ))}
                </div>

                {/* Specialized Section */}
                <div className="mb-32 px-4">
                    <div className="flex flex-col items-center mb-16">
                        <span className="font-mono text-accent-blue text-xs mb-2 tracking-widest uppercase opacity-80">Individual_Service_Nodes</span>
                        <h2 className="text-2xl md:text-4xl font-mono font-bold text-center underline underline-offset-8 decoration-accent-blue/30 uppercase tracking-tighter">
                            Specialized AI Services
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {specializedServices.map((special, idx) => (
                            <SpecializedServiceNode key={special.title} special={special} idx={idx} onInitiate={onInitiate} />
                        ))}
                    </div>
                </div>

                {/* Trust & Notes */}
                <div className="grid md:grid-cols-2 gap-12 border-t border-espresso-800 pt-20">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h3 className="font-mono text-accent-green text-sm flex items-center gap-2 mb-8 tracking-widest uppercase">
                            <UserCheck size={18} /> Bangladesh_Client_Support
                        </h3>
                        <ul className="space-y-5 font-mono text-xs text-latte-400">
                            <li className="flex items-center gap-3"><span className="text-accent-green font-bold">✔</span> Clear communication in Bangla / English</li>
                            <li className="flex items-center gap-3"><span className="text-accent-green font-bold">✔</span> Student & startup-friendly pricing</li>
                            <li className="flex items-center gap-3"><span className="text-accent-green font-bold">✔</span> Academic project support available</li>
                            <li className="flex items-center gap-3"><span className="text-accent-green font-bold">✔</span> No hidden costs & full source code ownership</li>
                        </ul>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h3 className="font-mono text-accent-blue text-sm flex items-center gap-2 mb-8 tracking-widest uppercase">
                            <Star size={18} /> Why_Choose_Aion
                        </h3>
                        <div className="space-y-6">
                            <ul className="space-y-4 font-mono text-xs text-latte-400">
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-blue opacity-50 shrink-0 mt-0.5">●</span>
                                    <span><span className="text-latte-200">CSE graduate</span> with strong AI background</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-blue opacity-50 shrink-0 mt-0.5">●</span>
                                    <span>Research & project-based experience</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-blue opacity-50 shrink-0 mt-0.5">●</span>
                                    <span><span className="text-latte-200">AI + Web + XAI</span> integration expert</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-blue opacity-50 shrink-0 mt-0.5">●</span>
                                    <span>Reliable, honest & deadline-focused</span>
                                </li>
                            </ul>
                            <div className="flex gap-6 pt-4">
                                <Link to="/#about" className="group font-mono text-[10px] text-accent-orange border-b border-accent-orange/30 pb-1 hover:text-latte-100 hover:border-latte-100 transition-all">View_CV.pdf</Link>
                                <a href="https://github.com/AION-2000" target="_blank" rel="noopener noreferrer" className="group font-mono text-[10px] text-accent-blue border-b border-accent-blue/30 pb-1 hover:text-latte-100 hover:border-latte-100 transition-all">Review_Repos.git</a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-32 text-center">
                    <div className="h-px w-24 bg-latte-700/50 mx-auto mb-8" />
                    <p className="font-mono text-[9px] text-latte-600 uppercase tracking-[0.4em] max-w-lg mx-auto">
                        High-throughput AI systems engineered for precision. All processes encrypted and delivery via secure channels.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
