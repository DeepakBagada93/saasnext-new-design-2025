'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/lib/data";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { cn } from "@/lib/utils";

export default function ClientServicesPage() {
    const [currency, setCurrency] = useState('INR');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Services & Pricing</h1>
                <p className="text-muted-foreground">
                    Explore our packages and find the perfect fit for your next project.
                </p>
            </div>

            {pricingPlans.map((category) => (
                <div key={category.category}>
                    <h2 className="font-headline text-2xl font-bold mb-6">{category.category}</h2>
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {category.plans.map(plan => (
                          <Card key={plan.title} className={cn(
                              "flex flex-col h-full",
                              plan.popular ? "border-primary ring-2 ring-primary" : "border"
                          )}>
                              {plan.popular && <div className="text-center py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-t-lg">Most Popular</div>}
                              <CardHeader className="text-center">
                                  <CardTitle className="text-2xl font-headline">{plan.title}</CardTitle>
                                  <CardDescription>{plan.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow space-y-6">
                                  <div className="text-center">
                                      <span className="text-3xl font-bold">
                                          {plan.price.includes('Custom') ? 'Custom' : (currency === 'INR' ? plan.price : plan.priceUsd)}
                                      </span>
                                      {!plan.price.includes('Custom') && <span className="text-muted-foreground">/mo</span>}
                                  </div>
                                  <ul className="space-y-3 text-muted-foreground">
                                      {plan.features.map(feature => (
                                          <li key={feature} className="flex items-start">
                                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                              <span>{feature}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </CardContent>
                              <CardFooter>
                                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                                      <Link href={'/client/requests/new'}>Request This Service</Link>
                                  </Button>
                              </CardFooter>
                          </Card>
                      ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
