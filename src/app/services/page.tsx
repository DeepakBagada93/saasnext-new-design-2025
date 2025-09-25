import { services } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We offer a comprehensive suite of digital services designed to elevate your brand and accelerate your growth.
        </p>
      </section>

      <div className="mt-16 space-y-12 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <section key={service.title} id={service.slug} className="scroll-mt-20">
            <Card className="overflow-hidden bg-card/50">
                <div className="p-8 md:p-12 space-y-4">
                  <h2 className="font-headline text-3xl font-bold">{service.title}</h2>
                  <p className="text-muted-foreground pb-4">{service.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 pt-4 border-t">
                    <div>
                      <h3 className="font-headline font-semibold text-lg mb-2">Our Process</h3>
                      <p className="text-muted-foreground text-sm">{service.process}</p>
                    </div>
                    <div>
                      <h3 className="font-headline font-semibold text-lg mb-2">Benefits & Results</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-primary shrink-0"/>
                          <span className="text-muted-foreground">{service.benefits}</span>
                        </li>
                         <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-primary shrink-0"/>
                          <span className="text-muted-foreground">{service.results}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
