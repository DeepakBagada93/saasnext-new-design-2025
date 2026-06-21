'use client';
import { notFound } from 'next/navigation';
import { portfolioItems } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Activity, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortfolioItemDetails({ portfolioItemId }: { portfolioItemId: string }) {
    const item = portfolioItems.find(p => p.id === portfolioItemId);

    if (!item) {
        notFound();
    }

    return (
        <div className="bg-neutral-950 overflow-hidden relative min-h-screen">
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f26a2e15,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Back */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm mb-8 md:mb-12 group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </Link>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] mb-8 md:mb-12"
                    >
                        <div className="aspect-[16/9] w-full overflow-hidden">
                            {item.image && (
                                <Image
                                    src={item.image.imageUrl}
                                    alt={item.title}
                                    data-ai-hint={item.image.imageHint}
                                    width={1200}
                                    height={675}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-6 md:space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="p-6 sm:p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02]"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-5">
                                    <Activity className="w-3 h-3 text-accent" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">{item.service}</span>
                                </div>
                                <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                                    {item.title}
                                </h1>

                                <div className="space-y-8 md:space-y-10">
                                    <div>
                                        <h3 className="font-headline text-sm font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Target className="w-4 h-4" />
                                            The Challenge
                                        </h3>
                                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">{item.problem}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-headline text-sm font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                                            Our Solution
                                        </h3>
                                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">{item.solution}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-headline text-sm font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Activity className="w-4 h-4" />
                                            The Results
                                        </h3>
                                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">{item.results}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="p-6 sm:p-8 rounded-[2rem] border border-white/5 bg-accent/5 relative overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[80px] rounded-full" />
                                <div className="relative z-10 space-y-6">
                                    <h3 className="font-headline text-sm font-bold text-accent uppercase tracking-widest">
                                        Project Info
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Service</p>
                                            <p className="text-sm text-white font-medium mt-1">{item.service}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Category</p>
                                            <p className="text-sm text-white font-medium mt-1">{item.niche}</p>
                                        </div>
                                    </div>
                                    {item.url && item.url !== '#' && (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 rounded-xl bg-accent text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-accent/90 transition-all"
                                        >
                                            View Live Project
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="p-6 sm:p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Tech Stack</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'].map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-500"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Next Project */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 md:mt-16 text-center"
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                        >
                            View All Projects
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
