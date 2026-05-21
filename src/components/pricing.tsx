"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Clock, Target, Zap, ArrowRight, Sparkles, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePackages, Package } from "@/hooks/use-packages";
import { cn } from "@/lib/utils";

export const Pricing = () => {
    const { packages, isLoading } = usePackages();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(1); // Default to Growth System

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-32 min-h-[600px] bg-neutral-950">
                <Loader2 className="h-10 w-10 animate-spin text-accent" />
            </div>
        );
    }

    if (!packages || packages.length === 0) {
        return null;
    }

    return (
        <section id="pricing" className="py-24 md:py-40 bg-[#050505] overflow-hidden relative">
            {/* Grid Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Engineering Excellence</span>
                        </div>
                        <h2 className="font-headline text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">
                            Digital <span className="text-accent">Systems</span>
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed font-medium">
                            Select a system blueprint to view its technical capabilities and deployment roadmap.
                        </p>
                    </motion.div>
                </div>

                {/* Expanding Bento Grid */}
                <div className="flex flex-col lg:flex-row gap-4 h-full lg:h-[650px]">
                    {packages.map((plan, index) => {
                        const isActive = selectedIndex === index;
                        
                        return (
                            <motion.div
                                key={plan.id}
                                layout
                                onClick={() => setSelectedIndex(index)}
                                className={cn(
                                    "relative cursor-pointer overflow-hidden rounded-[2.5rem] border transition-all duration-500",
                                    isActive 
                                        ? "flex-[2.5] bg-white border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]" 
                                        : "flex-1 bg-[#0A0A0A] border-white/5 hover:border-white/20 hover:bg-[#111]"
                                )}
                            >
                                {/* Background Patterns for Active State */}
                                {isActive && (
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
                                )}

                                <div className={cn(
                                    "p-8 md:p-10 flex flex-col h-full",
                                    isActive ? "text-black" : "text-white"
                                )}>
                                    {/* Header: Title & System ID */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="space-y-1">
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-[0.3em]",
                                                isActive ? "text-accent" : "text-neutral-500"
                                            )}>
                                                SYSTEM_{String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className={cn(
                                                "text-2xl md:text-3xl font-bold font-headline leading-tight",
                                                isActive ? "text-black" : "text-white"
                                            )}>
                                                {plan.title.split(' — ')[1] || plan.title}
                                            </h3>
                                        </div>
                                        {isActive && plan.popular && (
                                            <div className="bg-black text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                                Active System
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-grow">
                                        <AnimatePresence mode="wait">
                                            {isActive ? (
                                                <motion.div
                                                    key="active"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-8"
                                                >
                                                    <p className="text-lg text-neutral-600 font-medium leading-relaxed max-w-md">
                                                        {plan.description}
                                                    </p>
                                                    
                                                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-black/5">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-accent">
                                                                <Clock className="w-4 h-4" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Execution</span>
                                                            </div>
                                                            <p className="text-xl font-bold">{plan.timeline}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-neutral-400">
                                                                <Target className="w-4 h-4" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Goal</span>
                                                            </div>
                                                            <p className="text-sm font-semibold leading-snug">{plan.outcome}</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {plan.features.slice(0, 6).map((f) => (
                                                            <div key={f} className="flex items-center gap-3">
                                                                <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center">
                                                                    <CheckCircle className="h-3 w-3 text-accent" />
                                                                </div>
                                                                <span className="text-sm font-medium text-neutral-500">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="inactive"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="lg:mt-32 space-y-6"
                                                >
                                                    <div className="text-3xl font-bold tracking-tighter text-white/40">
                                                        {plan.price.replace('Starting From ', '')}
                                                    </div>
                                                    <p className="text-sm text-neutral-500 line-clamp-2">
                                                        {plan.outcome}
                                                    </p>
                                                    <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                                                        <Plus className="h-5 w-5 text-white" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Footer: Price & CTA */}
                                    <div className="mt-8">
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                                                >
                                                    <div className="text-left w-full md:w-auto">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-1">Base Investment</span>
                                                        <div className="text-4xl font-bold tracking-tighter text-black">
                                                            {plan.price.replace('Starting From ', '')}
                                                        </div>
                                                    </div>
                                                    <Button asChild className="h-14 w-full md:w-auto px-8 bg-black text-white hover:bg-neutral-800 rounded-2xl font-black uppercase tracking-widest text-xs transition-transform active:scale-95 shadow-xl">
                                                        <Link href="/login">
                                                            {plan.cta}
                                                            <ArrowRight className="ml-2 h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile-Friendly Note */}
                <div className="mt-12 text-center lg:hidden">
                    <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest">Tap a system to explore blueprint</p>
                </div>
            </div>
        </section>
    );
};
