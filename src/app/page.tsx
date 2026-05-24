'use client';

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Code, BrainCircuit, Search, Megaphone, Feather } from "lucide-react";
import { services, techStack, portfolioItems, faqs } from "@/lib/data";
import { HeroAI } from "@/components/hero-ai";

// Dynamic imports for below-the-fold components
const DirectAnswer = dynamic(() => import("@/components/direct-answer").then(mod => mod.DirectAnswer), { ssr: true });
const PricingCalculator = dynamic(() => import("@/components/smart-calculator").then(mod => mod.PricingCalculator), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-neutral-900 animate-pulse rounded-3xl mx-auto max-w-7xl my-20" />
});
const AEOComparison = dynamic(() => import("@/components/aeo-comparison").then(mod => mod.AEOComparison), { ssr: false });
const ProblemSolution = dynamic(() => import("@/components/problem-solution").then(mod => mod.ProblemSolution), { ssr: false });
const GEOSection = dynamic(() => import("@/components/geo-section").then(mod => mod.GEOSection), { ssr: false });
const BentoGrid = dynamic(() => import("@/components/ui/bento-grid").then(mod => mod.BentoGrid), { ssr: false });
const BentoGridItem = dynamic(() => import("@/components/ui/bento-grid").then(mod => mod.BentoGridItem), { ssr: false });
const BentoGridHeader = dynamic(() => import("@/components/ui/bento-grid-header").then(mod => mod.BentoGridHeader), { ssr: false });
const CreativeSectionHeader = dynamic(() => import("@/components/creative-section-header").then(mod => mod.CreativeSectionHeader), { ssr: false });
const InfiniteMovingCards = dynamic(() => import("@/components/ui/infinite-moving-cards").then(mod => mod.InfiniteMovingCards), { ssr: false });
const AgencyOverview = dynamic(() => import("@/components/agency-overview").then(mod => mod.AgencyOverview), { ssr: false });
const TextReveal = dynamic(() => import("@/components/text-reveal").then(mod => mod.TextReveal), { ssr: false });
const BusinessTargeting = dynamic(() => import("@/components/business-targeting").then(mod => mod.BusinessTargeting), { ssr: false });
const FocusCards = dynamic(() => import("@/components/ui/focus-cards").then(mod => mod.FocusCards), { ssr: false });
const Timeline = dynamic(() => import("@/components/timeline").then(mod => mod.Timeline), { ssr: false });
const Accordion = dynamic(() => import("@/components/ui/accordion").then(mod => mod.Accordion), { ssr: false });
const AccordionContent = dynamic(() => import("@/components/ui/accordion").then(mod => mod.AccordionContent), { ssr: false });
const AccordionItem = dynamic(() => import("@/components/ui/accordion").then(mod => mod.AccordionItem), { ssr: false });
const AccordionTrigger = dynamic(() => import("@/components/ui/accordion").then(mod => mod.AccordionTrigger), { ssr: false });
const CTASection = dynamic(() => import("@/components/cta-section").then(mod => mod.CTASection), { ssr: false });

