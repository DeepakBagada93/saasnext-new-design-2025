
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 pt-32 md:pt-40 lg:pt-48">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">About SaaSNext - Your Junagadh Digital Partner</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We are a passionate, Junagadh-based team of developers, designers, and marketers dedicated to helping local businesses succeed in the digital world.
        </p>
      </section>
      
      <section className="mt-16 max-w-4xl mx-auto">
        <div className="space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold">Our Mission & Vision</h2>
            <p className="text-muted-foreground text-lg">
              Our mission is to provide innovative and effective digital solutions that drive growth for our clients in Junagadh and beyond. We envision a world where every business, regardless of size, can leverage the power of technology to its fullest potential.
            </p>
            <p className="text-muted-foreground text-lg">
              We believe in partnership, transparency, and a results-driven approach. Your success is our success, and we're committed to building long-term relationships based on trust and mutual respect.
            </p>
        </div>
      </section>
      
      <section className="mt-20 text-center bg-card p-12 rounded-lg">
        <h2 className="font-headline text-3xl font-bold">Why Choose SaaSNext in Junagadh?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
                <h3 className="font-headline text-xl font-semibold">Local Expertise</h3>
                <p className="text-muted-foreground">Our team consists of industry veterans with proven track records in the Junagadh market.</p>
            </div>
            <div className="space-y-2">
                <h3 className="font-headline text-xl font-semibold">Custom Solutions</h3>
                <p className="text-muted-foreground">We don't do one-size-fits-all. Every project is tailored to your unique needs.</p>
            </div>
            <div className="space-y-2">
                <h3 className="font-headline text-xl font-semibold">Dedicated Support</h3>
                <p className="text-muted-foreground">We're with you every step of the way, from initial concept to post-launch support.</p>
            </div>
        </div>
        <Button asChild size="lg" className="mt-12 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/contact">
            Work With Us <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
