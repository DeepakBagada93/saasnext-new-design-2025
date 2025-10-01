
import { AnimatedHeadline } from "@/components/animated-headline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <AnimatedHeadline
          words={["Trends", "Strategies", "Knowledge"]}
          prefix="Insights &"
          suffix="."
          className="font-headline text-4xl md:text-6xl font-bold tracking-tighter"
        />
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Stay ahead of the curve with our latest articles, tips, and industry analysis from the SaaSNext team.
        </p>
      </section>

      <section className="mt-16 max-w-2xl mx-auto">
        <Card>
            <CardContent className="p-10 text-center">
                <Rss className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-headline text-2xl font-bold">Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                    We're currently writing some amazing content to share with you. Please check back later for our latest insights and articles!
                </p>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
