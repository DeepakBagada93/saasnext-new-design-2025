"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Clock, Target, Zap, ArrowRight, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePackages, Package } from "@/hooks/use-packages";
import { cn } from "@/lib/utils";

export const Pricing = () => {
    const { packages, isLoading } = usePackages();
    const [activeTab, setActiveTab] = useState(0);

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

    const currentPlan = packages[activeTab] || packages[0];

    return (
        <section id="pricing" className="py-24 md:py-40 bg-neutral-950 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full -z-10" />

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="max-w-3xl mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Scalable Infrastructure</span>
                        </div>
                        <h2 className="font-headline text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">
                            The <span className="text-accent">Systems</span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-medium max-w-2xl">
                            We don't just build websites. We engineer automated digital systems that generate revenue while you sleep.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-start">
                    {/* Left Column: Plan Selection List */}
                    <div className="space-y-4 sticky top-32">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-600 mb-6 ml-2">Select Your Tier</p>
                        {packages.map((plan, index) => (
                            <button
                                key={plan.id}
                                onClick={() => setActiveTab(index)}
                                className={cn(
                                    "w-full group relative flex flex-col items-start p-6 rounded-3xl transition-all duration-500 border text-left",
                                    activeTab === index 
                                        ? "bg-white border-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] scale-[1.02] z-20" 
                                        : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04] z-10"
                                )}
                            >
                                <div className="flex w-full items-center justify-between mb-2">
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest",
                                        activeTab === index ? "text-accent" : "text-neutral-500"
                                    )}>
                                        System {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {plan.popular && (
                                        <Star className={cn("w-3 h-3", activeTab === index ? "text-accent fill-accent" : "text-neutral-700")} />
                                    )}
                                </div>
                                <h3 className={cn(
                                    "text-xl md:text-2xl font-bold font-headline transition-colors",
                                    activeTab === index ? "text-black" : "text-neutral-400 group-hover:text-white"
                                )}>
                                    {plan.title.split(' — ')[1] || plan.title}
                                </h3>
                                <p className={cn(
                                    "text-sm mt-2 line-clamp-1 font-medium",
                                    activeTab === index ? "text-neutral-600" : "text-neutral-600 group-hover:text-neutral-400"
                                )}>
                                    {plan.outcome}
                                </p>

                                {activeTab === index && (
                                    <motion.div 
                                        layoutId="sidebar-accent"
                                        className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-accent rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Dynamic Interactive Content */}
                    <div className="relative min-h-[600px] lg:min-h-[750px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPlan.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="h-full"
                            >
                                <Card className="h-full border-white/10 bg-neutral-900/40 backdrop-blur-2xl shadow-3xl overflow-hidden flex flex-col">
                                    {/* Card Header Section */}
                                    <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-3 bg-accent/10 rounded-2xl border border-accent/20">
                                                        <Zap className="w-6 h-6 text-accent" />
                                                    </div>
                                                    <h3 className="text-3xl md:text-5xl font-bold font-headline text-white tracking-tight">
                                                        {currentPlan.title.split(' — ')[1] || currentPlan.title}
                                                    </h3>
                                                </div>
                                                <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
                                                    {currentPlan.description}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 block mb-2">Base Investment</span>
                                                <div className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                                                    {currentPlan.price.replace('Starting From ', '')}
                                                </div>
                                                <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-2">
                                                    ~ {currentPlan.price_usd} USD
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body: Features & Metrics */}
                                    <div className="p-8 md:p-12 flex-grow grid md:grid-cols-2 gap-12">
                                        <div className="space-y-10">
                                            <div className="space-y-6">
                                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-500">Core Capabilities</p>
                                                <div className="grid gap-4">
                                                    {currentPlan.features.map((feature) => (
                                                        <div key={feature} className="flex items-start gap-4 group">
                                                            <div className="mt-1 flex-shrink-0">
                                                                <CheckCircle className="h-4 w-4 text-accent" />
                                                            </div>
                                                            <span className="text-sm md:text-base text-neutral-300 group-hover:text-white transition-colors">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-10">
                                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-accent">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment</span>
                                                    </div>
                                                    <p className="text-2xl font-bold text-white">{currentPlan.timeline}</p>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-emerald-400">
                                                        <Target className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Goal</span>
                                                    </div>
                                                    <p className="text-base text-neutral-300 font-medium leading-relaxed italic">
                                                        "{currentPlan.outcome}"
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <Button asChild className="w-full h-16 text-lg font-black uppercase tracking-widest transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] bg-accent text-white border-none shadow-[0_20px_40px_rgba(242,106,46,0.2)]">
                                                    <Link href="/login">
                                                        {currentPlan.cta}
                                                        <ArrowRight className="ml-3 h-5 w-5" />
                                                    </Link>
                                                </Button>
                                                <p className="text-center text-[10px] text-neutral-600 font-bold uppercase tracking-[0.3em] mt-6">
                                                    Secure Payment • Expert Support
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
