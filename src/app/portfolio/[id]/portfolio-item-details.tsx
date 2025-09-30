
'use client';
import { notFound } from 'next/navigation';
import { portfolioItems } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PortfolioItemDetails({ portfolioItemId }: { portfolioItemId: string }) {
    const item = portfolioItems.find(p => p.id === portfolioItemId);

    if (!item) {
        notFound();
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/portfolio">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Portfolio
                    </Link>
                </Button>
                
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="aspect-[16/9] w-full bg-muted overflow-hidden">
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
                         <div className="p-6 md:p-8 space-y-4">
                            <p className="text-sm font-semibold text-primary">{item.service}</p>
                            <h1 className="font-headline text-3xl md:text-4xl font-bold">{item.title}</h1>
                            <div className="grid md:grid-cols-3 gap-8 pt-4 border-t">
                                <div className="md:col-span-1">
                                    <h3 className="font-headline font-semibold text-lg mb-2">The Challenge</h3>
                                    <p className="text-muted-foreground">{item.problem}</p>
                                </div>
                                <div className="md:col-span-1">
                                    <h3 className="font-headline font-semibold text-lg mb-2">Our Solution</h3>
                                    <p className="text-muted-foreground">{item.solution}</p>
                                </div>
                                 <div className="md:col-span-1">
                                    <h3 className="font-headline font-semibold text-lg mb-2">The Results</h3>
                                    <p className="text-muted-foreground">{item.results}</p>
                                </div>
                            </div>
                            {item.url && item.url !== '#' && (
                                <div className="pt-6">
                                    <Button asChild>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            View Live Project
                                        </a>
                                    </Button>
                                </div>
                            )}
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}
