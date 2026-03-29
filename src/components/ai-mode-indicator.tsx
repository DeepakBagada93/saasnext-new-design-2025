'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Cpu, ChevronRight } from 'lucide-react';

const models = [
  { name: 'Gemini 1.5 Pro', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'GPT-4o', color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'Claude 3.5 Sonnet', color: 'text-orange-400', bg: 'bg-orange-400/10' },
];

export function AIModeIndicator() {
  const [currentModel, setCurrentModel] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModel((prev) => (prev + 1) % models.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-neutral-950 border-b border-white/5 py-1.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[10px] md:text-xs font-mono uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>AI Optimization Active</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-neutral-500 border-l border-white/10 pl-4">
            <Cpu className="w-3 h-3" />
            <span>GEO & AEO Protocols Initialized</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-500">Optimizing with:</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={models[currentModel].name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${models[currentModel].bg} ${models[currentModel].color} border border-current/20`}
            >
              <Bot className="w-3 h-3" />
              <span className="font-bold">{models[currentModel].name}</span>
            </motion.div>
          </AnimatePresence>
          <div className="hidden sm:block ml-2 text-neutral-600">
            <Sparkles className="w-3 h-3 inline mr-1" />
            <span>99.9% LLM Parsability</span>
          </div>
        </div>
      </div>
      
      {/* Scanning bar effect */}
      <motion.div 
        className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
