"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, ChevronLeft, ChevronRight, Clock, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePackages, Package } from "@/hooks/use-packages";

export const Pricing = () => {
    const { packages, isLoading } = usePackages();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, setScrollSnaps, onSelect]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!packages || packages.length === 0) {
        return null;
    }

    return (
        <section id="pricing" className="py-24 md:py-32 bg-neutral-950 overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 text-white">Choose Your System</h2>
                        <p className="text-xl text-neutral-400 leading-relaxed">
                            We build AI-powered digital systems that automate operations, generate leads, and help businesses scale faster.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="embla overflow-visible" ref={emblaRef}>
                        <div className="embla__container flex">
                            {packages.map((plan, index) => (
                                <div
                                    key={plan.id}
                                    className="embla__slide flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_40%] min-w-0 px-4 py-12"
                                >
                                    <motion.div
                                        animate={{
                                            scale: selectedIndex === index ? 1.05 : 0.9,
                                            opacity: selectedIndex === index ? 1 : 0.4,
                                        }}
                                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                        className="h-full"
                                    >
                                        <Card className={`flex flex-col h-full relative border-2 overflow-hidden ${plan.popular ? 'border-primary shadow-[0_0_40px_rgba(249,115,22,0.15)] bg-neutral-900' : 'border-white/10 shadow-md bg-neutral-900'}`}>
                                            {/* Grid Pattern on Card */}
                                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

                                            {plan.popular && (
                                                <div className="bg-primary text-primary-foreground text-[10px] font-black px-4 py-1.5 rounded-full absolute top-6 right-6 z-20 shadow-lg tracking-widest uppercase">
                                                    Popular
                                                </div>
                                            )}
                                            
                                            <CardHeader className="p-8 pb-6 relative">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                                                        <Zap className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <CardTitle className="text-2xl md:text-3xl font-bold font-headline text-white tracking-tight">{plan.title}</CardTitle>
                                                </div>
                                                <CardDescription className="text-neutral-400 text-base leading-relaxed min-h-[80px]">
                                                    <span className="text-primary font-bold mr-1.5">Perfect For:</span>
                                                    {plan.description}
                                                </CardDescription>
                                            </CardHeader>

                                            <CardContent className="flex-grow flex flex-col px-8 pt-0 relative">
                                                <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-bold text-white tracking-tighter">{plan.price.replace('Starting From ', '')}</span>
                                                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Base</span>
                                                    </div>
                                                    <div className="text-neutral-500 text-xs mt-2 font-mono tracking-widest uppercase">Approx {plan.price_usd} USD</div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-6 mb-10">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-primary">
                                                            <Clock className="w-4 h-4" />
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Timeline</span>
                                                        </div>
                                                        <p className="text-sm text-white font-bold">{plan.timeline}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-primary">
                                                            <Target className="w-4 h-4" />
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Outcome</span>
                                                        </div>
                                                        <p className="text-xs text-neutral-300 leading-normal font-medium">{plan.outcome}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-5">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">System Capabilities</p>
                                                    <ul className="space-y-3.5">
                                                        {(plan.features || []).slice(0, 7).map((feature) => (
                                                            <li key={feature} className="flex items-start gap-4 group">
                                                                <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                                                                </div>
                                                                <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="p-8 pt-6 relative">
                                                <Button asChild className="w-full h-14 text-base font-black uppercase tracking-widest shadow-2xl transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]" variant={plan.popular ? "default" : "outline"}>
                                                    <Link href="/login">{plan.cta}</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center items-center gap-6 mt-12">
                        <button
                            onClick={scrollPrev}
                            className="p-3 rounded-full border border-white/10 hover:border-primary transition-colors text-white hover:text-primary bg-white/5 backdrop-blur-sm"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex gap-2">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-primary w-8" : "bg-white/20 hover:bg-white/40"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={scrollNext}
                            className="p-3 rounded-full border border-white/10 hover:border-primary transition-colors text-white hover:text-primary bg-white/5 backdrop-blur-sm"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
