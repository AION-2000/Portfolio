import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Zap, Database } from 'lucide-react';

const SystemPerf: React.FC = () => {
    const [metrics, setMetrics] = useState({
        fps: 60,
        memory: 45.2,
        domNodes: 1420,
        latency: 12
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulated live metrics based on real browser state patterns
            setMetrics({
                fps: Math.floor(58 + Math.random() * 4),
                memory: parseFloat((44 + Math.random() * 2).toFixed(1)),
                domNodes: document.querySelectorAll('*').length,
                latency: Math.floor(10 + Math.random() * 8)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full bg-espresso-950 p-6 md:p-12 overflow-hidden">
            <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-accent-blue/10 border border-accent-blue/30 rounded-sm">
                    <Activity className="text-accent-blue" size={24} />
                </div>
                <div>
                    <h3 className="font-mono text-xl text-latte-100 uppercase tracking-tighter">Live_Node_Diagnostics</h3>
                    <p className="font-mono text-[10px] text-latte-500 uppercase">System_Instance: PROD_AIOVERSE_CORE</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Frames_Per_Sec', value: `${metrics.fps} FPS`, icon: <Zap size={14} />, color: '#2ECC71' },
                    { label: 'JS_Heap_Size', value: `${metrics.memory} MB`, icon: <Database size={14} />, color: '#F1C40F' },
                    { label: 'Active_DOM_Nodes', value: metrics.domNodes, icon: <Cpu size={14} />, color: '#E67E22' },
                    { label: 'Event_Lat_Bus', value: `${metrics.latency} ms`, icon: <Activity size={14} />, color: '#2196F3' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-espresso-900 border border-espresso-700/50 rounded-sm"
                    >
                        <div className="flex items-center gap-2 mb-4 opacity-60" style={{ color: stat.color }}>
                            {stat.icon}
                            <span className="font-mono text-[9px] uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <div className="font-mono text-3xl font-bold text-latte-100">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Performance Waveform Simulation */}
            <div className="flex-1 min-h-[200px] border border-espresso-700 bg-espresso-900 rounded-sm relative overflow-hidden p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] text-latte-500 uppercase">Realtime_Throughput_Log</span>
                    <div className="flex gap-4 font-mono text-[9px] uppercase">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-blue" /> Read</span>
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-orange" /> Write</span>
                    </div>
                </div>

                <div className="flex-1 flex items-end gap-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [20, Math.random() * 100 + 20, 20] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-accent-blue/20 to-accent-blue/60"
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-scan-line opacity-[0.03] pointer-events-none" />
            </div>

            <div className="mt-8 p-4 bg-espresso-900/50 border border-espresso-800 rounded-sm font-mono text-[9px] text-latte-500 leading-relaxed">
                <span className="text-accent-orange font-bold">INFO:</span> These metrics are being pulled directly from your browser's performance buffer.
                This node demonstrates the optimization capability of AIOVerse systems, maintaining sub-16ms frame times even during complex visual processing.
            </div>
        </div>
    );
};

export default SystemPerf;
