
import Image from "next/image";
import { portfolioItems } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { AnimatedHeadline } from "@/components/animated-headline";

export default function PortfolioPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <AnimatedHeadline 
            words={["Results", "Growth", "Success"]}
            prefix="Case Studies that Demonstrate"
            suffix="."
            className="font-headline text-4xl md:text-6xl font-bold tracking-tighter"
        />
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          We take pride in the solutions we've delivered. Explore some of our success stories and the measurable impact we've had for our clients.
        </p>
      </section>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
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
            <CardHeader>
              <Badge variant="secondary" className="w-fit">{item.service}</Badge>
              <CardTitle className="font-headline text-xl pt-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p><span className="font-semibold text-foreground">The Problem:</span> <span className="text-muted-foreground">{item.problem}</span></p>
              <p className="mt-2"><span className="font-semibold text-foreground">Our Solution:</span> <span className="text-muted-foreground">{item.solution}</span></p>
            </CardContent>
            <CardFooter>
                 <div className="flex items-center gap-2 text-primary font-bold">
                    <TrendingUp className="h-5 w-5"/>
                    <p className="text-lg">{item.results}</p>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
