'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-primary text-primary-foreground">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" width="100%" height="100%">
                    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            </div>

            {/* Animated Shapes */}
            <motion.div
                className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -50, 0],
                    y: [0, -100, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        Your B2B Lead Generation Company <br className="hidden md:block" /> in Junagadh
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
                        SaaSNext specializes in B2B lead generation, connecting you with high-value business clients in Junagadh and beyond.
                        We combine targeted digital marketing strategies with our custom website development to create powerful online lead generation solutions.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="text-lg px-10 py-8 bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        <Link href="/contact" className="flex items-center gap-2">
                            Start Generating Leads
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
