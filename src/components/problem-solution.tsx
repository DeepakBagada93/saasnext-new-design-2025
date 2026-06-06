"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export const ProblemSolution = () => {
    return (
        <section className="py-20 md:py-32 bg-neutral-950 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hook */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        Your business is great, <br /> but your systems are manual.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-neutral-400 max-w-2xl mx-auto"
                    >
                        In the age of AI, running a business with static websites and manual spreadsheets is like racing a supercar on a bicycle.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-red-950/20 border border-red-900/50 p-8 rounded-3xl relative"
                    >
                        <div className="absolute -top-6 -left-6 bg-red-500 rounded-full p-4 shadow-lg shadow-red-500/20">
                            <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-red-200">The Growth Bottleneck</h3>
                        <ul className="space-y-4">
                            {[
                                "Static websites that don't capture leads",
                                "Manual follow-ups that miss opportunities",
                                "Scattered data across multiple subscriptions",
                                "Repetitive tasks killing your productivity"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-red-100/80">
                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-emerald-950/20 border border-emerald-900/50 p-8 rounded-3xl relative"
                    >
                        <div className="absolute -top-6 -right-6 bg-emerald-500 rounded-full p-4 shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-emerald-200">The AI OS Advantage</h3>
                        <ul className="space-y-4">
                            {[
                                "Autonomous AI Agents working 24/7",
                                "Unified Dashboard for all operations",
                                "Automated Lead Capture & Growth",
                                "One Subscription, Infinite Scalability"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-emerald-100/80">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
