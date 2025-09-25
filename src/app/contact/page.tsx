import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help your Junagadh business?" />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
            <div className="space-y-4 text-lg">
                <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-primary"/>
                    <a href="mailto:contact@saasnext.com" className="text-muted-foreground hover:text-primary">contact@saasnext.com</a>
                </div>
                <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-primary"/>
                    <span className="text-muted-foreground">(123) 456-7890</span>
                </div>
                <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1"/>
                    <span className="text-muted-foreground">123 Digital Ave, Junagadh, 362001</span>
                </div>
            </div>
            <div className="aspect-video w-full">
              {/* In a real app, this would be a map component like react-google-maps */}
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map of our Junagadh office would be here.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
