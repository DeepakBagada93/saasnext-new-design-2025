
'use client';
import React from 'react';
import Link from "next/link";
import { ArrowRight, Star, Award, Zap, Users, ShieldCheck, TrendingUp, Check, Code, Search, Megaphone, Feather, Palette, BrainCircuit, Rocket, Building, Scale, MapPin, BadgeCheck, BarChart, Server, Smartphone, Wand2, LayoutDashboard, MessageSquare, FileText, PlusCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { portfolioItems, faqs, services, techStack } from "@/lib/data";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedHeadline } from "@/components/animated-headline";
import { BentoCard, BentoGrid } from "@/components/ui/bento-card";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ScrollSection } from "@/components/scroll-section";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { HeroAnimation } from '@/components/hero-animation';

const whyChooseUsItems = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Results-Driven",
    description: "We're not just about pretty designs. We're a business-focused digital marketing company in Junagadh that delivers measurable results and a tangible ROI for our clients."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Your Local Partner",
    description: "We integrate with your team, acting as a true partner right here in Junagadh, invested in your success. Your goals become our goals."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Agile & Efficient",
    description: "Our agile process means we move fast, iterate quickly, and get your project to market faster without sacrificing the quality of our website development services in Junagadh."
  }
];

const serviceIcons: { [key: string]: React.ReactNode } = {
    Code: <Code />,
    Search: <Search />,
    Megaphone: <Megaphone />,
    Feather: <Feather />,
    Palette: <Palette />,
    BrainCircuit: <BrainCircuit />,
};

const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We start by diving deep into your business, goals, and target audience in Junagadh. This phase includes stakeholder interviews, market research, and competitive analysis to build a data-driven strategy that sets the foundation for success."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Our team creates wireframes and high-fidelity mockups, focusing on a user-centric design that is both beautiful and intuitive. You'll get to see and approve the visual direction before any code is written."
    },
    {
      step: "03",
      title: "Development & QA",
      description: "As a premier web design company in Junagadh, we use the latest technologies to build a high-performance, scalable website. We conduct rigorous QA testing to ensure everything is bug-free and pixel-perfect."
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description: "We handle the entire deployment process. But our work doesn't stop there. We monitor performance, analyze user data, and provide ongoing optimization to ensure you're getting the best possible results."
    }
  ];

  const targetAudiences = [
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Ambitious Startups",
      description: "You need to move fast and make a big impact. We provide the agile development and go-to-market strategies to help you launch, iterate, and scale quickly, securing your position in a competitive market."
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: "Established Local Businesses",
      description: "Your business is a staple in Junagadh, but your digital presence isn't keeping up. We'll modernize your website, optimize it for local search, and drive more foot traffic and online sales."
    },
    {
      icon: <Scale className="h-8 w-8 text-primary" />,
      title: "SMEs & Enterprises",
      description: "You require a robust, scalable, and secure digital platform. We offer custom website development in Junagadh to handle complex requirements and deliver enterprise-grade solutions."
    }
  ];
  
  const digitalPresenceBenefits = [
    {
        icon: <MapPin className="h-8 w-8 text-primary" />,
        title: "Capture the Local Market",
        description: "Connect with customers right here in Junagadh who are actively searching for your products and services online."
    },
    {
        icon: <BadgeCheck className="h-8 w-8 text-primary" />,
        title: "Build Trust & Credibility",
        description: "A professional website from a trusted web design company in Junagadh builds trust and makes you the go-to choice in the local community."
    },
    {
        icon: <BarChart className="h-8 w-8 text-primary" />,
        title: "Stay Ahead of Competition",
        description: "Many local competitors have a weak online game. A strong digital strategy for your small business in Junagadh puts you miles ahead."
    }
  ]

const allTech = [...techStack.frontend, ...techStack.backend, ...techStack.aiAndDeployment];

