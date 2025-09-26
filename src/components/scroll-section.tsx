
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
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const x = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '-75%']);

  const SolutionOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const SolutionScale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-start overflow-hidden">
        <motion.div style={{ opacity }} className="w-full px-4">
            <motion.div style={{ scale }} className="max-w-7xl mx-auto">
                <motion.div style={{ x }} className="flex items-start gap-8 w-[400%]">
                    <div className="w-1/4 p-8 rounded-2xl border text-center space-y-4 bg-card">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold">Your Digital Problems, Solved.</h2>
                        <p className="text-muted-foreground text-xl">
                            Are you facing these common challenges? Scroll to see how we tackle them.
                        </p>
                    </div>
                     {problems.map((problem, index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-1/4 p-8 rounded-2xl border text-center space-y-4",
                                problem.bgColor
                            )}
                        >
                            {problem.icon}
                            <h3 className="font-headline text-3xl font-bold">{problem.title}</h3>
                            <p className="text-muted-foreground text-lg">{problem.description}</p>
                        </div>
                    ))}

                </motion.div>
            </motion.div>
        </motion.div>

        <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ opacity: SolutionOpacity, scale: SolutionScale }}
        >
            <div className="bg-background/80 backdrop-blur-md max-w-3xl mx-auto p-8 rounded-2xl border text-center space-y-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
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
            </div>
        </motion.div>

      </div>
    </section>
  );
}
