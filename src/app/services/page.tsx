'use client';
import { useState, useRef, useEffect } from 'react';
import { services } from "@/lib/data";
import { ServicesNav } from '@/components/services-nav';
import { AnimatedHeadline } from '@/components/animated-headline';
import { TextReveal } from '@/components/text-reveal';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code, Search, Megaphone, Feather } from 'lucide-react';
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
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Header Section */}
            <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-32">
                <div className="max-w-5xl mx-auto">
                    <AnimatedHeadline
                        words={['Impact', 'Growth', 'Future']}
                        prefix="We Build Digital"
                        suffix="."
                        className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                    />
                    <TextReveal>
                        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                            SaaSNext is more than a digital agency; we are your strategic partner in Junagadh.
                            We fuse creativity with technology to deliver <strong>web development</strong>,
                            <strong> AI solutions</strong>, and <strong>performance marketing</strong> that
                            doesn't just look good—it dominates the market.
                        </p>
                    </TextReveal>
                </div>
            </section>

            <div className="px-4 sm:px-6 lg:px-8 pb-32">
                <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-20">
                    {/* Sticky Navigation */}
                    <aside className="hidden lg:block lg:col-span-3 relative">
                        <div className="sticky top-32">
                            <ServicesNav services={services} activeService={activeService} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-32">
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
                                    <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                                        <div className="flex items-center gap-4 mb-4 text-primary">
                                            <Icon className="w-8 h-8" />
                                            <span className="text-sm font-mono uppercase tracking-widest">0{index + 1} / Service</span>
                                        </div>
                                        <h2 className="font-headline text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </h2>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <TextReveal>
                                                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </TextReveal>

                                            <div className="bg-neutral-100 dark:bg-neutral-900 p-8 rounded-2xl">
                                                <h3 className="text-xl font-bold mb-4">Our Process</h3>
                                                <p className="text-neutral-600 dark:text-neutral-400">{service.process}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">Key Benefits</h3>
                                                <p className="text-neutral-600 dark:text-neutral-400 pl-5">{service.benefits}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">Real Results</h3>
                                                <p className="text-neutral-600 dark:text-neutral-400 pl-5">{service.results}</p>
                                            </div>

                                            <div className="pt-8">
                                                <Link
                                                    href="/contact"
                                                    className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-colors group/link"
                                                >
                                                    Start Project
                                                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}

                        {/* Why Productized Section */}
                        <section className="py-20 bg-primary/5 border-y border-primary/10 rounded-3xl">
                            <div className="px-8 space-y-12">
                                <div className="grid md:grid-cols-2 gap-16 items-start">
                                    <div>
                                        <h2 className="font-headline text-4xl font-bold mb-8">Why Our Productized Packages Work Better</h2>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Clear Deliverables", desc: "You know exactly what you get, when you'll get it, and how much it costs." },
                                                { title: "Faster Buying Decisions", desc: "No long-winded negotiations. Pick a package that fits and we start immediately." },
                                                { title: "Higher Perceived Value", desc: "Our systems are built on proven frameworks that deliver predictable results." },
                                                { title: "Professional Positioning", desc: "We operate as a partner, providing digital assets that grow with your business." }
                                            ].map((benefit, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="bg-primary/20 p-2 rounded-lg h-fit">
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl space-y-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                                        <h3 className="text-2xl font-bold font-headline">Optional Add-Ons</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                "AI Chatbot Integration",
                                                "Custom Brand Identity",
                                                "SEO Content Package",
                                                "Email Marketing Setup",
                                                "AI Automation Workflows",
                                                "Analytics Dashboard"
                                            ].map((addon, i) => (
                                                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    <span>{addon}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-neutral-400 italic">
                                            * Add-ons can be integrated into any package to supercharge your results.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Industries We Serve */}
            <section className="py-20 md:py-28 bg-white dark:bg-black">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold">Industries We Transform</h2>
                        <TextReveal>
                            <p className="mt-4 text-muted-foreground text-lg">We bring deep domain expertise to a variety of sectors, delivering tailored solutions that solve real business challenges.</p>
                        </TextReveal>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { name: "Healthcare", icon: "🏥" },
                            { name: "E-commerce", icon: "🛍️" },
                            { name: "Real Estate", icon: "🏠" },
                            { name: "Education", icon: "🎓" },
                            { name: "Manufacturing", icon: "🏭" },
                            { name: "Finance", icon: "💰" },
                            { name: "Hospitality", icon: "🏨" },
                            { name: "Startups", icon: "🚀" }
                        ].map((industry) => (
                            <div key={industry.name} className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-center hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{industry.icon}</div>
                                <h3 className="font-bold text-lg">{industry.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service FAQs */}
            <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
                <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Common Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-lg mb-2">Do you offer custom web development?</h3>
                            <p className="text-muted-foreground">Yes, we specialize in custom solutions using Next.js and React, tailored to your specific business requirements.</p>
                        </div>
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-lg mb-2">How do your AI solutions work?</h3>
                            <p className="text-muted-foreground">We integrate AI agents and automation workflows directly into your existing systems to automate repetitive tasks and improve efficiency.</p>
                        </div>
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-lg mb-2">What is included in your SEO services?</h3>
                            <p className="text-muted-foreground">Our SEO packages include technical audits, keyword research, on-page optimization, content strategy, and local SEO for Junagadh businesses.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Footer Section */}
            <section className="bg-neutral-900 text-white py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8">
                        Ready to Dominate Your Market?
                    </h2>
                    <TextReveal>
                        <p className="text-xl text-neutral-400 mb-12">
                            Whether you need a cutting-edge website, an AI-powered automation system, or a high-ROI marketing campaign,
                            SaaSNext is the <strong>best digital marketing agency in Junagadh</strong> to make it happen.
                            Stop competing and start leading.
                        </p>
                    </TextReveal>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 transition-colors"
                    >
                        Get Your Free Strategy Session
                    </Link>
                </div>
            </section>
        </div>
    );
}
