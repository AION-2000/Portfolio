import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Loader2, CheckCircle2, Camera, Upload } from 'lucide-react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess: (newReview: { name: string; affiliation: string; quote: string; imageSrc: string; thumbnailSrc: string }) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        affiliation: '',
        quote: '',
        imageSrc: '',
        thumbnailSrc: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({
                ...prev,
                imageSrc: base64String,
                thumbnailSrc: base64String // For now using same for both
            }));
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxRgOJ__soLVFXBz5yZZM2mlzAPP0Ry6D20mjq-HNWF9l3NhZsxcPVLvWz1l2Qb07zOZg/exec';

        const formBody = new URLSearchParams();
        formBody.append('formType', 'feedback');
        Object.entries(formData).forEach(([key, value]) => {
            formBody.append(key, value);
        });

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody.toString(),
            });

            // Instant UI Update
            onSubmitSuccess({
                ...formData,
                imageSrc: formData.imageSrc || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000",
                thumbnailSrc: formData.thumbnailSrc || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            });

            setStatus('success');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-espresso-950/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-espresso-900 border border-espresso-700 shadow-2xl overflow-hidden"
                    >
                        <div className="bg-espresso-950 px-4 py-3 flex items-center justify-between border-b border-espresso-700">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-accent-orange" />
                                <span className="font-mono text-xs text-latte-300">exec ./submit_feedback.sh</span>
                            </div>
                            <button onClick={onClose} className="text-latte-500 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8">
                            {status === 'success' ? (
                                <div className="py-12 text-center">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-accent-green" />
                                    </motion.div>
                                    <h3 className="font-mono text-xl text-latte-100 mb-2">Feedback Logged</h3>
                                    <p className="font-mono text-sm text-latte-500 mb-8 px-8">
                                        // Signal received. Your feedback has been integrated into the AIOVerse trust network.
                                    </p>
                                    <button onClick={onClose} className="px-8 py-3 bg-espresso-800 border border-latte-500 text-latte-500 font-mono text-sm hover:bg-white hover:text-espresso-950 transition-colors">
                                        Close Terminal
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex flex-col items-center mb-8">
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-24 h-24 rounded-full border-2 border-dashed border-espresso-700 flex flex-col items-center justify-center cursor-pointer hover:border-accent-orange transition-colors overflow-hidden group relative"
                                        >
                                            {formData.imageSrc ? (
                                                <img src={formData.imageSrc} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <>
                                                    <Camera className="w-6 h-6 text-latte-500 group-hover:text-accent-orange" />
                                                    <span className="font-mono text-[8px] text-latte-600 mt-1 uppercase">Upload_Photo</span>
                                                </>
                                            )}
                                            <div className="absolute inset-0 bg-espresso-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Upload className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <p className="font-mono text-[9px] text-latte-600 mt-2 uppercase">Identity_Verification: {isUploading ? "UPLOADING..." : "REQUIRED"}</p>
                                    </div>

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
                                                    placeholder="Aleksei Petrov"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Affiliation / Role</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.affiliation}
                                                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                                                    className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors"
                                                    placeholder="CTO @ TechGlobal"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">Transmission (Testimonial)</label>
                                            <textarea
                                                required
                                                value={formData.quote}
                                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                                className="w-full bg-espresso-950 border border-espresso-700 p-3 font-mono text-sm text-latte-100 focus:outline-none focus:border-accent-blue transition-colors min-h-[100px] resize-none"
                                                placeholder="// Enter your professional review here..."
                                            />
                                        </div>
                                    </div>

                                    <button
                                        disabled={status === 'loading' || isUploading}
                                        type="submit"
                                        className="w-full py-4 bg-accent-orange text-espresso-950 font-mono font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                    >
                                        {status === 'loading' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                TRANSMIT_REVIEW
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

export default FeedbackModal;
