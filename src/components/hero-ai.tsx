'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Globe, Zap, Layout, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export function HeroAI() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black pb-12 md:pb-20">
            
            {/* Creative Glowing Backgrounds & Gradients */}
            <div className="absolute inset-0 z-0">
                {/* Radial Glow Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[radial-gradient(circle,rgba(242,106,46,0.12)_0%,transparent_60%)] pointer-events-none" />
                
                {/* Noise/Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                {/* Shifting Gradient Glow 1 */}
                <motion.div 
                    animate={{ 
                        x: [0, 40, -40, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 md:top-20 md:left-20 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-primary/10 blur-[90px] md:blur-[140px] rounded-full opacity-30 md:opacity-40" 
                />

                {/* Shifting Gradient Glow 2 */}
                <motion.div 
                    animate={{ 
                        x: [0, -40, 40, 0],
                        y: [0, 30, -30, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-purple-600/10 blur-[90px] md:blur-[140px] rounded-full opacity-20 md:opacity-30" 
                />

                {/* Cybernetic Tech Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] opacity-40" />
            </div>
            {/* Navigation Header Spacer to prevent overlap on all devices */}
            <div className="h-32 sm:h-36 md:h-44 w-full shrink-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
                    
                    {/* Left Column: Heading, Info, Actions */}
                    <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                        
                        {/* Interactive Sparkle/Launch Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-primary text-xs md:text-sm font-mono hover:bg-primary/10 transition-colors cursor-pointer group mx-auto lg:mx-0"
                        >
                            <Cpu className="w-4 h-4 animate-spin [animation-duration:8s] text-accent" />
                            <span>SaaSNext AI Business OS v5.0</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </motion.div>

                        {/* Title with Gradient Highlights */}
                        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
                            Stop Buying Websites.<br />
                            Run Your Business on an<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-purple-500 animate-pulse [animation-duration:4s]">
                                AI Operating System.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            We build high-performance Next.js custom interfaces, custom autonomous AI agents, and Generative Engine Optimization (GEO) strategies to skyrocket your growth in Gujarat, USA, UK, and Dubai. 
                        </p>

                        {/* Actions: Book slot (Primary) and Client Login */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                            <Button
                                asChild
                                size="lg"
                                className="text-base font-bold px-8 py-7 bg-accent hover:bg-accent/90 text-white rounded-xl shadow-[0_0_25px_rgba(242,106,46,0.25)] border border-accent/20 hover:shadow-[0_0_35px_rgba(242,106,46,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5"
                            >
                                <Link href="/book">
                                    <Calendar className="w-5 h-5" />
                                    Book Strategy Slot <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                            
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="text-base font-bold px-8 py-7 border-white/10 bg-white/[0.02] text-white hover:bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300"
                            >
                                <Link href="/login">Explore Client Portal</Link>
                            </Button>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/5 pt-8 max-w-md mx-auto lg:mx-0">
                            <div className="space-y-1">
                                <div className="text-xl sm:text-3xl font-black text-white">99.9%</div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">LLM Citation</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-xl sm:text-3xl font-black text-white">24/7</div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Agent Active</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-xl sm:text-3xl font-black text-white">10X</div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Workflow ROI</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Creative Interactive Dashboard Card Grid (Now fully visible and centered on mobile!) */}
                    <div className="lg:col-span-5 relative w-full max-w-md md:max-w-lg mx-auto lg:max-w-none mt-8 lg:mt-0">
                        
                        {/* Glow Behind Visuals */}
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-orange-400/20 blur-2xl rounded-[2.5rem] opacity-70 pointer-events-none" />

                        {/* Visuals Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10 p-6 md:p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.005] backdrop-blur-2xl shadow-2xl"
                        >
                            {/* Visual Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                
                                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary/30 space-y-3 group hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm">AI Agents</h3>
                                    <p className="text-[11px] text-neutral-400 leading-normal">Custom LLM support & sales digital workforces.</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10 hover:border-purple-500/30 space-y-3 group hover:bg-purple-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm">Automation</h3>
                                    <p className="text-[11px] text-neutral-400 leading-normal">Zero-touch operations & backend systems.</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 space-y-3 group hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                        <Layout className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm">Web Interfaces</h3>
                                    <p className="text-[11px] text-neutral-400 leading-normal">High-performance custom React/Next.js apps.</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 space-y-3 group hover:bg-orange-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:scale-110 transition-transform">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm">AEO & Citations</h3>
                                    <p className="text-[11px] text-neutral-400 leading-normal">Rank #1 in Google AI Overviews & SearchGPT.</p>
                                </div>

                            </div>
                        </motion.div>

                        {/* Floating Status Indicator */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -left-4 px-4 py-2.5 rounded-xl bg-black/90 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-20 flex items-center gap-2.5"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] uppercase tracking-widest font-mono text-white">AI Engine Sync Active</span>
                        </motion.div>

                        {/* Decorative background glows around dashboard */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-50" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/20 blur-2xl rounded-full opacity-50" />
                    </div>

                </div>
            </div>
        </section>
    );
}
