import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Globe, Zap, BarChart, Users, MessageSquare, Rocket, ShieldCheck } from "lucide-react";
import { AnimatedHeadline } from "@/components/animated-headline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, techStack, testimonials, faqs, portfolioItems } from "@/lib/data";
import { ServiceCard } from "@/components/service-card";
import { TextReveal } from "@/components/text-reveal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {

  const featuredPortfolio = portfolioItems.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-8">
            New: AI-Powered Lead Generation
          </div>
          <AnimatedHeadline
            words={['Digital Future', 'Growth Engine', 'Success Story']}
            prefix="Building Your"
            suffix="."
            className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          />
          <TextReveal>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              SaaSNext is the best web design company in Junagadh, empowering businesses with custom websites, AI automation, and data-driven digital marketing strategies. We turn your vision into a scalable reality.
            </p>
          </TextReveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">
                Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>

          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border bg-muted shadow-2xl">
              <Image
                src="/saasnext-hero.png"
                alt="SaaSNext Dashboard - Web Development Junagadh"
                width={1200}
                height={675}
                className="object-cover"
                priority
                data-ai-hint="dashboard interface"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-primary/10 rounded-xl blur-3xl" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y bg-muted/30">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Trusted by innovative companies in Junagadh and beyond</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace with actual client logos */}
            {['Acme Corp', 'Global Tech', 'Nebula AI', 'Vertex Solutions', 'Quantum Leap'].map((client) => (
              <div key={client} className="flex justify-center items-center h-12 font-bold text-xl text-foreground/60">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Comprehensive Digital Solutions</h2>
            <TextReveal>
              <p className="text-lg text-muted-foreground">
                From custom website development to advanced AI integration, we provide everything you need to dominate your market. As a leading digital marketing agency in Junagadh, we deliver results that matter.
              </p>
            </TextReveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-lg text-primary">
              <Link href="/services">Explore All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition / Local SEO Focus */}
      <section id="local-seo" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Dominate Local Search with Junagadh SEO</h2>
            <TextReveal>
              <p className="text-lg text-muted-foreground">
                Being on the first page of Google isn't a luxury; it's a necessity. Our web development and SEO services in Junagadh put your business in front of the customers who matter most. We optimize your online presence to capture local traffic and convert visitors into loyal clients.
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
              src="/saasnext-seo.png"
              alt="SEO Analytics Dashboard - SEO Company Junagadh"
              fill
              className="object-cover"
              data-ai-hint="analytics chart showing growth"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-16">Powered by Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[...techStack.frontend, ...techStack.backend, ...techStack.aiAndDeployment].map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-3 group">
                <div className="p-4 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                  {/* Icons would ideally be imported or SVG components */}
                  <Code className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="font-semibold text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Focus Section */}
      <section id="b2b-focus" className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">Your B2B Lead Generation Company in Junagadh</h2>
          <TextReveal>
            <p className="mt-6 text-primary-foreground/90 text-xl leading-relaxed">
              SaaSNext specializes in B2B lead generation, connecting you with high-value business clients in Junagadh and beyond. We combine targeted digital marketing strategies with our custom website development to create powerful online lead generation solutions. Our team understands the nuances of the B2B market, ensuring your message reaches the right decision-makers.
            </p>
          </TextReveal>
          <Button asChild size="lg" variant="secondary" className="mt-10 text-lg">
            <Link href="/contact">Start Generating Leads</Link>
          </Button>
        </div>
      </section>

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

      {/* Small Business Partner */}
      <section id="small-business-partner" className="py-20 md:py-28 bg-muted/30">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">The Digital Partner for Small Business in Junagadh</h2>
          <TextReveal>
            <p className="mt-6 text-muted-foreground text-xl leading-relaxed">
              We are more than just a vendor; we are your digital partner. We understand the challenges faced by small businesses in Junagadh. That's why we offer affordable web design and scalable digital marketing for small businesses, helping you compete with larger players without breaking the bank. Let us be the web developer near me in Junagadh that you can trust.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-16">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-card border-none shadow-md">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 text-primary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="inline-block mr-1">★</span>
                    ))}
                  </div>
                  <p className="text-lg mb-6 flex-grow italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/avatars/client-${i + 1}.png`} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-20 md:py-28 text-center">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <TextReveal>
            <p className="text-xl text-muted-foreground mb-10">
              Join the growing list of businesses in Junagadh that trust SaaSNext for their digital success. Let's build something extraordinary together.
            </p>
          </TextReveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-10 py-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Start Your Project Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
