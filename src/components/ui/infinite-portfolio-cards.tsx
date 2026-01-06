"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InfinitePortfolioCards = ({
    items,
    direction = "left",
    speed = "slow",
    pauseOnHover = true,
    className,
}: {
    items: {
        id: string;
        title: string;
        service: string;
        image: { imageUrl: string; imageHint: string };
        url: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[400px] md:w-[500px] max-w-full relative rounded-2xl border border-neutral-800 flex-shrink-0 bg-neutral-900 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
                        key={item.id + idx}
                    >
                        <div className="relative h-[250px] w-full overflow-hidden">
                            {item.image?.imageUrl ? (
                                <Image
                                    src={item.image.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>

                        <div className="p-6 relative z-20">
                            <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">{item.service}</p>
                            <h3 className="font-headline text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>

                            <Button asChild size="sm" variant="outline" className="w-full border-neutral-700 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                <Link href={item.url} target="_blank" className="flex items-center justify-center gap-2">
                                    View Project <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
