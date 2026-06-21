'use client';
import { useState, useRef, useEffect } from 'react';
import { services } from "@/lib/data";
import { ServicesNav } from '@/components/services-nav';
import { AnimatedHeadline } from '@/components/animated-headline';
import { TextReveal } from '@/components/text-reveal';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code, Search, Megaphone, Feather, Layout } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
    'BrainCircuit': BrainCircuit,
    'Code': Code,
    'Search': Search,
    'Megaphone': Megaphone,
    'Feather': Feather,
};

export default function ServicesPage() {
    const [activeService, setActiveService] = useState<string>(services[0].slug);
    const serviceRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveService(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -50% 0px' }
        );

        const currentRefs = serviceRefs.current.filter(ref => ref !== null);
        currentRefs.forEach(ref => observer.observe(ref!));

        return () => {
            currentRefs.forEach(ref => observer.unobserve(ref!));
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
            {/* Immersive Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,106,46,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                
                <motion.div 
                    animate={{ 
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full" 
                />
            </div>

            {/* Header Section */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-48 md:pb-40">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm text-accent text-sm font-mono mb-8"
                    >
                        <span>PREMIUM DIGITAL SOLUTIONS</span>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-end">
                        <AnimatedHeadline
                            words={['Impact', 'Growth', 'Future']}
                            prefix="We Build Digital"
                            suffix="."
                            className="font-headline text-5xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]"
                        />
                        <TextReveal>
                            <p className="text-xl md:text-2xl text-neutral-400 max-w-xl leading-relaxed">
                                SaaSNext fuses creativity with high-end technology to deliver solutions that don't just look good—they <strong>dominate</strong>.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
                <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-20">
                    {/* Sticky Navigation */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32">
                            <ServicesNav services={services} activeService={activeService} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-48">
                        {services.map((service, index) => {
                            const Icon = iconMap[service.icon] || Code;
                            return (
                                <section
                                    key={service.slug}
                                    id={service.slug}
                                    ref={(el) => { serviceRefs.current[index] = el; }}
                                    className="scroll-mt-32 group"
                                >
                                    {/* Service Header */}
                                    <div className="mb-16">
                                        <div className="flex items-center gap-4 mb-6 text-accent">
                                            <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <span className="text-sm font-mono uppercase tracking-[0.3em] opacity-50">0{index + 1} / {service.title}</span>
                                        </div>
                                        <h2 className="font-headline text-5xl md:text-7xl font-bold text-white group-hover:text-accent transition-colors duration-500">
                                            {service.title}
                                        </h2>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-5 gap-12 lg:gap-20">
                                        <div className="md:col-span-3 space-y-12">
                                            <TextReveal>
                                                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">
                                                    {service.description}
                                                </p>
                                            </TextReveal>

                                            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group/card hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
                                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                                    <Layout className="w-5 h-5 text-accent" />
                                                    The Framework
                                                </h3>
                                                <p className="text-neutral-400 leading-relaxed italic">"{service.process}"</p>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-12">
                                            <div className="space-y-6">
                                                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Key Benefits</h3>
                                                <div className="space-y-4">
                                                    {service.benefits.split(',').map((benefit: string, i: number) => (
                                                        <motion.div 
                                                            key={i}
                                                            whileHover={{ x: 10 }}
                                                            className="flex items-center gap-3 group/item"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                            <span className="text-neutral-300 group-hover/item:text-white transition-colors">{benefit.trim()}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/10">
                                                <Link
                                                    href="/contact"
                                                    className="inline-flex items-center gap-4 text-xl font-bold text-white hover:text-accent transition-all group/link"
                                                >
                                                    Initialize Project
                                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/link:bg-accent group-hover/link:border-accent transition-all duration-300">
                                                        <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}

                        {/* Why Productized Section */}
                        <section className="relative py-24 px-8 md:px-16 rounded-[3rem] border border-white/10 bg-gradient-to-br from-accent/10 via-transparent to-purple-500/5 overflow-hidden group">
                            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
                            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <h2 className="font-headline text-4xl md:text-6xl font-bold mb-10 text-white">Why Our <br/><span className="text-accent">Packages</span> Win.</h2>
                                    <div className="grid gap-8">
                                        {[
                                            { title: "Zero Guesswork", desc: "Clear deliverables, fixed pricing, and predictable timelines." },
                                            { title: "Rapid Deployment", desc: "Built on high-performance frameworks for immediate impact." },
                                            { title: "Market Dominance", desc: "SEO & AI integration built into the core of every system." },
                                        ].map((benefit, i) => (
                                            <div key={i} className="flex gap-6">
                                                <div className="text-accent font-mono text-xl opacity-50">0{i+1}</div>
                                                <div>
                                                    <h4 className="font-bold text-xl text-white mb-2">{benefit.title}</h4>
                                                    <p className="text-neutral-400">{benefit.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-8">
                                    <h3 className="text-2xl font-bold font-headline text-white flex items-center gap-3">
                                        Performance Add-Ons
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            "AI Chatbot Pro",
                                            "Dynamic SEO Core",
                                            "AEO Optimization",
                                            "Custom API Bridge",
                                            "Neural Workflows",
                                            "Insight Dashboards"
                                        ].map((addon, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-accent" />
                                                <span className="text-sm font-medium">{addon}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Service FAQs */}
            <section className="relative z-10 py-32 bg-black">
                <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Knowledge Base</span>
                        <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mt-4">Common Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "Do you offer custom web development?", a: "Yes, we specialize in high-performance Next.js 15 systems tailored for conversion and scale." },
                            { q: "How do your AI solutions work?", a: "We build custom LLM agents and neural workflows that integrate directly into your business stack." },
                            { q: "What is included in your SEO services?", a: "Full technical SEO, AEO (AI Engine Optimization), and conversion-focused content strategies." }
                        ].map((faq, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                <h3 className="font-bold text-xl text-white mb-4">{faq.q}</h3>
                                <p className="text-neutral-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

