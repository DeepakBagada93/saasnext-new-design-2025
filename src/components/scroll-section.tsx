
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, Search, ThumbsDown, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const problems = [
  {
    icon: <ThumbsDown className="h-12 w-12 text-destructive" />,
    title: 'Your Website is a Ghost Town',
    description: 'You have a website, but it feels like a digital ghost town. Visitors are rare, and those who do arrive leave without a trace.',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: <Search className="h-12 w-12 text-amber-500" />,
    title: 'Lost in the Google Jungle',
    description: 'Potential customers are searching for your services, but your business is buried on page 10 of Google. You\'re invisible.',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-blue-500" />,
    title: 'Traffic with Zero Traction',
    description: 'You\'re getting clicks from ads, but they\'re not turning into calls, sign-ups, or sales. Your ad spend feels like a black hole.',
    bgColor: 'bg-blue-500/10',
  },
];

export function ScrollSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });
  
  // A simple function to create opacity transitions.
  // A card will be fully visible for the middle 25% of its duration.
  const createOpacity = (index: number, total: number) => {
    const segment = 1 / total;
    const start = index * segment;
    const end = (index + 1) * segment;

    return useTransform(
      scrollYProgress,
      [start, start + segment * 0.2, end - segment * 0.2, end],
      [0, 1, 1, 0]
    );
  };
  
  const createScale = (index: number, total: number) => {
    const segment = 1 / total;
    const start = index * segment;
    const end = (index + 1) * segment;
    return useTransform(
        scrollYProgress,
        [start, start + segment * 0.2, end - segment * 0.2, end],
        [0.9, 1, 1, 0.9]
    );
  }

  const totalSections = problems.length + 1; // 3 problems + 1 solution

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative flex w-full max-w-3xl mx-auto px-4">
          
          {problems.map((problem, index) => (
             <motion.div
                key={index}
                className={cn(
                    "absolute w-full p-8 rounded-2xl border text-center space-y-4",
                    problem.bgColor
                )}
                style={{
                    opacity: createOpacity(index, totalSections),
                    scale: createScale(index, totalSections),
                    y: '-50%',
                    x: '-50%',
                    top: '50%',
                    left: '50%',
                }}
            >
                {problem.icon}
                <h3 className="font-headline text-3xl font-bold">{problem.title}</h3>
                <p className="text-muted-foreground text-lg">{problem.description}</p>
            </motion.div>
          ))}
          
          {/* The Solution Card */}
          <motion.div
            className="absolute w-full p-8 rounded-2xl border text-center space-y-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
            style={{
                opacity: createOpacity(problems.length, totalSections),
                scale: createScale(problems.length, totalSections),
                y: '-50%',
                x: '-50%',
                top: '50%',
                left: '50%',
            }}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-pulse" />
             <h2 className="font-headline text-4xl md:text-5xl font-bold">The SaaSNext Solution</h2>
             <p className="text-muted-foreground text-xl">
               We turn your digital presence from a liability into your most powerful asset for growth in Junagadh.
             </p>
             <div className="flex justify-center gap-4">
                 <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">Start Winning Today</Link>
                 </Button>
                 <Button size="lg" variant="outline" asChild>
                    <Link href="/services">See How</Link>
                 </Button>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
