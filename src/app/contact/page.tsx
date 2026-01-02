'use client';

import { useActionState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Send } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from './actions';
import { AnimatedHeadline } from '@/components/animated-headline';
import { TextReveal } from '@/components/text-reveal';

export default function ContactPage() {
  const { toast } = useToast();

  const initialState = {
    message: '',
    success: false,
  };

  const [state, formAction] = useActionState(sendContactEmail, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <AnimatedHeadline
          words={['Junagadh', 'Gujarat', 'The World']}
          prefix="Get in Touch in"
          suffix="."
          className="font-headline text-4xl md:text-5xl font-bold tracking-tighter"
        />
        <TextReveal>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? We'd love to hear from you. As the best digital marketing agency in Junagadh, we are ready to serve clients locally and worldwide with our top-notch web design and AI solutions.
          </p>
        </TextReveal>
      </section>

      <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form and our Junagadh team will get back to you shortly to discuss our lead generation and web development services.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="How can our web development company in Junagadh help you?" required rows={5} />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8 row-start-1 md:row-auto">
          <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
          <div className="space-y-4 text-lg">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <a href="mailto:connect@saasnext.in" className="text-muted-foreground hover:text-primary">connect@saasnext.in</a>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <span className="text-muted-foreground">+91 7016179234</span>
            </div>
          </div>
          <div className="pt-6">
            <h3 className="font-headline text-2xl font-bold">Our Location</h3>
            <TextReveal>
              <p className="text-muted-foreground mt-2">We are proudly based in the vibrant city of Junagadh, ready to collaborate with local and global partners. Looking for a web developer near me in Junagadh? You've found us.</p>
            </TextReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
