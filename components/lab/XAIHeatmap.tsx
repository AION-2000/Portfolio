import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Brain, Layers } from 'lucide-react';

const XAIHeatmap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [stats, setStats] = useState({ conf: 0.98, latency: '14ms', layers: 24 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let animationFrameId: number;
        const points: { x: number, y: number, r: number, opacity: number }[] = [];

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Heatmap Points
            points.forEach((p, i) => {
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                gradient.addColorStop(0, `rgba(230, 126, 34, ${p.opacity})`);
                gradient.addColorStop(0.5, `rgba(230, 126, 34, ${p.opacity * 0.4})`);
                gradient.addColorStop(1, 'rgba(230, 126, 34, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                // Fade out
                p.opacity -= 0.01;
                p.r += 0.5;
            });

            // Cleanup dead points
            if (points.length > 50) points.shift();

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
                points.push({ x, y, r: 20, opacity: 0.6 });
                setIsAnalyzing(true);
            } else {
                setIsAnalyzing(false);
            }
        };

        render();
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="flex flex-col h-full bg-espresso-950 p-6 md:p-12 overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-8 h-full">
                {/* Visualizer Area */}
                <div className="lg:col-span-2 relative border border-espresso-700 bg-espresso-900 rounded-sm overflow-hidden flex flex-col">
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-accent-orange animate-pulse' : 'bg-latte-700'}`} />
                        <span className="font-mono text-[10px] text-latte-400 uppercase tracking-widest">
                            XAI_Live_Buffer: {isAnalyzing ? 'CAPTURING' : 'IDLE'}
                        </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4 relative">
                        {/* Simulation Image Placeholder */}
                        <div className="relative w-full max-w-lg aspect-square border border-espresso-800 bg-espresso-950 flex items-center justify-center overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"
                                alt="Laboratory Subject"
                                className="w-full h-full object-cover opacity-40 grayscale"
                            />
                            <canvas
                                ref={canvasRef}
                                width={500}
                                height={500}
                                className="absolute inset-0 z-10 mix-blend-screen"
                            />

                            {/* Scanning Line */}
                            <motion.div
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[1px] bg-accent-orange/50 z-20 shadow-[0_0_15px_rgba(230,126,34,0.5)]"
                            />
                        </div>
                    </div>

                    {/* Controls/Info */}
                    <div className="p-4 bg-espresso-950/80 border-t border-espresso-700 flex flex-wrap gap-6 justify-between items-center font-mono text-[10px]">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-latte-500 uppercase">Confidence</span>
                                <span className="text-accent-green text-sm">{(stats.conf * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-latte-500 uppercase">Latency</span>
                                <span className="text-accent-blue text-sm">{stats.latency}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Scan size={14} className="text-accent-orange" />
                            <span className="text-latte-300">Hover over image to visualize feature importance</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Protocol */}
                <div className="space-y-6">
                    <div className="p-6 border border-espresso-700 bg-espresso-900 rounded-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Brain className="text-accent-orange" />
                            <h4 className="font-mono text-sm font-bold uppercase">XAI_Protocol_01</h4>
                        </div>
                        <div className="space-y-4 font-mono text-[10px] text-latte-400 leading-relaxed">
                            <p className="border-l-2 border-accent-orange pl-4">
                                // Computing Grad-CAM visualization for convolutional feature maps.
                                Attribution scores are calculated via pixel-wise gradient backpropagation.
                            </p>
                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Layer_Depth:</span>
                                    <span className="text-latte-100">64-Channel</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Optimizer:</span>
                                    <span className="text-latte-100">Adam_Adaptive</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Kernel_Size:</span>
                                    <span className="text-latte-100">3x3 / Multi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border border-espresso-700 bg-espresso-900 rounded-sm flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers className="text-accent-blue" />
                            <h4 className="font-mono text-sm font-bold uppercase">Network_Topology</h4>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: isAnalyzing ? [0.2, 1, 0.2] : 0.2 }}
                                    transition={{ duration: 1, delay: i * 0.05, repeat: Infinity }}
                                    className="h-8 bg-espresso-700 rounded-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XAIHeatmap;