const problemsAndSolutions = [
    {
        problem: {
            title: "Lost in the Digital Noise",
            description: "Your business offers incredible value, but potential clients can't find you online. Competitors with weaker services but better SEO dominate search results, leaving you invisible to customers actively looking for a web developer near me in Junagadh."
        },
        solution: {
            title: "Strategic Digital Dominance",
            description: "As a top digital marketing company in Junagadh, we implement a targeted strategy. Through expert web development and SEO services, we elevate your website's ranking, turning it into a powerful tool for online lead generation. We make sure you're seen."
        }
    },
    {
        problem: {
            title: "Outdated Website is Hurting Your Brand",
            description: "Your website looks like it's from a decade ago. It's slow, not mobile-friendly, and doesn't reflect the quality of your business. This outdated design is costing you credibility and customers."
        },
        solution: {
            title: "Modern, High-Performance Web Design",
            description: "We provide custom website development in Junagadh that is not only visually stunning but also fast, secure, and fully responsive. We build modern web experiences that convert visitors into customers and build brand trust."
        }
    },
    {
        problem: {
            title: "Inconsistent and Unprofessional Branding",
            description: "Your logo, color scheme, and messaging are all over the place. This lack of a cohesive brand identity confuses customers and makes your business look amateur, especially in a competitive market."
        },
        solution: {
            title: "Cohesive and Memorable Brand Identity",
            description: "Our branding and SMM services in Junagadh create a consistent and professional brand identity. We craft a unique logo, define your brand voice, and ensure all your marketing materials are aligned, making your brand instantly recognizable."
        }
    },
    {
        problem: {
            title: "No Real Return on Your Ad Spend",
            description: "You're spending money on digital ads, but you're not seeing a clear return. Your campaigns are attracting clicks but not qualified leads, making it impossible to justify the investment."
        },
        solution: {
            title: "ROI-Focused Digital Advertising",
            description: "As a leading digital advertising agency in Junagadh, we focus on performance. We run highly targeted campaigns on Facebook and Google, constantly optimizing for conversions to ensure every dollar you spend generates measurable results."
        }
    },
    {
        problem: {
            title: "Struggling to Attract High-Value B2B Clients",
            description: "Your current marketing efforts are attracting small, one-off clients, but you're struggling to connect with the larger B2B clients that will truly grow your business. Your messaging isn't reaching decision-makers."
        },
        solution: {
            title: "Targeted B2B Lead Generation",
            description: "As a B2B lead generation company in Junagadh, we specialize in connecting you with high-value business clients. We use a combination of LinkedIn marketing, targeted content, and professional web design to attract and nurture qualified B2B leads."
        }
    },
    {
        problem: {
            title: "Manual, Repetitive Tasks Are Draining Your Resources",
            description: "Your team is spending too much time on repetitive, manual tasks like data entry, customer follow-ups, and report generation. This inefficiency is limiting your ability to focus on growth and innovation."
        },
        solution: {
            title: "Intelligent Automation & AI Solutions",
            description: "We implement custom AI and automation solutions to streamline your operations. From AI-powered chatbots to automated workflows, we help you save time, reduce costs, and free up your team to focus on high-impact activities."
        }
    }
];

const hubFeatures = [
    {
      icon: LayoutDashboard,
      title: "Project Dashboard",
      description: "Track real-time status, milestones, and timelines.",
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Schedule meetings and chat with our team directly.",
    },
    {
      icon: FileText,
      title: "Invoice Management",
      description: "View, download, and manage all your invoices.",
    },
     {
      icon: PlusCircle,
      title: "New Service Requests",
      description: "Submit new ideas or requests in just a few clicks.",
    },
  ];

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };


