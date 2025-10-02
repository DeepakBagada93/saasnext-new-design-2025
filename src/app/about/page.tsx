
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Handshake, Target, CheckCircle, Search, DraftingCompass, Code, Rocket } from "lucide-react";
import { AnimatedHeadline } from "@/components/animated-headline";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


const coreValues = [
    {
        icon: <Handshake className="h-8 w-8 text-primary" />,
        title: "Partnership",
        description: "We're more than a vendor; we're an extension of your team, deeply invested in your success."
    },
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: "Results-Driven",
        description: "Your goals are our metric for success. We focus on delivering measurable outcomes, not just outputs."
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-primary" />,
        title: "Transparency",
        description: "We believe in open communication, clear timelines, and building relationships based on trust."
    }
];

const whyChooseUsItems = [
    {
        title: "Local Junagadh Expertise",
        description: "Our team consists of industry veterans with proven track records in the Junagadh market. As a leading web design company in Junagadh, we understand the local landscape."
    },
    {
        title: "Custom-Tailored Solutions",
        description: "We don't do one-size-fits-all. Every custom website development Junagadh project is tailored to your unique business needs."
    },
    {
        title: "Dedicated Long-Term Support",
        description: "We're with you every step of the way, from initial concept to post-launch support and beyond for all our website development services in Junagadh."
    }
];

const processSteps = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Discovery & Strategy",
      description: "We dive deep into your goals and market to build a data-driven strategy."
    },
    {
      icon: <DraftingCompass className="h-8 w-8 text-primary" />,
      title: "Design & Prototyping",
      description: "We create intuitive, user-centric designs and mockups for your approval."
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Development & QA",
      description: "We build your project using modern tech, with rigorous testing for quality."
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Launch & Optimization",
      description: "We deploy your project and monitor its performance for continuous improvement."
    }
  ];


export default function AboutPage() {
    const aboutHeroImage = { imageUrl: '/saasnext-website-development.png', imageHint: 'team photo' };

  return (
    <div className="flex flex-col">
        <section className="pt-32 md:pt-48 pb-20 md:pb-28">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <AnimatedHeadline
                        words={['Grow', 'Innovate', 'Succeed']}
                        prefix="We're SaaSNext. We help you"
                        suffix="."
                        className="font-headline text-5xl md:text-7xl font-bold tracking-tighter"
                    />
                    <p className="text-xl md:text-2xl text-muted-foreground">
                        A passionate, Junagadh-based digital marketing company dedicated to crafting solutions that drive growth for businesses just like yours.
                    </p>
                </div>
                 <div className="relative h-96 w-full">
                    {aboutHeroImage && (
                        <Image src={aboutHeroImage.imageUrl} alt="SaaSNext Team" data-ai-hint={aboutHeroImage.imageHint} fill className="object-cover rounded-lg shadow-lg"/>
                    )}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card">
            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Story: From Junagadh to the Digital Frontier</h2>
                <p className="text-lg text-muted-foreground">
                    Founded in the heart of Junagadh, SaaSNext was born from a simple observation: local businesses deserved world-class digital tools to compete and thrive. We started as a small team with a big vision—to bridge the gap between ambition and technology. Today, we're proud to be the trusted digital partner for companies in our hometown and beyond, offering the best digital marketing and web development services Junagadh has to offer.
                </p>
            </div>
        </section>

        <section className="py-20 md:py-28">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Core Values</h2>
                    <p className="mt-4 text-muted-foreground text-lg">These are the principles that guide every project, partnership, and decision we make as the best digital marketing agency in Junagadh.</p>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {coreValues.map((value) => (
                        <Card key={value.title} className="text-center p-8 border-t-4 border-primary">
                            {value.icon}
                            <h3 className="mt-4 font-headline text-2xl font-bold">{value.title}</h3>
                            <p className="mt-2 text-muted-foreground">{value.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      
        <section className="py-20 md:py-28 text-center bg-card">
            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Why Choose SaaSNext in Junagadh?</h2>
                <div className="mt-8 grid md:grid-cols-3 gap-8 text-left">
                    {whyChooseUsItems.map((item, index) => (
                        <div key={item.title} className="flex gap-4">
                            <div className="text-2xl font-bold text-primary mt-1">0{index + 1}</div>
                            <div>
                                <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                                <p className="text-muted-foreground mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button asChild size="lg" className="mt-12 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">
                    Work With Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                </Button>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Proven Process</h2>
                    <p className="mt-4 text-muted-foreground text-lg">We follow a transparent, four-step process to ensure project success and keep you involved at every stage.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {processSteps.map((step) => (
                        <Card key={step.title} className="p-6 text-center">
                            {step.icon}
                            <h3 className="mt-4 font-headline text-xl font-bold">{step.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}
