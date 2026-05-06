'use client';

import { AnimatedHeadline } from "@/components/animated-headline";
import { portfolioItems } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/text-reveal";

const PortfolioGallery = dynamic(() => import('@/components/portfolio-gallery').then(mod => mod.PortfolioGallery));
const PerformanceMarketingChart = dynamic(() => import('@/components/performance-chart').then(mod => mod.PerformanceMarketingChart));
const PerformanceMarketingChartDesignTech = dynamic(() => import('@/components/performance-chart-design-tech').then(mod => mod.PerformanceMarketingChartDesignTech));

export default function PortfolioPage() {

  const socialItems = portfolioItems.filter(item => item.niche === 'Social Media');
  const webItems = portfolioItems.filter(item => !['Social Media'].includes(item.niche));


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <AnimatedHeadline
          words={["Results", "Growth", "Success"]}
          prefix="Case Studies that Demonstrate"
          suffix="."
          className="font-headline text-4xl md:text-6xl font-bold tracking-tighter"
        />
        <TextReveal>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            We take pride in the solutions we've delivered. Explore some of our success stories and the measurable impact we've had for our clients through our expert web design and digital marketing services in Junagadh.
          </p>
        </TextReveal>
      </section>

      <section id="performance" className="mt-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Performance Marketing Showcase</h2>
          <TextReveal>
            <p className="mt-2 text-muted-foreground text-lg">Data-driven campaigns that deliver measurable ROI for businesses in Junagadh and beyond.</p>
          </TextReveal>
        </div>
        <div className="space-y-8">
          <PerformanceMarketingChart />
          <PerformanceMarketingChartDesignTech />
        </div>
      </section>

      <section id="websites" className="mt-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Web Development Showcase</h2>
          <TextReveal>
            <p className="mt-2 text-muted-foreground text-lg">Interactive and performant websites that drive business goals, built by the top web developers in Junagadh.</p>
          </TextReveal>
        </div>
        <PortfolioGallery items={webItems} />
      </section>



    </div>
  );
}
