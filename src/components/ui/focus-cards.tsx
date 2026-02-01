"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
    }: {
        card: any;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-2xl relative bg-neutral-900 overflow-hidden h-[300px] md:h-[350px] w-full transition-all duration-300 ease-out border border-neutral-800 group",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-50",
                hovered === index && "scale-[1.02] border-primary/50 ring-2 ring-primary/20 z-10"
            )}
        >
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={card.image.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            <div
                className={cn(
                    "absolute inset-0 flex flex-col justify-end py-4 px-4 transition-opacity duration-300",
                    //   hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-medium text-primary mb-1 uppercase tracking-wider bg-black/50 w-fit px-2 py-0.5 rounded backdrop-blur-sm">
                        {card.service}
                    </p>
                    <div className="bg-gradient-to-b from-neutral-50/0 to-neutral-50/90 bg-clip-text text-transparent">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
                            {card.title}
                        </h3>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <Button asChild size="sm" className="w-full h-8 text-xs bg-primary text-black hover:bg-primary/90">
                            <Link href={card.url} target="_blank" className="flex items-center justify-center gap-2">
                                View Project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
);

Card.displayName = "Card";

export function FocusCards({ items }: { items: any[] }) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(8);

    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return (
        <div className="flex flex-col items-center gap-12 max-w-7xl mx-auto w-full px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {visibleItems.map((item, index) => (
                    <Card
                        key={item.title + index}
                        card={item}
                        index={index}
                        hovered={hovered}
                        setHovered={setHovered}
                    />
                ))}
            </div>

            {hasMore && (
                <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    size="lg"
                    className="mt-4 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white min-w-[200px]"
                >
                    Load More Work
                </Button>
            )}
        </div>
    );
}
