import Image from "next/image";
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

const serviceIcons: { [key: string]: React.ElementType } = {
  Code,
  Users,
  BrainCircuit,
  BarChart,
};

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative pt-20 md:pt-32 lg:pt-40 pb-20 md:pb-32 lg:pb-40 text-center">
        <div className="absolute inset-0 bg-background/90">
            {heroImage && 
                <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description} 
                    fill 
                    className="object-cover opacity-10"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
            }
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Elevate Your Business with Next-Gen Solutions
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            We deliver high-performance web development, AI integration, and data-driven marketing to fuel your growth.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
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

      <section id="services" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Services</h2>
            <p className="mt-4 text-muted-foreground">
              From concept to launch and beyond, we provide the expertise to make your vision a reality.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Card key={service.title} className="flex flex-col text-center items-center p-6 bg-background hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4 mx-auto">
                      {Icon && <Icon className="h-8 w-8" />}
                    </div>
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                  <Button variant="link" asChild className="mt-4">
                    <Link href={`/services#${service.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
            <p className="mt-4 text-muted-foreground">
              We're proud to have partnered with amazing companies.
            </p>
          </div>
          <Carousel className="w-full max-w-4xl mx-auto mt-12" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="bg-card border-none shadow-none">
                      <CardContent className="p-6 text-center">
                        <blockquote className="text-lg md:text-xl font-medium border-l-4 border-primary pl-6 italic">"{testimonial.quote}"</blockquote>
                        <div className="flex items-center justify-center mt-6">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <p className="mt-4 font-semibold">{testimonial.name}</p>
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
      
      <section id="cta" className="py-20 md:py-28 bg-card">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center max-w-5xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="mt-4 max-w-3xl mx-auto">
              Let's talk about how we can help you achieve your business goals. Get a free, no-obligation quote today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/80">
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
