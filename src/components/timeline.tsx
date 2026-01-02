"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Code, Rocket, TrendingUp } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Discovery",
        description: "We dive deep into your business goals, target audience, and competitors to build a solid foundation."
    },
    {
        icon: Lightbulb,
        title: "Strategy",
        description: "We craft a tailored roadmap, selecting the right tech stack and marketing channels for maximum impact."
    },
    {
        icon: Code,
        title: "Development",
        description: "Our experts build your solution using cutting-edge technologies, ensuring speed, security, and scalability."
    },
    {
        icon: Rocket,
        title: "Launch",
        description: "We execute a flawless launch, monitoring performance and ensuring everything runs smoothly."
    },
    {
        icon: TrendingUp,
        title: "Growth",
        description: "We don't stop at launch. We continuously optimize and scale your digital presence for long-term success."
    }
];

export const Timeline = () => {
    return (
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Your Journey with SaaSNext</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From concept to market dominance, we guide you through every step of the digital transformation process.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-200 dark:bg-neutral-800 hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2 text-center md:text-left">
                                    <div className={`p-6 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>

                                {/* Icon Center */}
                                <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground shadow-lg z-10 shrink-0">
                                    <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                                </div>

                                {/* Empty Side */}
                                <div className="flex-1 w-full md:w-1/2 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
