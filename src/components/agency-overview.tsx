'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/text-reveal';

export function AgencyOverview() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Headline */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <h2 className="font-headline text-4xl md:text-6xl font-bold leading-tight mb-6">
                                More Than Just <br />
                                <span className="text-primary">A Digital Agency.</span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-md">
                                We are your strategic growth partners in Junagadh, dedicated to transforming your digital presence into a revenue-generating asset.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Detailed Content */}
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold font-headline">Strategic Partnership</h3>
                            <TextReveal>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    In the crowded digital landscape of Junagadh, standing out requires more than just a website. It demands a comprehensive strategy.
                                    At SaaSNext, we don't just execute tasks; we align our <strong>web development</strong> and <strong>digital marketing</strong> efforts
                                    with your core business objectives. We act as an extension of your team, ensuring every pixel and every post contributes to your bottom line.
                                </p>
                            </TextReveal>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold font-headline">Data-Driven Results</h3>
                            <TextReveal>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Guesswork has no place in modern business. As a leading <strong>SEO company in Junagadh</strong>, we rely on hard data to drive our decisions.
                                    From analyzing user behavior on your custom website to optimizing ad spend for maximum ROI, our approach is scientific and transparent.
                                    We provide clear, actionable insights that show exactly how our <strong>AI solutions</strong> and marketing campaigns are fueling your growth.
                                </p>
                            </TextReveal>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold font-headline">Local Expertise, Global Standards</h3>
                            <TextReveal>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Understanding the local market in Junagadh gives us a unique advantage, but we don't stop there. We bring global standards of design
                                    and technology to local businesses. Whether you need an <strong>ecommerce website</strong> to sell globally or <strong>local SEO</strong>
                                    to dominate the neighborhood, we deliver world-class quality that elevates your brand above the competition.
                                </p>
                            </TextReveal>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
