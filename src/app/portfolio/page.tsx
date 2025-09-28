
import { AnimatedHeadline } from "@/components/animated-headline";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { portfolioItems } from "@/lib/data";

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

      <div className="mt-16 max-w-7xl mx-auto">
        <PortfolioGallery items={portfolioItems} />
      </div>
    </div>
  );
}
