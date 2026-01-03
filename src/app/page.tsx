import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Globe, Zap, BarChart, Users, MessageSquare, Rocket, ShieldCheck, BrainCircuit, Search, Megaphone, Feather, Palette } from "lucide-react";
import { AnimatedHeadline } from "@/components/animated-headline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, techStack, faqs, portfolioItems } from "@/lib/data";
import { TextReveal } from "@/components/text-reveal";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Pricing } from "@/components/pricing";
import { CTASection } from "@/components/cta-section";
import { BentoGridHeader } from "@/components/ui/bento-grid-header";
import { ProblemSolution } from "@/components/problem-solution";
import { AgencyOverview } from "@/components/agency-overview";
import { BusinessTargeting } from "@/components/business-targeting";
import { Timeline } from "@/components/timeline";
import { ClientHubCTA } from "@/components/client-hub-cta";
import { CreativeHero } from "@/components/creative-hero";

export default function Home() {

  const featuredPortfolio = portfolioItems.slice(0, 4);

  // Map icons string to components
  const iconMap: { [key: string]: any } = {
    BrainCircuit: BrainCircuit,
    Code: Code,
    Search: Search,
    Megaphone: Megaphone,
    Feather: Feather,
    Palette: Palette,
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
      {/* Hero Section with Highlight */}
      {/* Creative Hero Section */}
      <CreativeHero />

      {/* Problem / Solution Section */}
      <ProblemSolution />
      {/* Client Hub CTA */}
      <ClientHubCTA />



      {/* Services Overview with Bento Grid */}
      <section id="services" className="py-20 md:py-28 bg-neutral-50 dark:bg-black">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Comprehensive Digital Solutions</h2>
            <TextReveal>
              <p className="text-lg text-muted-foreground">
                From custom website development to advanced AI integration, we provide everything you need to dominate your market.
              </p>
            </TextReveal>
          </div>

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

      {/* Tech Stack Marquee */}
      <section className="py-20 md:py-28 overflow-hidden bg-grid-small-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-16">Powered by Modern Technology</h2>
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
              src="/saasnext-webdevelopment-ai.png"
              alt="SEO Analytics Dashboard - SEO Company Junagadh"
              fill
              className="object-cover"
              data-ai-hint="analytics chart showing growth"
            />
          </div>
        </div>
      </section>


      {/* Business Targeting Section */}
      <BusinessTargeting />

      {/* Portfolio Preview */}
      <section className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Recent Work</h2>
              <TextReveal>
                <p className="text-lg text-muted-foreground">See how we've helped businesses transform their digital presence with our expert web design and development services.</p>
              </TextReveal>
            </div>
            <Button asChild variant="outline">
              <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPortfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden group border-0 shadow-lg bg-card">
                <div className="aspect-video relative overflow-hidden">
                  {item.image?.imageUrl ? (
                    <Image
                      src={item.image.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={item.image?.imageHint}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">{item.service}</p>
                      <h3 className="font-headline text-2xl font-bold">{item.title}</h3>
                    </div>
                    <Button asChild size="icon" variant="ghost" className="rounded-full">
                      <Link href={item.url} target="_blank"><ArrowRight className="h-5 w-5" /></Link>
                    </Button>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{item.problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>




      {/* Timeline Section */}
      <Timeline />
      {/* Pricing Section */}
      <Pricing />

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