export default function Home() {

  const featuredPortfolio = portfolioItems.slice(0, 4);

  // Map icons string to components
  const iconMap: { [key: string]: any } = {
    BrainCircuit: BrainCircuit,
    Code: Code,
    Search: Search,
    Megaphone: Megaphone,
    Feather: Feather,
  };

  // Flatten tech stack for marquee
  const techStackItems = [
    ...techStack.frontend,
    ...techStack.backend,
    ...techStack.aiAndDeployment
  ].map(tech => ({
    quote: tech.description,
    name: tech.name,
    title: ""
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* High-Impact AI & Automation Hero */}
      <HeroAI />

      {/* Direct Answer for AEO */}
      <DirectAnswer />

      {/* Pricing Section */}
      <PricingCalculator />

      {/* AEO Comparison */}
      <AEOComparison />

      {/* Problem / Solution Section */}
      <ProblemSolution />
      
      {/* AI, GEO & AEO Section */}
      <GEOSection />

      {/* Client Explorer CTA */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">Experience the SaaSNext Client Portal</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Log in to our explorer panel to track your projects, manage AI agents, and access premium automation tools in real-time.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/login">Explore All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/services">View Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview with Bento Grid */}
      <section id="services" className="py-20 md:py-28 bg-neutral-50 dark:bg-black overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <CreativeSectionHeader 
            title="Productized Web Solutions"
            subtitle="From 3-day rapid launches to enterprise digital platforms, we provide ready-to-deploy systems that scale with your business."
            className="mb-12"
          />

          <BentoGrid className="max-w-7xl mx-auto">
            {services.map((service, i) => {
              const IconComponent = iconMap[service.icon] || Code;
              return (
                <BentoGridItem
                  key={i}
                  title={service.title}
                  description={service.description}
                  header={<BentoGridHeader tags={service.tags} />}
                  icon={<IconComponent className="h-6 w-6 text-neutral-500" />}
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
              );
            })}
          </BentoGrid>

          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-lg text-primary">
              <Link href="/services">Explore All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Web App Focus */}
      <section className="py-20 md:py-28 bg-black overflow-hidden relative">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
            <div className="relative p-2 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
               <Image
                src="/saasnext-webdevelopment-ai.png"
                alt="Custom Web Application Interface"
                width={800}
                height={600}
                className="rounded-xl w-full"
              />
            </div>
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
              <Code className="w-3 h-3" />
              <span>CUSTOM WEB APP DEVELOPMENT</span>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">Scale Faster with <span className="text-primary">Custom Engines.</span></h2>
            <p className="text-lg text-neutral-400">
              Generic websites don't cut it anymore. We build tailored web applications that integrate directly with your business logic, automate repetitive tasks, and provide a seamless user experience.
            </p>
            <ul className="space-y-4">
              {[
                "Next.js 15 & React Server Components",
                "Real-time Dashboard Integrations",
                "High-Performance Cloud Architecture",
                "Secure API-First Development"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">Build Your App</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-20 md:py-28 overflow-hidden bg-grid-small-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-16">The SaaSNext Tech Stack</h2>
          <InfiniteMovingCards
            items={techStackItems}
            direction="left"
            speed="normal"
          />
        </div>
      </section>

      {/* Agency Overview Section */}
      <AgencyOverview />

      {/* Value Proposition / Local SEO Focus */}
      <section id="local-seo" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Dominate Local Search with Junagadh SEO</h2>
            <TextReveal>
              <p className="text-lg text-muted-foreground">
                Being on the first page of Google isn't a luxury; it's a necessity. Our web development and SEO services in Junagadh put your business in front of the customers who matter most.
              </p>
            </TextReveal>
            <ul className="space-y-4">
              {[
                "Targeted Local Keywords for Junagadh Market",
                "Google My Business Optimization",
                "High-Quality Backlink Building",
                "Mobile-First Responsive Design"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-4">
              <Link href="/services#seo-optimization">Boost Your Ranking</Link>
            </Button>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/saasnext-web-development.jpg"
              alt="SEO Analytics Dashboard - SEO Company Junagadh"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              data-ai-hint="analytics chart showing growth"
            />
          </div>
        </div>
      </section>


      {/* Business Targeting Section */}
      <BusinessTargeting />

      {/* Portfolio Preview */}
      <section className="py-20 md:py-28 overflow-hidden bg-neutral-950">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-white">Our Recent Work</h2>
              <TextReveal>
                <p className="text-lg text-neutral-400">See how we've helped businesses transform their digital presence with our expert web design and development services.</p>
              </TextReveal>
            </div>
            <div className="mx-auto md:mx-0">
              <Button asChild variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white">
                <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>

        <FocusCards items={portfolioItems} />
      </section>




      {/* Timeline Section */}
      <Timeline />

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
