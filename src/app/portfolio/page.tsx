'use client';

import { AnimatedHeadline } from "@/components/animated-headline";
import { portfolioItems } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/text-reveal";
import { ArrowRight, Activity, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const PortfolioGallery = dynamic(() => import('@/components/portfolio-gallery').then(mod => mod.PortfolioGallery));

export default function PortfolioPage() {

  const webItems = portfolioItems.filter(item => !['Social Media'].includes(item.niche));


  return (
    <div className="bg-neutral-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f26a2e15,transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero */}
        <section className="pt-16 md:pt-24 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
              <Activity className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Our Work</span>
            </div>
          </motion.div>
          <AnimatedHeadline
            words={["Results", "Growth", "Success"]}
            prefix="Case Studies that Demonstrate"
            suffix="."
            className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white"
          />
          <TextReveal>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              We take pride in the solutions we&apos;ve delivered. Explore some of our success stories and the measurable impact we&apos;ve had for our clients.
            </p>
          </TextReveal>
        </section>

        {/* Web Development */}
        <section id="websites" className="mt-24 md:mt-32 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-4">
              <Code2 className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Web Development</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Web Development <span className="text-accent">Showcase</span>
            </h2>
            <TextReveal>
              <p className="mt-3 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
                Interactive and performant websites that drive business goals.
              </p>
            </TextReveal>
          </motion.div>
          <PortfolioGallery items={webItems} />
        </section>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 text-center pb-12"
        >
          <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Ready to Build Your <span className="text-accent">Success Story</span>?
              </h3>
              <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                Let&apos;s create something amazing together. Get in touch for a free consultation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-accent/90 transition-all"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
