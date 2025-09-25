
import Link from "next/link";
import { ArrowRight, Star, Award, Zap, Users, ShieldCheck, TrendingUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { testimonials, portfolioItems, faqs } from "@/lib/data";
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

const whyChooseUsItems = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Results-Driven",
    description: "We're not just about pretty designs. We're a business-focused agency that delivers measurable results and a tangible ROI for our clients."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "A True Partner",
    description: "We integrate with your team, acting as a true partner invested in your success. Your goals become our goals."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Agile & Efficient",
    description: "Our agile process means we move fast, iterate quickly, and get your project to market faster without sacrificing quality."
  }
];

export default function Home() {
  const whyChooseUsImage = PlaceHolderImages.find(img => img.id === 'why-choose-us');

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center pt-20 md:pt-32 lg:pt-40 pb-20 md:pb-32 lg:pb-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-background/90 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <AnimatedHeadline />
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
            Is your website costing you sales? We build high-performance web experiences that turn visitors into loyal customers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto shadow-lg shadow-primary/20">
              <Link href="/contact">
                Fix My Conversion Rate <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/services">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8 animate-fade-in-up">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Tired of Agencies That Don't Deliver?</h2>
                <p className="text-lg text-muted-foreground">
                    You've been burned by slow timelines, unmet promises, and a lack of tangible results. We're different. We're a performance-focused partner dedicated to your growth.
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
      
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Our 3-Step Plan to Success</h2>
                <p className="mt-4 text-muted-foreground text-lg">We keep it simple, transparent, and focused on results.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4 p-8 border rounded-lg bg-card/50 animate-fade-in-up">
                    <div className="text-5xl font-bold font-headline text-primary">1</div>
                    <h3 className="text-2xl font-headline font-bold">Discovery & Strategy</h3>
                    <p className="text-muted-foreground">We dive deep into your business, audience, and goals to build a custom roadmap for success.</p>
                </div>
                 <div className="space-y-4 p-8 border rounded-lg bg-card/50 animate-fade-in-up animation-delay-200">
                    <div className="text-5xl font-bold font-headline text-primary">2</div>
                    <h3 className="text-2xl font-headline font-bold">Execution & Build</h3>
                    <p className="text-muted-foreground">Our expert team gets to work, building your high-performance website with weekly check-ins and full transparency.</p>
                </div>
                 <div className="space-y-4 p-8 border rounded-lg bg-card/50 animate-fade-in-up animation-delay-400">
                    <div className="text-5xl font-bold font-headline text-primary">3</div>
                    <h3 className="text-2xl font-headline font-bold">Launch & Optimize</h3>
                    <p className="text-muted-foreground">We don't just launch and leave. We monitor performance, analyze data, and continuously optimize for conversion.</p>
                </div>
            </div>
        </div>
      </section>

      <section id="success-stories" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">The Proof Is in the Pudding</h2>
                <p className="mt-4 text-muted-foreground text-lg">We've helped businesses just like yours achieve incredible results. Here's a glimpse of our work.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioItems.slice(0, 2).map((item) => (
                    <Card key={item.id} className="flex flex-col group overflow-hidden">
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                             <Image
                                src={item.image.imageUrl}
                                alt={item.title}
                                data-ai-hint={item.image.imageHint}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                            <CardDescription className="mt-2 flex-grow">{item.solution}</CardDescription>
                            <CardFooter className="p-0 mt-4">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <TrendingUp className="h-5 w-5"/>
                                    <p className="text-lg">{item.results}</p>
                                </div>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
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

      <section id="faq" className="py-20 md:py-28 bg-card">
          <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
              <div className="text-center">
                  <h2 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
                  <p className="mt-4 text-muted-foreground text-lg">Got questions? We've got answers.</p>
              </div>
              <Accordion type="single" collapsible className="w-full mt-12">
                  {faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger className="text-lg font-headline text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-base">
                              {faq.answer}
                          </AccordionContent>
                      </AccordionItem>
                  ))}
              </Accordion>
          </div>
      </section>
      
      <section id="cta" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground p-12 rounded-lg text-center max-w-5xl mx-auto shadow-2xl shadow-primary/20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Ready to Grow Your Business?</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg opacity-90">
              Let's talk about how we can help you achieve your goals. Get a free, no-obligation strategy session today.
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
