"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Clock, Target, Zap, ArrowRight, Star } from "lucide-react";
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
        <section id="pricing" className="py-24 md:py-32 bg-neutral-950 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Strategic Systems</span>
                        </div>
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
                            Choose Your <span className="text-accent">System</span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-medium">
                            Premium AI-powered digital infrastructure designed to automate, convert, and scale.
                        </p>
                    </motion.div>
                </div>

                {/* Horizontal Tab Navigation */}
                <div className="relative mb-12 md:mb-20">
                    <div className="flex flex-nowrap overflow-x-auto pb-4 md:pb-0 scrollbar-hide gap-2 md:gap-4 justify-start md:justify-center px-4 md:px-0">
                        {packages.map((plan, index) => (
                            <button
                                key={plan.id}
                                onClick={() => setActiveTab(index)}
                                className={cn(
                                    "relative px-6 py-4 rounded-2xl transition-all duration-300 whitespace-nowrap border text-sm font-bold uppercase tracking-widest",
                                    activeTab === index 
                                        ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                                        : "bg-white/5 text-neutral-500 border-white/5 hover:border-white/20 hover:text-white"
                                )}
                            >
                                {plan.title.split(' — ')[1] || plan.title}
                                {activeTab === index && (
                                    <motion.div 
                                        layoutId="tab-glow"
                                        className="absolute inset-0 rounded-2xl bg-white/20 blur-xl -z-10"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Plan Detail View */}
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPlan.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full"
                        >
                            <Card className="border-white/10 bg-neutral-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                                <div className="grid lg:grid-cols-[1fr_0.8fr]">
                                    {/* Left Side: Info & Features */}
                                    <div className="p-8 md:p-12 lg:p-16 space-y-12">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
                                                    <Zap className="w-8 h-8 text-accent" />
                                                </div>
                                                <div>
                                                  <h3 className="text-3xl md:text-4xl font-bold font-headline text-white">{currentPlan.title}</h3>
                                                  {currentPlan.popular && (
                                                    <Badge variant="popular" className="mt-2" />
                                                  )}
                                                </div>
                                            </div>
                                            <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
                                                {currentPlan.description}
                                            </p>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-8 py-8 border-y border-white/5">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-accent">
                                                    <Clock className="w-5 h-5" />
                                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Execution Timeline</span>
                                                </div>
                                                <p className="text-2xl font-bold text-white">{currentPlan.timeline}</p>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-emerald-400">
                                                    <Target className="w-5 h-5" />
                                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Defined Outcome</span>
                                                </div>
                                                <p className="text-lg text-neutral-300 font-medium leading-snug">{currentPlan.outcome}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-500">System Capabilities</p>
                                            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-12">
                                                {(currentPlan.features || []).map((feature) => (
                                                    <div key={feature} className="flex items-start gap-4 group">
                                                        <CheckCircle className="mt-1 h-4 w-4 text-accent shrink-0" />
                                                        <span className="text-neutral-300 group-hover:text-white transition-colors">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Pricing & CTA */}
                                    <div className="bg-white/[0.03] border-l border-white/10 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
                                        
                                        <div className="space-y-8">
                                            <div className="space-y-2">
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">Investment</span>
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-6xl font-bold text-white tracking-tighter">
                                                        {currentPlan.price.replace('Starting From ', '')}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest mt-2">
                                                    APPROX {currentPlan.price_usd} USD
                                                </p>
                                            </div>

                                            <div className="space-y-4 rounded-2xl bg-white/5 border border-white/5 p-6 backdrop-blur-md">
                                                <p className="text-sm text-neutral-300 leading-relaxed italic">
                                                    "A high-performance digital system that pays for itself through automation and conversion."
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-12">
                                            <Button asChild className="w-full h-16 text-lg font-black uppercase tracking-widest shadow-2xl transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] bg-accent text-white border-none">
                                                <Link href="/login">
                                                    {currentPlan.cta}
                                                    <ArrowRight className="ml-3 h-5 w-5" />
                                                </Link>
                                            </Button>
                                            <p className="text-center text-xs text-neutral-500 font-bold uppercase tracking-widest">
                                                No hidden costs • Expert Delivery
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const Badge = ({ variant, className }: { variant: string, className?: string }) => {
    if (variant === 'popular') {
        return (
            <div className={cn("inline-flex items-center bg-accent text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg", className)}>
                Most Popular
            </div>
        );
    }
    return null;
}
