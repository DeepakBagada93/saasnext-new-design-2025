import Link from "next/link";
import { ArrowRight, Code, Users, BrainCircuit, BarChart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { services, testimonials } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BentoCard, BentoGrid } from "@/components/ui/bento-card";
import { cn } from "@/lib/utils";

const serviceIcons: { [key: string]: React.ElementType } = {
  "Web Development": Code,
  "Lead Generation": Users,
  "AI Solutions": BrainCircuit,
  "Performance Marketing": BarChart,
};

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center pt-20 md:pt-32 lg:pt-40 pb-20 md:pb-32 lg:pb-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-background/90 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-fade-in-up">
            Elevate Your Business with Next-Gen Solutions
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
            We deliver high-performance web development, AI integration, and data-driven marketing to fuel your growth.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto shadow-lg shadow-primary/20">
              <Link href="/contact">
                Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Core Services</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From concept to launch and beyond, we provide the expertise to make your vision a reality.
            </p>
          </div>
          <BentoGrid className="mt-16">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.title];
              return (
                <BentoCard
                  key={service.title}
                  icon={Icon && <Icon className="h-8 w-8 text-primary" />}
                  title={service.title}
                  description={service.description}
                  href={`/services#${service.slug}`}
                  className={cn(
                    "animate-fade-in-up",
                    index === 0 && "md:col-span-2",
                    index === 3 && "md:col-span-2"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                />
              );
            })}
          </BentoGrid>
        </div>
      </section>
      
      <section id="testimonials" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">What Our Clients Say</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We're proud to have partnered with amazing companies.
            </p>
          </div>
          <Carousel className="w-full max-w-4xl mx-auto mt-12" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="bg-transparent border-none shadow-none">
                      <CardContent className="p-6 text-center">
                        <blockquote className="text-xl md:text-2xl font-medium border-l-4 border-primary pl-6 italic">"{testimonial.quote}"</blockquote>
                        <div className="flex items-center justify-center mt-8">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <p className="mt-4 font-semibold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        <div className="flex justify-center mt-2">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      
      <section id="cta" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground p-12 rounded-lg text-center max-w-5xl mx-auto shadow-2xl shadow-primary/20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Ready to Start Your Project?</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg opacity-90">
              Let's talk about how we can help you achieve your business goals. Get a free, no-obligation quote today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80 scale-105 hover:scale-110 transition-transform">
                <Link href="/contact">
                  Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
