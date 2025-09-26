

import Link from "next/link";
import { ArrowRight, Star, Award, Zap, Users, ShieldCheck, TrendingUp, Check, Code, Search, Megaphone, Feather, Palette, BrainCircuit, Rocket, Building, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { testimonials, portfolioItems, faqs, services } from "@/lib/data";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedHeadline } from "@/components/animated-headline";
import { BentoCard, BentoGrid } from "@/components/ui/bento-card";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ScrollSection } from "@/components/scroll-section";
import { cn } from "@/lib/utils";

const whyChooseUsItems = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Results-Driven",
    description: "We're not just about pretty designs. We're a business-focused agency in Junagadh that delivers measurable results and a tangible ROI for our clients."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Your Local Partner",
    description: "We integrate with your team, acting as a true partner right here in Junagadh, invested in your success. Your goals become our goals."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Agile & Efficient",
    description: "Our agile process means we move fast, iterate quickly, and get your project to market faster without sacrificing quality."
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
      description: "Using the latest technologies, we build a high-performance, scalable website. Throughout the process, we conduct rigorous quality assurance testing to ensure everything is bug-free and pixel-perfect."
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description: "We handle the entire deployment process. But our work doesn't stop there. We monitor performance, analyze user data, and provide ongoing optimization to ensure you're getting the best possible results."
    }
  ];

  const techStack = [
    { name: "Next.js", description: "For performant, server-rendered React applications." },
    { name: "React", description: "To build dynamic and interactive user interfaces." },
    { name: "TypeScript", description: "For robust, scalable, and maintainable code." },
    { name: "Tailwind CSS", "description": "For rapid, utility-first styling and design." },
    { name: "Firebase", description: "For scalable backend services like auth and database." },
    { name: "Genkit", description: "For integrating powerful AI and generative features." },
  ];

  const targetAudiences = [
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Ambitious Startups",
      description: "You need to move fast and make a big impact. We provide the agile development and go-to-market strategies to help you launch, iterate, and scale quickly, securing your position in the market."
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: "Established Local Businesses",
      description: "Your business is a staple in Junagadh, but your digital presence isn't keeping up. We'll modernize your website, optimize it for local search, and drive more foot traffic and online sales."
    },
    {
      icon: <Scale className="h-8 w-8 text-primary" />,
      title: "SMEs & Enterprises",
      description: "You require a robust, scalable, and secure digital platform. We have the expertise to handle complex requirements, integrate with existing systems, and deliver enterprise-grade solutions that drive efficiency and growth."
    }
  ];


export default function Home() {
  const whyChooseUsImage = PlaceHolderImages.find(img => img.id === 'why-choose-us');
  const techStackImage = PlaceHolderImages.find(img => img.id === 'tech-stack');

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-32 lg:pb-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-background/90 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
           <AnimatedHeadline
              words={['Customers', 'Revenue', 'Momentum']}
              prefix={<>Stop <span>Losing</span></>}
              suffix={<>. Start <span className="text-green-500">Winning</span>.</>}
              className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-fade-in-up"
            />
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
            Is your website failing to attract local customers in Junagadh? We build high-performance web experiences that turn visitors into loyal customers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto shadow-lg shadow-primary/20">
              <Link href="/contact">
                Grow My Junagadh Business <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/services">Our Junagadh Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8 animate-fade-in-up">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">The Top Web Design Agency in Junagadh</h2>
                <p className="text-lg text-muted-foreground">
                    You've been burned by slow timelines, unmet promises, and a lack of tangible results. We're different. We're a performance-focused partner in Junagadh, dedicated to your growth.
                </p>
                <div className="space-y-6">
                    {whyChooseUsItems.map((item) => (
                        <div key={item.title} className="flex items-start gap-4">
                            <div className="flex-shrink-0">{item.icon}</div>
                            <div>
                                <h3 className="text-xl font-headline font-bold">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative h-96 w-full animate-fade-in-up animation-delay-200">
                {whyChooseUsImage && (
                    <Image src={whyChooseUsImage.imageUrl} alt="Team collaborating" data-ai-hint={whyChooseUsImage.imageHint} fill className="object-cover rounded-lg shadow-lg"/>
                )}
            </div>
        </div>
      </section>
      
      <section id="services" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Core Services</h2>
                <p className="mt-4 text-muted-foreground text-lg">We provide a complete suite of digital services to help your Junagadh business thrive online.</p>
            </div>
            <BentoGrid className="mt-16">
              {services.slice(0,4).map((service, idx) => (
                <BentoCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  href={`/services#${service.slug}`}
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

      <section id="our-process" className="py-20 md:py-28 bg-card">
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

      <section id="tech-stack" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 w-full">
                {techStackImage && (
                    <Image src={techStackImage.imageUrl} alt="Technology stack logos" data-ai-hint={techStackImage.imageHint} fill className="object-contain" />
                )}
            </div>
            <div className="space-y-6">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Built with Cutting-Edge Technology</h2>
                <p className="text-lg text-muted-foreground">We leverage the best tools and technologies in the industry to build fast, secure, and scalable solutions for our clients in Junagadh.</p>
                <div className="grid grid-cols-2 gap-6">
                    {techStack.map((tech) => (
                        <div key={tech.name}>
                            <h3 className="font-headline font-bold text-lg">{tech.name}</h3>
                            <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <ScrollSection />
      
      <section id="portfolio-showcase" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Work Showcase</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Explore some of the live websites we've built. This showcases our design, functionality, and the user experience we can deliver.
            </p>
          </div>
          <div className="mt-16">
            <PortfolioGallery items={portfolioItems} />
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

      <section id="testimonials" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">What Our Junagadh Clients Say</h2>
                <p className="mt-4 text-muted-foreground text-lg">We're proud of the relationships we've built and the results we've delivered.</p>
            </div>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full mt-16"
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Card className="h-full">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex-grow">
                                        <p className="text-muted-foreground">"{testimonial.quote}"</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                                        <Avatar>
                                            <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    </section>

    <section id="target-audience" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Digital Solutions for Every Business in Junagadh</h2>
                <p className="mt-4 text-muted-foreground text-lg">Whether you're a budding startup or an established local enterprise, our services are tailored to meet your unique business needs and goals.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                {targetAudiences.map((audience) => (
                    <Card key={audience.title} className="text-center p-8">
                        {audience.icon}
                        <h3 className="mt-4 font-headline text-2xl font-bold">{audience.title}</h3>
                        <p className="mt-2 text-muted-foreground">{audience.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>
      
      <section id="cta" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground p-12 rounded-lg text-center max-w-5xl mx-auto shadow-2xl shadow-primary/20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Ready to Grow Your Business in Junagadh?</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg opacity-90">
              Let's talk about how we can help you achieve your goals. Get a free, no-obligation strategy session with Junagadh's top web agency today.
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
