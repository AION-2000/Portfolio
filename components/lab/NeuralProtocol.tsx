import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Shield, Zap } from 'lucide-react';

const NeuralProtocol: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let animationFrameId: number;
        const particles: Array<{ x: number, y: number, vx: number, vy: number, phase: number }> = [];
        const numParticles = 60;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                phase: Math.random() * Math.PI * 2
            });
        }

        const render = () => {
            ctx.fillStyle = 'rgba(10, 5, 3, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#2ECC71';
            ctx.lineWidth = 0.5;

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw Particle
                ctx.fillStyle = `rgba(46, 204, 113, ${0.3 + Math.sin(p.phase) * 0.2})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
                p.phase += 0.05;

                // Draw Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(46, 204, 113, ${0.2 * (1 - dist / 100)})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="flex flex-col h-full bg-espresso-950 p-6 md:p-12 overflow-hidden">
            <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-accent-green/10 border border-accent-green/30 rounded-sm">
                    <Network className="text-accent-green" size={24} />
                </div>
                <div>
                    <h3 className="font-mono text-xl text-latte-100 uppercase tracking-tighter">Neural_Protocol_Relay</h3>
                    <p className="font-mono text-[10px] text-latte-500 uppercase">Focus: MULTIMODAL_DATA_ORCHESTRATION</p>
                </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-8 min-h-0">
                {/* Canvas Visualizer */}
                <div className="relative border border-espresso-700 bg-espresso-900 rounded-sm overflow-hidden min-h-[300px]">
                    <canvas ref={canvasRef} width={600} height={400} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 z-10 font-mono text-[8px] text-accent-green animate-pulse">
                        ENCRYPTED_STREAM_ACTIVE
                    </div>
                </div>

                {/* Data Feed Side */}
                <div className="space-y-6 flex flex-col min-h-0">
                    <div className="p-6 bg-espresso-900 border border-espresso-700/50 rounded-sm flex-1 overflow-auto custom-scrollbar">
                        <div className="font-mono text-[9px] text-latte-500 space-y-2 uppercase">
                            <p className="text-accent-blue">[01:14:22] // INIT_NEURAL_RELAY</p>
                            <p className="text-latte-300">Packet_Header: 0x882_AIOVERSE</p>
                            <p className="text-latte-400">Stream_Density: 420.4 kb/node</p>
                            <div className="h-px bg-espresso-800 my-4" />
                            <p className="text-accent-green">Processing specialized data nodes...</p>
                            <ul className="space-y-4 pt-4">
                                <li className="flex items-center gap-4">
                                    <Database size={14} className="text-latte-600" />
                                    <div>
                                        <p className="text-latte-100">Vector_DB_Ingestion</p>
                                        <div className="w-32 h-1 bg-espresso-700 mt-1">
                                            <motion.div animate={{ width: '85%' }} className="h-full bg-accent-green" />
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Shield size={14} className="text-latte-600" />
                                    <div>
                                        <p className="text-latte-100">Zero_Trust_Auth</p>
                                        <div className="w-32 h-1 bg-espresso-700 mt-1">
                                            <motion.div animate={{ width: '100%' }} className="h-full bg-accent-blue" />
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Zap size={14} className="text-latte-600" />
                                    <div>
                                        <p className="text-latte-100">Sub_Latency_Relay</p>
                                        <div className="w-32 h-1 bg-espresso-700 mt-1">
                                            <motion.div animate={{ width: '92%' }} className="h-full bg-accent-orange" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuralProtocol;
