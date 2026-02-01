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
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Your Journey with SaaSNext</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From concept to market dominance, we guide you through every step of the digital transformation process.
                    </p>
                </div>

                <div className="relative">
                    {/* Desktop Horizontal Line */}
                    <div className="hidden md:block absolute top-[28px] left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800" />
                    {/* Mobile Vertical Line */}
                    <div className="md:hidden absolute left-[28px] top-0 h-full w-1 bg-neutral-200 dark:bg-neutral-800" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8"
                            >
                                {/* Icon */}
                                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shrink-0 border-4 border-white dark:border-current">
                                    <step.icon className="w-6 h-6" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 md:text-center pt-2 md:pt-0">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
