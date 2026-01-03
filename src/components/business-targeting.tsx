'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/text-reveal';

export function BusinessTargeting() {
    return (
        <div className="bg-background">
            {/* Section 1: Visibility */}
            <section className="py-24 md:py-32 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            Visibility
                        </motion.span>
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            Dominate Your Niche.
                        </h2>
                        <TextReveal>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                In a world of noise, being seen is everything. We craft <strong>SEO strategies</strong> and <strong>brand identities</strong> that don't just put you on the map—they make you the landmark.
                                Stop chasing visibility and start commanding attention in the Junagadh market and beyond.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            {/* Section 2: Engagement */}
            <section className="py-24 md:py-32 border-b border-border/40 bg-card/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
                    <div className="max-w-4xl text-right">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            Engagement
                        </motion.span>
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            Captivate & Convert.
                        </h2>
                        <TextReveal>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                Traffic is vanity; conversion is sanity. Our <strong>web designs</strong> are engineered to turn casual browsers into loyal customers.
                                With intuitive UI/UX and compelling storytelling, we build digital experiences that resonate, engage, and drive action.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            {/* Section 3: Automation */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            Automation
                        </motion.span>
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            Scale Without Limits.
                        </h2>
                        <TextReveal>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                Growth shouldn't break your operations. We implement cutting-edge <strong>AI Agents</strong> and <strong>custom software solutions</strong> that automate the mundane,
                                freeing you to focus on strategy. Build a business that runs efficiently 24/7, even when you're sleeping.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
