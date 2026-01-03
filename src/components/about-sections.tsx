'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/text-reveal';

export function AboutSections() {
    return (
        <div className="bg-background">
            {/* Section 1: The Beginning */}
            <section className="py-20 md:py-28 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            The Beginning
                        </motion.span>
                        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            Roots in Junagadh.
                        </h2>
                        <TextReveal>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                SaaSNext started in a small office in Junagadh with a simple belief: local businesses deserve world-class technology.
                                We saw incredible potential in our community but noticed a gap in digital adoption. We set out to bridge that gap,
                                bringing Silicon Valley-grade <strong>web development</strong> and <strong>AI solutions</strong> to the heart of Gujarat.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            {/* Section 2: The Mission */}
            <section className="py-20 md:py-28 border-b border-border/40 bg-card/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
                    <div className="max-w-4xl text-right">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            The Mission
                        </motion.span>
                        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            Empowering Growth.
                        </h2>
                        <TextReveal>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Our mission is to democratize access to advanced digital tools. We believe that every business, regardless of size,
                                should have the power to automate, scale, and compete globally. We are not just building websites; we are building
                                engines of growth for the next generation of Junagadh's entrepreneurs.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            {/* Section 3: The Approach */}
            <section className="py-20 md:py-28 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            The Approach
                        </motion.span>
                        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            Partnership First.
                        </h2>
                        <TextReveal>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                We reject the transactional client-vendor model. At SaaSNext, we become your strategic partners. We take the time
                                to understand your unique challenges, your market, and your vision. Your success is our success, and we work
                                tirelessly to ensure our <strong>digital marketing strategies</strong> deliver tangible ROI.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            {/* Section 4: The Future */}
            <section className="py-20 md:py-28 bg-card/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
                    <div className="max-w-4xl text-right">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-wider uppercase mb-4 block"
                        >
                            The Future
                        </motion.span>
                        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            Innovating with AI.
                        </h2>
                        <TextReveal>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                The digital landscape is shifting, and AI is at the forefront. We are committed to staying ahead of the curve,
                                continuously integrating the latest <strong>AI agents</strong> and automation technologies into our services.
                                With SaaSNext, you're not just keeping up with the future; you're defining it.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
