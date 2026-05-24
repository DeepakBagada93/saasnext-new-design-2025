'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

type PortfolioItem = {
    id: string;
    title: string;
    image: {
        imageUrl: string;
        imageHint: string;
    };
    niche: string;
    url: string;
};

export function PortfolioGallery({ items, showFilters = true }: { items: PortfolioItem[], showFilters?: boolean }) {
    const [filter, setFilter] = useState('All');
    
    const niches = ['All', ...Array.from(new Set(items.map(item => item.niche)))];
    const filteredItems = filter === 'All' ? items : items.filter(item => item.niche === filter);

    return (
        <div>
            {showFilters && (
                <div className="flex justify-center flex-wrap gap-2 mb-10 md:mb-12">
                    {niches.map(niche => (
                        <button
                            key={niche}
                            onClick={() => setFilter(niche)}
                            className={cn(
                                "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border",
                                filter === niche
                                    ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(242,106,46,0.3)]"
                                    : "bg-white/[0.03] border-white/5 text-neutral-500 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {niche}
                        </button>
                    ))}
                </div>
            )}

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={`/portfolio/${item.id}`}
                                className="group block"
                            >
                                <div className="relative rounded-[1.5rem] overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.04]">
                                    <div className="aspect-[4/3] w-full overflow-hidden">
                                        <Image
                                            src={item.image.imageUrl}
                                            alt={item.title}
                                            data-ai-hint={item.image.imageHint}
                                            width={600}
                                            height={450}
                                            loading="lazy"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-headline text-sm sm:text-base font-bold text-white truncate group-hover:text-accent transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-1.5">
                                                    {item.niche}
                                                </p>
                                            </div>
                                            <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                                                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-accent transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