export default function Home() {
    
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-32 lg:pb-40 text-center overflow-hidden">
        <HeroAnimation />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
           <AnimatedHeadline
              words={['Customers', 'Revenue', 'Momentum']}
              prefix={<>The Top <span className="text-foreground">Web Design & Performance Marketing</span> Agency in Junagadh. We Build</>}
              suffix={<>. Start <span className="text-green-500">Winning</span>.</>}
              className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-fade-in-up"
            />
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
            Is your ad spend draining your budget? We build high-performance web experiences and ROI-focused marketing campaigns that turn advertising into profit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto shadow-lg shadow-primary/20">
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/services">Our Junagadh Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center bg-card border rounded-xl p-8 lg:p-12 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="space-y-6"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <h2 className="font-headline text-4xl md:text-5xl font-bold">
                Stop Guessing. Start Managing.
              </h2>
              <p className="text-lg text-muted-foreground">
                Tired of endless email chains and project ambiguity? Your free Client Hub account gives you a 24/7 command center to take control.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/register">
                      Create Your Free Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
            </motion.div>
            <div className="space-y-6">
              {hubFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  variants={featureVariants}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="why-choose-us" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">The Top Web Design Agency in Junagadh</h2>
                    <p className="text-lg text-muted-foreground">
                        You've been burned by slow timelines and unmet promises. We're different. We're a performance-focused digital marketing agency in Junagadh, dedicated to your growth and providing powerful online lead generation solutions.
                    </p>
                    <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                        <Image src="/saasnext-marketing-leadgeneration.png" alt="SaaSNext Team providing digital marketing for lead generation Junagadh" data-ai-hint="team working" fill className="object-cover"/>
                    </div>
                </div>

                <div className="grid sm:grid-cols-1 gap-8">
                    {whyChooseUsItems.map((item) => (
                        <div key={item.title} className="flex items-start gap-6 p-6 border rounded-lg bg-background">
                            <div className="flex-shrink-0 mt-1">{item.icon}</div>
                            <div>
                                <h3 className="text-xl font-headline font-bold">{item.title}</h3>
                                <p className="text-muted-foreground mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
      
      <section id="services" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Core Services</h2>
                <p className="mt-4 text-muted-foreground text-lg">We provide a complete suite of digital services including web development and SEO services in Junagadh to help your business thrive online.</p>
            </div>
            <BentoGrid className="mt-16">
              {services.slice(0,4).map((service, idx) => (
                <BentoCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  href={`/services#${service.slug}`}
                  cta="Explore Service"
                  icon={serviceIcons[service.icon] || <Zap />}
                  className={idx === 0 || idx === 3 ? "md:col-span-2" : ""}
                  background={service.image && 
                    <Image 
                      src={service.image.imageUrl} 
                      alt={service.title}
                      data-ai-hint={service.image.imageHint}
                      fill 
                      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center opacity-10" 
                    />}
                />
              ))}
            </BentoGrid>
            <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/services">
                        Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="our-process" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Proven Path to Success</h2>
                <p className="mt-4 text-muted-foreground text-lg">We follow a transparent, four-step process to ensure your project is a success from start to finish, keeping you informed and involved along the way.</p>
            </div>
            <div className="relative mt-16">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
                <div className="space-y-12 md:space-y-0">
                    {processSteps.map((item, index) => (
                        <div key={item.title} className="md:grid md:grid-cols-2 md:items-center md:gap-8">
                            <div className={cn("flex items-center gap-4 md:justify-end", index % 2 === 0 ? "md:order-1" : "md:order-2")}>
                                <div className="text-5xl font-bold font-headline text-primary">{item.step}</div>
                                <h3 className="text-2xl font-headline font-bold text-right md:text-left">{item.title}</h3>
                            </div>
                            <div className={cn("mt-4 md:mt-0 p-6 rounded-lg border bg-background", index % 2 === 0 ? "md:order-2" : "md:order-1")}>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
      
      <section id="tech-stack" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Built with Cutting-Edge Technology</h2>
            <p className="mt-4 text-muted-foreground text-lg">We leverage a modern, battle-tested tech stack to build fast, secure, and scalable solutions for our clients in Junagadh. From a WordPress developer in Junagadh to complex custom apps, we have you covered.</p>
          </div>
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto mt-12"
                >
                <CarouselContent className="-ml-4">
                    {allTech.map((tech, index) => (
                    <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <Card className="h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">{tech.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{tech.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4 sm:-left-8 md:-left-12" />
                <CarouselNext className="hidden sm:flex -right-4 sm:-right-8 md:-right-12" />
            </Carousel>
        </div>
      </section>

      <ScrollSection />
      
      <section id="portfolio-showcase" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Work Showcase</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Explore some of the affordable web design Junagadh projects we've built. This showcases our design, functionality, and the user experience we can deliver.
            </p>
          </div>
          <div className="mt-16">
            <PortfolioGallery items={portfolioItems.filter(item => !['Branding', 'Social Media'].includes(item.niche))} showFilters={true} />
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">
                See More Case Studies <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    <section id="target-audience" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Digital Solutions for Every Business in Junagadh</h2>
                <p className="mt-4 text-muted-foreground text-lg">Whether you're a budding startup or an established local enterprise, our website development services in Junagadh are tailored to meet your unique business needs and goals.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                {targetAudiences.map((audience) => (
                    <Card key={audience.title} className="text-center p-8 bg-card">
                        {audience.icon}
                        <h3 className="mt-4 font-headline text-2xl font-bold">{audience.title}</h3>
                        <p className="mt-2 text-muted-foreground">{audience.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>
      
      <section id="junagadh-focus" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Why a Strong Digital Presence in Junagadh Matters</h2>
                <p className="mt-4 text-muted-foreground text-lg">In today's market, your online presence is your most valuable asset. Here's why it's critical for success in Junagadh.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                {digitalPresenceBenefits.map((benefit) => (
                    <Card key={benefit.title} className="text-center p-8 border-t-4 border-primary">
                        {benefit.icon}
                        <h3 className="mt-4 font-headline text-2xl font-bold">{benefit.title}</h3>
                        <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <section id="local-seo" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Dominate Local Search with Junagadh SEO</h2>
                <p className="text-lg text-muted-foreground">
                    Being on the first page of Google isn't a luxury; it's a necessity. Our web development and SEO services in Junagadh put your business in front of the customers who matter most.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Google My Business Optimization</h3>
                            <p className="text-muted-foreground text-sm">We'll optimize your GMB profile to maximize visibility in local map packs and search results.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Local Keyword Targeting</h3>
                            <p className="text-muted-foreground text-sm">We identify and target the exact phrases Junagadh customers use to find businesses like yours.</p>
                        </div>
                    </li>
                     <li className="flex items-start">
                        <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Location-Specific Content</h3>
                            <p className="text-muted-foreground text-sm">We create content that speaks directly to the Junagadh community, building local relevance and authority.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="relative h-96 w-full">
                {services[1].image && (
                    <Image src={services[1].image.imageUrl} alt="SEO analysis for local Junagadh businesses" data-ai-hint={services[1].image.imageHint} fill className="object-cover rounded-lg shadow-lg"/>
                )}
            </div>
        </div>
      </section>
      
      <section id="faq" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
                <p className="mt-4 text-muted-foreground text-lg">Have questions about our lead generation or SMM services in Junagadh? We've got answers.</p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </section>

       <section id="b2b-focus" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Your B2B Lead Generation Company in Junagadh</h2>
            <p className="mt-4 text-muted-foreground text-lg">
                SaaSNext specializes in B2B lead generation, connecting you with high-value business clients in Junagadh and beyond. We combine targeted digital marketing strategies with our custom website development to create powerful online lead generation solutions. Our team understands the nuances of the B2B market, ensuring your message reaches the right decision-makers.
            </p>
        </div>
      </section>

      <section id="small-business-partner" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">The Digital Partner for Small Business in Junagadh</h2>
            <p className="mt-4 text-muted-foreground text-lg">
                We are more than just a vendor; we are your digital partner. We understand the challenges faced by small businesses in Junagadh. That's why we offer affordable web design and scalable digital marketing for small businesses, helping you compete with larger players without breaking the bank. Let us be the web developer near me in Junagadh that you can trust.
            </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {problemsAndSolutions.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="p-8 border rounded-lg bg-card space-y-4">
                            <h3 className="font-headline text-2xl font-bold text-destructive">The Problem: {item.problem.title}</h3>
                            <p className="text-muted-foreground">{item.problem.description}</p>
                        </div>
                        <div className="p-8 border rounded-lg bg-emerald-950 border-emerald-500/30 space-y-4">
                            <h3 className="font-headline text-2xl font-bold text-emerald-400">The Solution: {item.solution.title}</h3>
                            <p className="text-muted-foreground">{item.solution.description}</p>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
      </section>

      <section id="cta" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground p-12 rounded-lg text-center max-w-5xl mx-auto shadow-2xl shadow-primary/20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Ready to Grow Your Business in Junagadh?</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg opacity-90">
              Let's talk about how we can help you achieve your goals. Get a free, no-obligation strategy session with Junagadh's top lead generation agency today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80 scale-105 hover:scale-110 transition-transform">
                <Link href="/contact">
                  Claim Your Free Session <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    