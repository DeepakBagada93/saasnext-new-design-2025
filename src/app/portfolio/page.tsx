

import { AnimatedHeadline } from "@/components/animated-headline";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { portfolioItems } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  
  const brandingItems = portfolioItems.filter(item => item.niche === 'Branding');
  const socialItems = portfolioItems.filter(item => item.niche === 'Social Media');
  const webItems = portfolioItems.filter(item => !['Branding', 'Social Media'].includes(item.niche));


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

       <section id="performance-marketing" className="mt-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Performance Marketing Showcase</h2>
            <p className="mt-2 text-muted-foreground text-lg">Engaging ad creatives and social media campaigns designed to capture attention and drive action.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
             {socialItems.map(item => (
                 <Card key={item.id} className="overflow-hidden group">
                    <Link href={`/portfolio/${item.id}`}>
                        <CardContent className="p-0">
                            <div className="aspect-square w-full bg-muted overflow-hidden">
                                <Image
                                    src={item.image.imageUrl}
                                    alt={item.title}
                                    data-ai-hint={item.image.imageHint}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
      </section>

      <section id="websites" className="mt-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Web Development Showcase</h2>
            <p className="mt-2 text-muted-foreground text-lg">Interactive and performant websites that drive business goals.</p>
        </div>
        <PortfolioGallery items={webItems} />
      </section>

      <section id="branding" className="mt-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Logo & Brand Identity</h2>
            <p className="mt-2 text-muted-foreground text-lg">Crafting memorable brands that stand out from the competition.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandingItems.map((item, index) => (
                 <Card key={item.id} className={cn(
                    "overflow-hidden group",
                 )}>
                    <Link href={`/portfolio/${item.id}`}>
                        <CardContent className="p-0">
                            <div className={cn(
                                "w-full bg-muted overflow-hidden",
                                 (index === 0 || index === 3) ? "aspect-[16/9]" : "aspect-square",
                                )}>
                                <Image
                                    src={item.image.imageUrl}
                                    alt={item.title}
                                    data-ai-hint={item.image.imageHint}
                                    width={800}
                                    height={450}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-primary">{item.service}</p>
                            </div>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
      </section>

    </div>
  );
}
