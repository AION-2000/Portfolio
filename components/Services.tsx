"use client";

import React from "react";
import ElectricBorder from "./ui/ElectricBorder";
import { Sparkles, Zap, Shield, Rocket, ArrowLeft, Check, Terminal, Brain, Eye, MessageSquare, Globe, UserCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GridScan } from "./GridScan";

const serviceTiers = [
    {
        title: "Starter AI & Web",
        price: "৳10k – ৳18k",
        description: "Best for: Students, small businesses, academic & MVP projects.",
        features: [
            "Basic AI/ML model (classification/prediction)",
            "Python + Flask backend",
            "Simple MySQL / SQLite integration",
            "Responsive web interface (HTML, CSS)",
            "Basic model explanation (XAI intro)",
            "Source code + setup guidance"
        ],
        color: "#7df9ff",
        icon: <Rocket className="size-6 text-blue-300" />,
        suffix: "project",
        delivery: "5–7 days"
    },
    {
        title: "Advanced AI App",
        price: "৳25k – ৳45k",
        description: "Best for: Startups, research work, and intelligent systems.",
        features: [
            "Custom Deep Learning model",
            "Computer Vision or NLP system",
            "Explainable AI (Grad-CAM / interpretation)",
            "REST API integration",
            "Database-connected application",
            "Performance tuning & documentation"
        ],
        color: "#E67E22",
        icon: <Zap className="size-6 text-orange-400" />,
        suffix: "project",
        delivery: "10–15 days",
        pill: "Highly Recommended"
    },
    {
        title: "Full Product Dev",
        price: "৳60k – ৳120k",
        description: "Best for: Companies, funded startups, enterprise solutions.",
        features: [
            "End-to-end AI system design",
            "Multimodal AI (Image + Text + Logic)",
            "Advanced XAI integration",
            "Secure backend + scalable DB",
            "Modern React-based frontend",
            "Docker deployment + support"
        ],
        color: "#2ECC7 green-400",
        icon: <Shield className="size-6 text-green-400" />,
        suffix: "product",
        delivery: "20–30 days"
    }
];

const specializedServices = [
    {
        title: "XAI Implementation",
        price: "৳8k – ৳15k",
        icon: <Brain className="size-5 text-accent-blue" />,
        items: ["Model interpretability", "Grad-CAM visualizations", "Decision reports"]
    },
    {
        title: "Computer Vision",
        price: "৳15k – ৳30k",
        icon: <Eye className="size-5 text-accent-orange" />,
        items: ["Classification / Detection", "Gesture recognition", "Image captioning"]
    },
    {
        title: "NLP & AI Chatbots",
        price: "৳12k – ৳25k",
        icon: <MessageSquare className="size-5 text-accent-green" />,
        items: ["RAG-based chatbots", "Policy assistants", "AI tutors"]
    },
    {
        title: "AI-Powered Web",
        price: "৳18k – ৳40k",
        icon: <Globe className="size-5 text-purple-400" />,
        items: ["AI Image Generators", "Prompt-to-UI systems", "Custom AI tools"]
    }
];

