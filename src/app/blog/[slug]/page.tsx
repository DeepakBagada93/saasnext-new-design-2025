import { blogPosts } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembers } from "@/lib/data";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const author = teamMembers.find(t => t.name === post.author);

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4">
          {author && (
            <Avatar>
              <AvatarImage src={author.image.imageUrl} alt={author.name} data-ai-hint={author.image.imageHint} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </header>
      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-8">
        <Image src={post.image.imageUrl} alt={post.title} data-ai-hint={post.image.imageHint} fill className="object-cover" />
      </div>
      <div
        className="prose dark:prose-invert max-w-none prose-h3:font-headline prose-p:text-muted-foreground prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
}
