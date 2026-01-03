'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CreativeHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Animated SVG Circuit/Neural Network */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0,50 Q200,150 400,50 T800,50"
                        fill="none"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                    />
                    <motion.path
                        d="M0,200 Q300,50 600,200 T1200,200"
                        fill="none"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatType: "loop", delay: 1 }}
                    />
                    <motion.path
                        d="M0,400 Q400,200 800,400 T1600,400"
                        fill="none"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatType: "loop", delay: 2 }}
                    />
                    {/* Floating Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={Math.random() * 100 + "%"}
                            cy={Math.random() * 100 + "%"}
                            r={Math.random() * 3}
                            fill="#f97316"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: [0, 1, 0], y: -100 }}
                            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                        />
                    ))}
                </svg>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-sm font-medium mb-8 hover:bg-white/10 transition-colors"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>AI-Powered Digital Transformation</span>
                </motion.div>

                <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 leading-tight">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="block"
                    >
                        Building Your
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-purple-600 animate-gradient-x"
                    >
                        Digital Future.
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    SaaSNext is the premier web design and AI agency in Junagadh. We fuse creativity with code to build engines of growth for your business.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-300"
                    >
                        <Link href="/contact">
                            Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-6 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                    >
                        <Link href="/portfolio">View Our Work</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
