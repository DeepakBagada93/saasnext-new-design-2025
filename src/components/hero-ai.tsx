'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Globe, Zap, Sparkles, Layout } from "lucide-react";
import Link from "next/link";

export function HeroAI() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,171,226,0.15),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
                
                {/* Moving Glows */}
                <motion.div 
                    animate={{ 
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30" 
                />
                <motion.div 
                    animate={{ 
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full opacity-30" 
                />

                {/* Animated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary text-sm font-mono mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>NEXT-GEN AI & WEB AUTOMATION</span>
                        </motion.div>

                        <h1 className="font-headline text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                            Automate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-600">
                                Digital Growth.
                            </span>
                        </h1>

                        <p className="text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed">
                            We build custom AI Agents, intelligent automation workflows, and high-performance web applications that convert visitors into loyal customers.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="text-lg px-8 py-7 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-[0_0_20px_rgba(41,171,226,0.3)]"
                            >
                                <Link href="/login">
                                    Explore Client Portal <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-7 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm"
                            >
                                <Link href="/services">View Our Services</Link>
                            </Button>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-white">99%</div>
                                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono">Uptime Guarantee</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-white">24/7</div>
                                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono">AI Support</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-white">10x</div>
                                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono">Efficiency Boost</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-4 group hover:bg-primary/20 transition-colors">
                                    <Bot className="w-10 h-10 text-primary" />
                                    <h3 className="text-white font-bold">AI Agents</h3>
                                    <p className="text-xs text-neutral-400">Custom LLM-powered agents for support & sales.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-4 group hover:bg-purple-500/20 transition-colors">
                                    <Zap className="w-10 h-10 text-purple-400" />
                                    <h3 className="text-white font-bold">Automation</h3>
                                    <p className="text-xs text-neutral-400">Streamline workflows with zero-touch processes.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-4 group hover:bg-blue-500/20 transition-colors">
                                    <Layout className="w-10 h-10 text-blue-400" />
                                    <h3 className="text-white font-bold">Web Apps</h3>
                                    <p className="text-xs text-neutral-400">High-performance Next.js 15 applications.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 space-y-4 group hover:bg-orange-500/20 transition-colors">
                                    <Globe className="w-10 h-10 text-orange-400" />
                                    <h3 className="text-white font-bold">SEO/AEO</h3>
                                    <p className="text-xs text-neutral-400">Optimized for search and AI answer engines.</p>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/20 blur-3xl rounded-full" />
                        </motion.div>
                        
                        {/* Floating Stats */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 p-4 rounded-xl bg-black border border-white/10 shadow-2xl z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono text-white">AI Engine Online</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
