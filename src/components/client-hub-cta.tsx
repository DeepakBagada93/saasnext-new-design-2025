'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Zap } from "lucide-react";
import Link from "next/link";

export function ClientHubCTA() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background with gradient and grid */}
            <div className="absolute inset-0 bg-neutral-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
                >
                    <Zap className="w-4 h-4" />
                    <span>Instant Access to Services</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-headline text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                >
                    Unlock Your <span className="text-primary">Growth Engine.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Ready to scale? Log in to the <strong className="text-white">Client Hub</strong> to instantly add new services, track your project progress, and communicate with your dedicated team.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] transition-all duration-300"
                    >
                        <Link href="/login" className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Login to Client Hub
                        </Link>
                    </Button>
                    <span className="text-neutral-500 text-sm">
                        Already a client? <Link href="/login" className="text-primary hover:underline">Sign in here</Link>
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
