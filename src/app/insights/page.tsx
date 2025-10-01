
import { AnimatedHeadline } from "@/components/animated-headline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Post = {
    _id: string;
    title: string;
    slug: string;
    brief: string;
    coverImage: string;
    dateAdded: string;
};

async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch('https://artechway.com/api/posts', { next: { revalidate: 3600 } });
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}


export default async function InsightsPage() {
  const posts = await getPosts();

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

      <section className="mt-16 max-w-4xl mx-auto">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Card key={post._id} className="group overflow-hidden">
                <a href={`https://artechway.com/post/${post.slug}`} target="_blank" rel="noopener noreferrer">
                  <div className="aspect-video w-full bg-muted overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.brief}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                       <span>{new Date(post.dateAdded).toLocaleDateString()}</span>
                       <div className="flex items-center group-hover:text-primary">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                       </div>
                    </div>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-10 text-center">
              <Rss className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-headline text-2xl font-bold">No Posts Found</h3>
              <p className="text-muted-foreground mt-2">
                We're currently writing some amazing content. Please check back later for our latest insights and articles!
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
