"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Clock, Target, Zap, ArrowRight, Activity, ShieldCheck, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePackages, Package } from "@/hooks/use-packages";
import { cn } from "@/lib/utils";

export const Pricing = () => {
    const { packages, isLoading } = usePackages();
    const [activeIndex, setActiveIndex] = useState(1); // Default to Growth System

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

    const currentPlan = packages[activeIndex] || packages[0];

    return (
        <section id="pricing" className="py-24 md:py-48 bg-neutral-950 overflow-hidden relative">
            {/* Command Center Background */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f26a2e15,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-20 md:mb-32">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
                                <Activity className="w-3 h-3 text-accent" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">System Architecture</span>
                            </div>
                            <h2 className="font-headline text-4xl sm:text-5xl md:text-8xl font-bold mb-8 text-white tracking-tighter">
                                Base <span className="text-accent italic">Systems.</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-neutral-500 font-medium leading-relaxed">
                                Select a pre-configured operational tier to jumpstart your AI OS deployment.
                            </p>
                        </motion.div>
                    </div>

                    {/* Desktop System Selector */}
                    <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl">
                        {packages.map((plan, index) => (
                            <button
                                key={plan.id}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                                    activeIndex === index 
                                        ? "bg-accent text-white shadow-[0_0_20px_rgba(242,106,46,0.3)]" 
                                        : "text-neutral-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {plan.title.split(' — ')[1] || plan.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile System Selector */}
                <div className="flex lg:hidden overflow-x-auto gap-2 mb-12 pb-4 scrollbar-hide">
                    {packages.map((plan, index) => (
                        <button
                            key={plan.id}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all",
                                activeIndex === index 
                                    ? "bg-accent border-accent text-white" 
                                    : "bg-white/5 border-white/10 text-neutral-500"
                            )}
                        >
                            {plan.title.split(' — ')[1] || plan.title}
                        </button>
                    ))}
                </div>

                {/* Command Center Detail View */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPlan.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                    >
                        {/* 1. Main Specs (Large) */}
                        <div className="lg:col-span-8">
                            <Card className="h-full border-white/5 bg-white/[0.02] p-6 sm:p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 sm:p-8">
                                    <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-white/[0.03] group-hover:text-accent/10 transition-colors" />
                                </div>
                                
                                <div className="space-y-8 sm:space-y-12">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold font-headline text-white tracking-tight break-words">
                                            {currentPlan.title}
                                        </h3>
                                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
                                            {currentPlan.description}
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
                                        <div className="space-y-6 sm:space-y-8">
                                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">Technical Capabilities</p>
                                            <div className="grid gap-3 sm:gap-4">
                                                {currentPlan.features.map((f) => (
                                                    <div key={f} className="flex items-start gap-3 sm:gap-4 group">
                                                        <div className="h-5 w-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                                                            <CheckCircle className="h-3 w-3 text-accent" />
                                                        </div>
                                                        <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6 sm:space-y-8 backdrop-blur-sm">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-neutral-500">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Cycle</span>
                                                    </div>
                                                    <p className="text-2xl sm:text-3xl font-bold text-white">{currentPlan.timeline}</p>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-neutral-500">
                                                        <Target className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Defined Outcome</span>
                                                    </div>
                                                    <p className="text-sm md:text-base text-neutral-300 font-medium leading-relaxed italic">
                                                        "{currentPlan.outcome}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 2. ROI & Pricing (Small Stack) */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <Card className="flex-1 border-white/5 bg-accent/5 p-6 sm:p-8 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[80px] rounded-full" />
                                
                                <div className="space-y-4">
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">Investment</span>
                                    <div className="space-y-1">
                                        <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter break-words">
                                            {currentPlan.price.replace('Starting From ', '')}
                                        </div>
                                        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                            ~ {currentPlan.price_usd} USD Base
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-12">
                                    <Button asChild className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-neutral-200 transition-all rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
                                        <Link href="/login">
                                            Initialize {currentPlan.title.split(' — ')[1] || 'System'}
                                            <ArrowRight className="ml-3 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>

                            <Card className="border-white/5 bg-white/[0.02] p-6 sm:p-8 rounded-[2.5rem] space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Security Guarantee</span>
                                </div>
                                <p className="text-xs text-neutral-500 leading-relaxed uppercase tracking-widest">
                                    All systems are built on enterprise-grade infrastructure with automated backups and 24/7 monitoring.
                                </p>
                            </Card>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* System Specs Bar */}
                <div className="mt-12 p-4 sm:p-6 rounded-[2rem] border border-white/5 bg-white/[0.01] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">
                    <div className="flex items-center gap-2">
                        Next.js 15
                    </div>
                    <div className="flex items-center gap-2">
                        Supabase DB
                    </div>
                    <div className="flex items-center gap-2">
                        AI Agent Ready
                    </div>
                    <div className="flex items-center gap-2">
                        Cloud Deployment
                    </div>
                </div>
            </div>
        </section>
    );
};
