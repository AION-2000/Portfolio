"use client";

import React from "react";
import DisplayCards from "@/components/ui/display-cards";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { Sparkles, Zap, Shield, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const serviceTiers = [
    {
        title: "Starter",
        price: "$99",
        description: "Perfect for individuals and small projects.",
        features: ["Basic AI Consultation", "Single Page Website", "Standard Support"],
        color: "#7df9ff",
        icon: <Rocket className="size-5 text-blue-300" />,
        cards: [
            {
                icon: <Sparkles className="size-4 text-blue-300" />,
                title: "Fast Delivery",
                description: "Get started in no time.",
                date: "Starter Pack",
                className: "[grid-area:stack] hover:-translate-y-10 transition-all duration-500",
            }
        ]
    },
    {
        title: "Professional",
        price: "$299",
        description: "Most popular for growing businesses.",
        features: ["Advanced ML Models", "Multi-page App", "Priority Support", "Custom Integrations"],
        color: "#E67E22",
        icon: <Zap className="size-5 text-orange-400" />,
        cards: [
            {
                icon: <Zap className="size-4 text-orange-300" />,
                title: "Pro Features",
                description: "Scale your intelligence.",
                date: "Most Popular",
                className: "[grid-area:stack] hover:-translate-y-10 transition-all duration-500",
            }
        ]
    },
    {
        title: "Enterprise",
        price: "Custom",
        description: "Dedicated solutions for large organizations.",
        features: ["Full AI Infrastructure", "Dedicated Engineer", "24/7 Support", "Security Audit"],
        color: "#2ECC71",
        icon: <Shield className="size-5 text-green-400" />,
        cards: [
            {
                icon: <Shield className="size-4 text-green-300" />,
                title: "Secure & Robust",
                description: "Enterprise grade solutions.",
                date: "Custom Plan",
                className: "[grid-area:stack] hover:-translate-y-10 transition-all duration-500",
            }
        ]
    }
];

export default function Services() {
    return (
        <div className="min-h-screen bg-espresso-950 text-latte-100 py-24 px-6 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[size:50px_50px] bg-grid-pattern" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Link to="/" className="inline-block mb-12 font-mono text-accent-orange hover:underline">
                    &lt;-- back_to_home.sh
                </Link>

                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-mono mb-6"
                    >
                        Our <span className="text-accent-blue">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-latte-400 max-w-2xl mx-auto font-mono"
                    >
                        Select a session level that fits your requirements. Automated solutions at your fingertips.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {serviceTiers.map((tier, idx) => (
                        <motion.div
                            key={tier.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                        >
                            <ElectricBorder
                                color={tier.color}
                                speed={1.5}
                                chaos={0.15}
                                borderRadius={16}
                                className="h-full"
                            >
                                <div className="p-6 md:p-8 bg-espresso-900/80 backdrop-blur-md rounded-2xl border border-espresso-700 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        {tier.icon}
                                        <h3 className="text-xl md:text-2xl font-mono font-bold">{tier.title}</h3>
                                    </div>
                                    <div className="text-3xl md:text-4xl font-mono font-bold mb-4 text-latte-100">
                                        {tier.price}
                                        {tier.price !== "Custom" && <span className="text-lg text-latte-500">/session</span>}
                                    </div>
                                    <p className="text-latte-400 font-mono text-xs md:text-sm mb-8">
                                        {tier.description}
                                    </p>

                                    <div className="mb-8 flex-grow">
                                        <ul className="space-y-3 font-mono text-[10px] md:text-xs text-latte-300">
                                            {tier.features.map(f => (
                                                <li key={f} className="flex items-center gap-2">
                                                    <span className="text-accent-green">√</span> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-espresso-800">
                                        <div className="scale-75 md:scale-75 -translate-x-10 md:-translate-x-10 origin-left">
                                            <DisplayCards cards={tier.cards} />
                                        </div>
                                        <button className="w-full py-3 md:py-4 mt-6 bg-latte-100 text-espresso-950 font-mono font-bold text-xs md:text-sm hover:bg-white transition-colors">
                                            INITIATE ./deploy.sh
                                        </button>
                                    </div>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
