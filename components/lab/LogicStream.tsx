import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Binary, Hash, GitBranch } from 'lucide-react';

const LogicStream: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [status, setStatus] = useState('IDLE');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Initial random array
    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);
        setArray(newArr);
        setStatus('READY_FOR_COMPILATION');
    };

    const bubbleSortAction = async () => {
        setStatus('EXECUTING_BUBBLE_SORT');
        let tempArr = [...array];
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr.length - i - 1; j++) {
                setActiveIndex(j);
                if (tempArr[j] > tempArr[j + 1]) {
                    [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
                    setArray([...tempArr]);
                    await new Promise(r => setTimeout(r, 200));
                }
            }
        }
        setActiveIndex(null);
        setStatus('LOGIC_VERIFIED_SUCCESS');
    };

    return (
        <div className="flex flex-col h-full bg-espresso-950 p-6 md:p-12 overflow-hidden">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-latte-100/10 border border-latte-100/30 rounded-sm">
                        <Terminal className="text-latte-100" size={24} />
                    </div>
                    <div>
                        <h3 className="font-mono text-xl text-latte-100 uppercase tracking-tighter">Logic_Flow_Visualization</h3>
                        <p className="font-mono text-[10px] text-latte-500 uppercase">Algorithm_Node: 0x01_SORTING_RELAY</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={resetArray}
                        className="px-4 py-2 border border-espresso-700 font-mono text-[10px] text-latte-500 hover:bg-espresso-800 transition-colors uppercase"
                    >
                        Reset_Data()
                    </button>
                    <button
                        onClick={bubbleSortAction}
                        disabled={status === 'EXECUTING_BUBBLE_SORT'}
                        className="px-4 py-2 bg-latte-100 text-espresso-950 font-mono text-[10px] font-bold hover:bg-accent-orange transition-colors uppercase disabled:opacity-50"
                    >
                        Exec_BubbleSort()
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 flex-1">
                {/* Visualizer */}
                <div className="border border-espresso-700 bg-espresso-900 rounded-sm p-8 flex items-end justify-center gap-2 relative min-h-[300px]">
                    <AnimatePresence>
                        {array.map((val, idx) => (
                            <motion.div
                                key={`${idx}-${val}`}
                                layout
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                className="flex-1 rounded-t-sm relative group"
                                style={{
                                    height: `${val}%`,
                                    backgroundColor: activeIndex === idx ? '#E67E22' : '#2C2B3B',
                                    border: activeIndex === idx ? '1px solid rgba(230, 126, 34, 0.5)' : '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <span className={`absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] ${activeIndex === idx ? 'text-accent-orange' : 'text-latte-500'}`}>
                                    {val}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="absolute top-4 right-4 font-mono text-[8px] text-latte-700 uppercase">
                        Active_Stack_Pointer: {activeIndex !== null ? activeIndex : 'NULL'}
                    </div>
                </div>

                {/* Code Terminal View */}
                <div className="bg-espresso-950 border border-espresso-800 rounded-sm p-6 overflow-hidden flex flex-col font-mono text-[10px] leading-relaxed">
                    <div className="flex items-center gap-2 mb-4 text-accent-blue opacity-80">
                        <Binary size={14} />
                        <span>LOGIC_OUTPUT_STREAM</span>
                    </div>
                    <div className="flex-1 space-y-1 text-latte-500">
                        <p><span className="text-accent-orange">while</span> (node.processing) &#123;</p>
                        <p className="pl-4">status = <span className="text-accent-green">"{status}"</span>;</p>
                        <p className="pl-4">data_packet = <span className="text-latte-300">[{array.join(', ')}]</span>;</p>
                        <div className="h-px w-full bg-espresso-800 my-4" />
                        <p className="text-latte-600">// Analysis of Language Mastery:</p>
                        <p className="flex items-center gap-4 py-1 border-b border-espresso-900">
                            <span className="text-latte-300 min-w-[60px]">Python</span>
                            <div className="h-1 bg-espresso-800 flex-1 overflow-hidden">
                                <motion.div animate={{ width: '95%' }} className="h-full bg-accent-orange" />
                            </div>
                            <span>95%</span>
                        </p>
                        <p className="flex items-center gap-4 py-1 border-b border-espresso-900">
                            <span className="text-latte-300 min-w-[60px]">Java/C</span>
                            <div className="h-1 bg-espresso-800 flex-1 overflow-hidden">
                                <motion.div animate={{ width: '88%' }} className="h-full bg-accent-blue" />
                            </div>
                            <span>88%</span>
                        </p>
                        <p className="flex items-center gap-4 py-1">
                            <span className="text-latte-300 min-w-[60px]">Logic</span>
                            <div className="h-1 bg-espresso-800 flex-1 overflow-hidden">
                                <motion.div animate={{ width: '92%' }} className="h-full bg-accent-green" />
                            </div>
                            <span>92%</span>
                        </p>
                        <p className="mt-6 pt-4 text-accent-blue flex items-center gap-2">
                            <GitBranch size={10} />
                            Branching complexity: O(n²) | Space: O(1)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogicStream;
