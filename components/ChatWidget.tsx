import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Maximize2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

interface ChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'AIOVerse Shell v0.2 initialized. \nWaiting for input...' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '', isStreaming: true }]);

      const stream = await sendMessageToGemini(userMessage.text);

      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = (chunk as GenerateContentResponse).text;
        if (chunkText) {
          fullText += chunkText;
          setMessages(prev => prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: fullText } : msg
          ));
        }
      }

      setMessages(prev => prev.map(msg =>
        msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      const errorMessage = error?.message || "Unknown error occurred";

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: `Error: ${errorMessage}\n\n[System Diagnostic]: Check VITE_GEMINI_API_KEY configuration.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 bg-espresso-950 text-accent-green border border-espresso-700 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] z-50 flex items-center justify-center hover:bg-espresso-900 hover:border-accent-green transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        data-hover
      >
        {isOpen ? <X className="w-5 h-5" /> : <TerminalIcon className="w-5 h-5" />}
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-6 w-[90vw] md:w-[400px] h-[500px] bg-[#0A0503] border border-espresso-700 rounded-sm shadow-2xl z-50 flex flex-col font-mono text-xs md:text-sm overflow-hidden"
          >
            {/* Header / Title Bar */}
            <div className="px-3 py-2 bg-espresso-800 border-b border-espresso-700 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 text-latte-400">
                <TerminalIcon size={12} />
                <span className="font-bold tracking-wider">bash — 80x24</span>
              </div>
              <div className="flex gap-2 opacity-50">
                <Minus size={10} className="hover:text-white cursor-pointer" />
                <Maximize2 size={10} className="hover:text-white cursor-pointer" />
                <X size={10} className="hover:text-white cursor-pointer" onClick={() => setIsOpen(false)} />
              </div>
            </div>

            {/* Terminal Output */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1 break-words">
                  {msg.role === 'user' ? (
                    <div className="flex gap-2 text-latte-200">
                      <span className="text-accent-blue whitespace-nowrap">user@local:~$</span>
                      <span>{msg.text}</span>
                    </div>
                  ) : (
                    <div className="text-latte-400 pl-0">
                      {msg.text.split('\n').map((line, i) => (
                        <div key={i} className="min-h-[1.2em]">
                          {i === 0 && <span className="text-accent-green mr-2">{'>'}</span>}
                          {line}
                        </div>
                      ))}
                      {msg.isStreaming && <span className="inline-block w-2 h-4 bg-accent-green ml-1 animate-pulse align-text-bottom" />}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Line */}
            <div className="p-3 bg-espresso-950 border-t border-espresso-700">
              <div className="flex items-center gap-2">
                <span className="text-accent-blue">user@local:~$</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-latte-100 caret-accent-green placeholder-espresso-700"
                  autoFocus
                  disabled={isLoading}
                  placeholder="_"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;