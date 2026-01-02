'use client';
import { useState, useRef, useEffect } from 'react';
import { services } from "@/lib/data";
import { ServicesNav } from '@/components/services-nav';
import { AnimatedHeadline } from '@/components/animated-headline';
import { TextReveal } from '@/components/text-reveal';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code, Search, Megaphone, Feather, Palette } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
    'BrainCircuit': BrainCircuit,
    'Code': Code,
    'Search': Search,
    'Megaphone': Megaphone,
    'Feather': Feather,
    'Palette': Palette,
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
                    </div>
                </div>
            </div>

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
