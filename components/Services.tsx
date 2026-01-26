"use client";

import React from "react";
import ElectricBorder from "./ui/ElectricBorder";
import { Sparkles, Zap, Shield, Rocket, ArrowLeft, Check, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GridScan } from "./GridScan";

const serviceTiers = [
    {
        title: "Starter",
        price: "$99",
        description: "Perfect for individuals and side-hustles starting their journey.",
        features: ["Basic AI Consultation", "Single Page Website", "Standard API Access", "Email Support"],
        color: "#7df9ff",
        icon: <Rocket className="size-6 text-blue-300" />,
        suffix: "session"
    },
    {
        title: "Professional",
        price: "$299",
        description: "Scaled intelligence for creators and growing startups.",
        features: ["Advanced ML Models", "Multi-page Application", "Priority API Access", "Custom Integration", "Discord Access"],
        color: "#E67E22",
        icon: <Zap className="size-6 text-orange-400" />,
        suffix: "session",
        pill: "Most Popular"
    },
    {
        title: "Enterprise",
        price: "Custom",
        description: "Full-scale infrastructure for heavy industry applications.",
        features: ["Full AI Infrastructure", "Dedicated System Engineer", "24/7 Priority Channel", "Security & Privacy Audit", "White-label Options"],
        color: "#2ECC71",
        icon: <Shield className="size-6 text-green-400" />,
        suffix: "contract"
    }
];

export default function Services() {
    return (
        <div className="min-h-screen bg-espresso-950 text-latte-100 py-16 md:py-24 px-6 relative overflow-hidden">
            {/* Background GridScan */}
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
                {/* Navigation Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 font-mono text-xs md:text-sm text-accent-orange hover:text-latte-100 transition-colors"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span>return_to_main_node()</span>
                    </Link>
                </motion.div>

                {/* Title Section */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 rounded-full mb-6 font-mono text-[10px] text-accent-orange"
                    >
                        <Terminal size={12} />
                        <span>AVAILABLE_SERVICES_V2.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-mono font-bold mb-6 tracking-tighter"
                    >
                        Technical <span className="text-accent-blue">Architectures</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-latte-400 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed"
                    >
                        Scale your digital ecosystem with precision-engineered AI solutions and full-stack implementation.
                    </motion.p>
                </div>

                {/* Services Grid / Stack */}
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-10">
                    {serviceTiers.map((tier, idx) => (
                        <motion.div
                            key={tier.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="relative"
                        >
                            {tier.pill && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-accent-orange text-espresso-950 px-4 py-1 rounded-full font-mono font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-accent-orange/20">
                                    {tier.pill}
                                </div>
                            )}

                            <ElectricBorder
                                color={tier.color}
                                speed={1.2}
                                chaos={0.1}
                                borderRadius={12}
                                className="h-full"
                            >
                                <div className="p-8 md:p-10 bg-espresso-900/40 backdrop-blur-xl rounded-xl border border-espresso-700/50 h-full flex flex-col group hover:bg-espresso-900/60 transition-colors duration-500">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-3 bg-espresso-950/50 rounded-lg border border-espresso-700 group-hover:scale-110 transition-transform duration-500">
                                            {tier.icon}
                                        </div>
                                        <span className="font-mono text-[10px] text-latte-500 uppercase tracking-widest">Type: 00{idx + 1}</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-mono font-bold mb-2 group-hover:text-latte-500 transition-colors">{tier.title}</h3>

                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-4xl md:text-5xl font-mono font-bold text-latte-100">{tier.price}</span>
                                        <span className="text-xs font-mono text-latte-500">/ {tier.suffix}</span>
                                    </div>

                                    <p className="text-latte-400 font-mono text-xs mb-10 leading-relaxed border-l border-espresso-700 pl-4 py-1">
                                        {tier.description}
                                    </p>

                                    <div className="mb-12 flex-grow">
                                        <div className="text-[10px] font-mono text-latte-500 uppercase tracking-widest mb-4">Core_Deliverables:</div>
                                        <ul className="space-y-4 font-mono text-xs text-latte-300">
                                            {tier.features.map(f => (
                                                <li key={f} className="flex items-start gap-3">
                                                    <Check className="size-3 mt-1 text-accent-green flex-shrink-0" />
                                                    <span className="group-hover:text-latte-100 transition-colors">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full relative py-4 bg-transparent border border-latte-100/20 text-latte-100 font-mono font-bold text-xs hover:bg-latte-100 hover:text-espresso-950 transition-all duration-300 overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <Sparkles size={14} />
                                                INITIATE_SESSION()
                                            </span>
                                        </motion.button>
                                        <div className="mt-4 text-center">
                                            <span className="text-[8px] font-mono text-latte-600 uppercase tracking-[0.2em]">Ready for deployment</span>
                                        </div>
                                    </div>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 md:mt-32 text-center"
                >
                    <p className="font-mono text-[10px] text-latte-600 uppercase tracking-[0.3em]">
                        All projects encrypted and delivery via secure channels.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
