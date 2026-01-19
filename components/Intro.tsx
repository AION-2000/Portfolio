import React from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from './ui/splite';
import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';
import { Terminal } from 'lucide-react';

interface IntroProps {
    onEnter: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onEnter }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-[#0A0503] flex items-center justify-center p-4 md:p-8 font-mono overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-7xl relative"
            >
                <Card className="w-full min-h-[600px] border-espresso-700/50 relative group">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                    />

                    <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
                        {/* Left content */}
                        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="flex items-center gap-2 text-accent-green mb-4 text-xs md:text-sm">
                                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                                    <span>SYSTEM_READY: BOOT_SEQUENCE_COMPLETE</span>
                                </div>

                                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-latte-100 mb-6 leading-tight">
                                    Interactive <br />
                                    <span className="text-accent-orange">AIOVerse</span>
                                </h1>

                                <p className="text-latte-400 max-w-lg mb-10 text-sm md:text-base leading-relaxed">
                                    Initializing neural architecture... Bringing portfolio data to life through
                                    immersive 3D environments. Accessing Shihab Shahriar Aion's creative subspace.
                                </p>

                                <motion.button
                                    onClick={onEnter}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent-orange text-espresso-950 font-bold overflow-hidden transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                    <Terminal size={18} />
                                    <span>INITIALIZE_WORKSPACE</span>
                                </motion.button>

                                <div className="mt-8 flex items-center gap-4 text-latte-500 text-[10px]">
                                    <span className="opacity-50">LAT: 34ms</span>
                                    <span className="opacity-50">UPTIME: 99.9%</span>
                                    <span className="text-accent-blue font-bold tracking-widest uppercase">ID: AION_2000_SHI</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right content - Spline Scene */}
                        <div className="flex-1 min-h-[400px] lg:min-h-full relative overflow-hidden bg-espresso-950/30">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1.5 }}
                                className="w-full h-full"
                            >
                                <SplineScene
                                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                    className="w-full h-full"
                                />
                            </motion.div>

                            {/* Aesthetic overlays for the Spline scene */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-espresso-950/50 to-transparent lg:hidden" />
                            <div className="absolute inset-0 pointer-events-none border-l border-espresso-700/30 hidden lg:block" />
                        </div>
                    </div>
                </Card>

                {/* Floating Code Snippets for atmosphere */}
                <div className="absolute -top-12 -right-12 text-[10px] text-latte-500/20 font-mono hidden xl:block select-none pointer-events-none">
                    <pre>
                        {`import { NeuralCore } from './core';
const workspace = new NeuralCore({
  id: "AION_2000_SHI",
  mode: "INTERACTIVE"
});`}
                    </pre>
                </div>
            </motion.div>
        </div>
    );
};
