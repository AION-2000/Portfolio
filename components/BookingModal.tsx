import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Loader2, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedService?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedService }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: preselectedService || 'AI / Automation',
        description: '',
        preference: ''
    });

    // Sync form with preselectedService when it changes (or when modal opens)
    React.useEffect(() => {
        if (preselectedService && isOpen) {
            setFormData(prev => ({ ...prev, projectType: preselectedService }));
        }
    }, [preselectedService, isOpen]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // This URL will be provided by the user from Google Apps Script setup
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhIlGrc717Rt6kAxgrgT_57JXRHoFWtYHWRJXF3E4dZ-EudIperm-tywQPpHG7vEweMg/exec';

        if (!SCRIPT_URL) {
            // For now, simulate success if no URL is provided (until the user sets it up)
            setTimeout(() => {
                console.log('Form data:', formData);
                setStatus('success');
            }, 1500);
            return;
        }

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Essential for Google Apps Script cross-origin
                headers: {
                    'Content-Type': 'text/plain', // Avoids preflight OPTIONS request
                },
                body: JSON.stringify(formData),
            });
            setStatus('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            projectType: 'AI / Automation',
            description: '',
            preference: ''
        });
        setStatus('idle');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-espresso-950/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-espresso-900 border border-espresso-700 shadow-2xl overflow-hidden"
                    >
                        {/* Terminal Header */}
                        <div className="bg-espresso-950 px-4 py-3 flex items-center justify-between border-b border-espresso-700">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-accent-orange" />
                                <span className="font-mono text-xs text-latte-300">exec ./book_consultation.sh</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-latte-500 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8">
                            {status === 'success' ? (
                                <div className="py-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-accent-green" />
                                    </motion.div>
                                    <h3 className="font-mono text-xl text-latte-100 mb-2">Session Initialized</h3>
                                    <p className="font-mono text-sm text-latte-500 mb-2 px-8">
                                        // Lead successfully synchronized with central database.
                                    </p>
                                    <p className="font-mono text-[10px] text-accent-blue mb-8 px-8 uppercase tracking-widest">
                                        Entry ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} | Status: SECURE_STORED
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="px-8 py-3 bg-espresso-800 border border-latte-500 text-latte-500 font-mono text-sm hover:bg-white hover:text-espresso-950 transition-colors"
                                    >
                                        Return to Terminal
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors"
                                                    placeholder="user@local:~$ info name"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors"
                                                    placeholder="client@net.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Project / Service Package</label>
                                            <select
                                                value={formData.projectType}
                                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors appearance-none"
                                            >
                                                <optgroup label="Main Tiers">
                                                    <option>Starter AI & Web</option>
                                                    <option>Advanced AI App</option>
                                                    <option>Full AI Product</option>
                                                </optgroup>
                                                <optgroup label="Specialized Modules">
                                                    <option>XAI Implementation</option>
                                                    <option>Computer Vision</option>
                                                    <option>NLP & AI Chatbots</option>
                                                    <option>AI-Powered Web</option>
                                                </optgroup>
                                                <optgroup label="General">
                                                    <option>AI / Automation</option>
                                                    <option>Full-stack Development</option>
                                                    <option>Web Design</option>
                                                    <option>Consultation</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Requirement Brief</label>
                                            <textarea
                                                required
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors min-h-[100px] resize-none"
                                                placeholder="// Describe your project requirements..."
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Availability / Preference</label>
                                            <input
                                                type="text"
                                                value={formData.preference}
                                                onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                                                className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors"
                                                placeholder="Next Monday, 10:00 AM"
                                            />
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-[10px]">
                                            ERROR: TRANSMISSION_FAILED. Check connection or script URL.
                                        </div>
                                    )}

                                    <button
                                        disabled={status === 'loading'}
                                        type="submit"
                                        className="w-full py-4 bg-accent-orange text-espresso-950 font-mono font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                    >
                                        {status === 'loading' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                INITIATE_HANDSHAKE
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