export default function Services() {
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
                        <span>AI_WEB_DEV_PACKAGES_V2026</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-mono font-bold mb-6 tracking-tighter">
                        Service <span className="text-accent-blue">Matrix</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-latte-400 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed">
                        Scale your digital ecosystem with localized AI solutions tailored for students, startups, and enterprises.
                    </motion.p>
                </div>

                {/* Main Tiers */}
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-10 mb-32">
                    {serviceTiers.map((tier, idx) => (
                        <motion.div key={tier.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 + 0.3 }} className="relative">
                            {tier.pill && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-accent-orange text-espresso-950 px-4 py-1 rounded-full font-mono font-bold text-[10px] uppercase tracking-widest shadow-lg">
                                    {tier.pill}
                                </div>
                            )}
                            <ElectricBorder color={tier.color} speed={1.2} chaos={0.1} borderRadius={12} className="h-full">
                                <div className="p-8 md:p-10 bg-espresso-900/40 backdrop-blur-xl rounded-xl border border-espresso-700/50 h-full flex flex-col group hover:bg-espresso-900/60 transition-colors duration-500">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-3 bg-espresso-950/50 rounded-lg border border-espresso-700">{tier.icon}</div>
                                        <div className="text-right">
                                            <span className="block font-mono text-[10px] text-latte-500 uppercase tracking-widest leading-none mb-1">Timeframe</span>
                                            <span className="font-mono text-xs text-accent-green">{tier.delivery}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl md:text-2xl font-mono font-bold mb-2 group-hover:text-latte-100 transition-colors uppercase">{tier.title}</h3>
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-3xl md:text-4xl font-mono font-bold text-accent-orange">{tier.price}</span>
                                    </div>
                                    <p className="text-latte-400 font-mono text-xs mb-8 leading-relaxed border-l border-espresso-700 pl-4">
                                        {tier.description}
                                    </p>
                                    <div className="mb-10 flex-grow">
                                        <ul className="space-y-4 font-mono text-xs text-latte-300">
                                            {tier.features.map(f => (
                                                <li key={f} className="flex items-start gap-3">
                                                    <Check className="size-3 mt-1 text-accent-green flex-shrink-0" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-auto">
                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full relative py-4 bg-transparent border border-latte-100/20 text-latte-100 font-mono font-bold text-xs hover:bg-latte-100 hover:text-espresso-950 transition-all duration-300">
                                            INITIATE_SESSION()
                                        </motion.button>
                                    </div>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>

                {/* Specialized Section */}
                <div className="mb-32 px-4">
                    <h2 className="text-2xl md:text-4xl font-mono font-bold text-center mb-16 underline underline-offset-8 decoration-accent-blue/30">
                        Specialized AI Modules
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {specializedServices.map((special, idx) => (
                            <motion.div key={special.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-6 bg-espresso-900/30 border border-espresso-700/50 rounded-sm hover:border-accent-blue/50 transition-colors">
                                <div className="p-2 bg-espresso-950/50 rounded-sm w-fit mb-4">{special.icon}</div>
                                <h4 className="font-mono font-bold text-sm mb-1">{special.title}</h4>
                                <div className="text-accent-orange font-mono text-sm mb-4">{special.price}</div>
                                <ul className="space-y-2">
                                    {special.items.map(item => (
                                        <li key={item} className="text-[10px] font-mono text-latte-500 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-accent-blue rounded-full" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trust & Notes */}
                <div className="grid md:grid-cols-2 gap-12 border-t border-espresso-800 pt-20">
                    <div>
                        <h3 className="font-mono text-accent-green text-sm flex items-center gap-2 mb-6 tracking-widest opacity-80 uppercase">
                            <UserCheck size={16} /> Bangladesh_Client_Support
                        </h3>
                        <ul className="space-y-4 font-mono text-xs text-latte-400">
                            <li className="flex items-center gap-3"><span className="text-accent-green">✔</span> Clear communication in Bangla/English</li>
                            <li className="flex items-center gap-3"><span className="text-accent-green">✔</span> Student & startup-friendly pricing</li>
                            <li className="flex items-center gap-3"><span className="text-accent-green">✔</span> Academic project support available</li>
                            <li className="flex items-center gap-3"><span className="text-accent-green">✔</span> No hidden costs & full source code ownership</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-mono text-accent-blue text-sm flex items-center gap-2 mb-6 tracking-widest opacity-80 uppercase">
                            <Star size={16} /> Why_Choose_Aion
                        </h3>
                        <div className="space-y-4">
                            <div className="font-mono text-[10px] text-latte-500 leading-relaxed uppercase">
                                <span className="text-latte-300">CSE Graduate</span> with strong AI background & research focus. Expert in <span className="text-latte-300">AI + Web + XAI</span> integration. Reliable, honest & strictly deadline-focused.
                            </div>
                            <div className="flex gap-4">
                                <Link to="/#about" className="font-mono text-[10px] text-accent-orange border-b border-accent-orange/30 pb-1">View_CV.pdf</Link>
                                <Link to="/#work" className="font-mono text-[10px] text-accent-blue border-b border-accent-blue/30 pb-1">Review_Repos.git</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-32 text-center">
                    <p className="font-mono text-[10px] text-latte-600 uppercase tracking-[0.3em]">
                        All computational processes encrypted and delivery via secure bandwidth.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
