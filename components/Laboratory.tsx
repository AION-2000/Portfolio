"use client";

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, Brain, Cpu, Terminal, Network, X } from "lucide-react";
import { GridScan } from "./GridScan";
import { RippleEffect } from "./ui/Ripple";

// Real specialized visualizers
import XAIHeatmap from "./lab/XAIHeatmap";
import SystemPerf from "./lab/SystemPerf";
import LogicStream from "./lab/LogicStream";
import NeuralProtocol from "./lab/NeuralProtocol";

const LabNodeCard = ({ title, icon, color, description, onClick }: { title: string, icon: React.ReactNode, color: string, description: string, onClick: () => void }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    return (
        <motion.div
            ref={cardRef}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative bg-espresso-900/40 border border-espresso-700/50 rounded-sm p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:border-latte-100/30 overflow-hidden"
        >
            <div className={`p-4 bg-espresso-950/50 rounded-lg border border-espresso-700 mb-6 group-hover:scale-110 transition-transform`} style={{ color }}>
                {icon}
            </div>
            <h3 className="font-mono text-lg font-bold text-latte-100 mb-3 uppercase tracking-tighter">{title}</h3>
            <p className="font-mono text-[10px] text-latte-500 leading-relaxed max-w-[200px]">
                {description}
            </p>
            <div className="mt-8 pt-4 border-t border-espresso-800 w-full flex items-center justify-center gap-2">
                <span className="font-mono text-[9px] text-espresso-700 group-hover:text-latte-500 transition-colors uppercase tracking-widest">Connect_To_Node</span>
                <div className="w-1 h-1 rounded-full bg-espresso-800 group-hover:bg-accent-orange animate-pulse" />
            </div>
            <RippleEffect parentRef={cardRef} />
        </motion.div>
    );
};

export default function Laboratory() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const nodes = [
        { id: "xai", title: "Model Researcher", icon: <Brain size={32} />, color: "#E67E22", description: "Real-time XAI Heatmaps & Model Interpretability simulation.", component: <XAIHeatmap /> },
        { id: "perf", title: "Web Architect", icon: <Cpu size={32} />, color: "#2196F3", description: "Live System Performance, Memory, & DOM Analytics dashboard.", component: <SystemPerf /> },
        { id: "logic", title: "Language Expert", icon: <Terminal size={32} />, color: "#F0F0F0", description: "Animated Logic Streams & Real-time Algorithm visualizers.", component: <LogicStream /> },
        { id: "neural", title: "AI Specialist", icon: <Network size={32} />, color: "#2ECC71", description: "Interactive Neural Data Relay & Multimodal Protocol stream.", component: <NeuralProtocol /> }
    ];

    return (
        <div className="min-h-screen bg-espresso-950 text-latte-100 py-16 md:py-24 px-6 relative overflow-hidden">
            <Helmet>
                <title>Laboratory | AI Research & Demos | AIOVerse</title>
                <meta name="description" content="Experience real-time AI and web demonstrations in the AIOVerse Laboratory. Interactive XAI heatmaps, system performance analytics, and neural data protocols." />
                <link rel="canonical" href="https://portfolio-aioverse.vercel.app/laboratory" />
            </Helmet>
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <GridScan
                    sensitivity={0.5}
                    lineThickness={1}
                    linesColor="#392e4e"
                    gridScale={0.15}
                    scanColor="#2196F3"
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
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 bg-accent-blue/10 border border-accent-blue/30 rounded-full mb-6 font-mono text-[10px] text-accent-blue">
                        <Database size={12} />
                        <span>LABORATORY_ACCESS_V.2.0</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-mono font-bold mb-6 tracking-tighter uppercase">
                        Expertise <span className="text-accent-orange">Laboratory</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-latte-400 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed">
                        Interactive, real-time proof of technical capability across the AIOVerse software architecture nodes.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {nodes.map((node) => (
                        <LabNodeCard
                            key={node.id}
                            title={node.title}
                            icon={node.icon}
                            color={node.color}
                            description={node.description}
                            onClick={() => setActiveNode(node.id)}
                        />
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-32 text-center">
                    <div className="h-px w-24 bg-latte-700/50 mx-auto mb-8" />
                    <p className="font-mono text-[9px] text-latte-600 uppercase tracking-[0.4em] max-w-lg mx-auto">
                        EXPERIMENTAL_NODE: DATA_STREAM_NOMINAL | CORE_TEMPERATURE_LOW
                    </p>
                </motion.div>
            </div>

            {/* Simulation Overlay */}
            <AnimatePresence>
                {activeNode && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveNode(null)}
                            className="absolute inset-0 bg-espresso-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full h-full max-w-6xl bg-espresso-900 border border-espresso-700 shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="bg-espresso-950 px-6 py-4 flex items-center justify-between border-b border-espresso-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                                    <span className="font-mono text-xs text-latte-300 uppercase tracking-widest">{activeNode}_simulation_active.sh</span>
                                </div>
                                <button
                                    onClick={() => setActiveNode(null)}
                                    className="p-2 hover:bg-espresso-800 text-latte-500 hover:text-white transition-colors rounded-sm"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto bg-espresso-950/50">
                                {nodes.find(n => n.id === activeNode)?.component}
                            </div>
                            <div className="bg-espresso-950 px-6 py-2 border-t border-espresso-700 flex items-center justify-between font-mono text-[10px] text-latte-600">
                                <span>STATUS: RUNNING</span>
                                <span>AION_LAB_NODE v4.0.2</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
