import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  return (
    <div className="container py-12 md:py-20">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Work</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We take pride in the solutions we've delivered. Explore some of our success stories.
        </p>
      </section>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <div className="relative aspect-[3/2] w-full mb-4">
                <Image
                  src={item.image.imageUrl}
                  alt={item.title}
                  data-ai-hint={item.image.imageHint}
                  fill
                  className="rounded-t-lg object-cover"
                />
              </div>
              <Badge variant="secondary" className="w-fit">{item.service}</Badge>
              <CardTitle className="font-headline text-xl pt-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>
                <span className="font-semibold text-foreground">Problem:</span> {item.problem}
              </CardDescription>
              <CardDescription className="mt-2">
                <span className="font-semibold text-foreground">Solution:</span> {item.solution}
              </CardDescription>
            </CardContent>
            <CardFooter>
                 <p className="text-sm font-semibold text-primary">{item.results}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
