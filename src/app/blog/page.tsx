import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-20">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">The SaaSNext Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights on marketing, web development, AI, and business growth from our team of experts.
        </p>
      </section>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <Link href={`/blog/${post.slug}`}>
              <CardHeader className="p-0">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={post.image.imageUrl}
                    alt={post.title}
                    data-ai-hint={post.image.imageHint}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{post.excerpt}</CardDescription>
                <CardFooter className="p-0 mt-4 flex justify-between items-center">
                  <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight />
                  </Button>
                </CardFooter>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
