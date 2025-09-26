
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
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch in Junagadh</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a project in mind or just want to say hello? We'd love to hear from you. We are based in Junagadh and serve clients locally and worldwide.
        </p>
      </section>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form and our Junagadh team will get back to you shortly.</CardDescription>
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
                <Textarea id="message" name="message" placeholder="How can we help your Junagadh business?" required />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
            <div className="space-y-4 text-lg">
                <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-primary"/>
                    <a href="mailto:connect@saasnext.in" className="text-muted-foreground hover:text-primary">connect@saasnext.in</a>
                </div>
                <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-primary"/>
                    <span className="text-muted-foreground">+91 7016179234</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
