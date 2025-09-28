
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

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
                <div className="flex justify-center flex-wrap gap-2 mb-8">
                    {niches.map(niche => (
                        <Button
                            key={niche}
                            variant={filter === niche ? 'default' : 'outline'}
                            onClick={() => setFilter(niche)}
                            className="capitalize"
                        >
                            {niche}
                        </Button>
                    ))}
                </div>
            )}

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="overflow-hidden group">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <CardContent className="p-0">
                                        <div className="aspect-[4/3] w-full bg-muted overflow-hidden">
                                            <Image
                                                src={item.image.imageUrl}
                                                alt={item.title}
                                                data-ai-hint={item.image.imageHint}
                                                width={600}
                                                height={450}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
                                            <p className="text-sm text-primary">{item.niche}</p>
                                        </div>
                                    </CardContent>
                                </a>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
