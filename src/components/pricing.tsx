"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

export const Pricing = () => {
    return (
        <section id="pricing" className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
                    <p className="text-lg text-muted-foreground">
                        Choose the perfect plan for your business needs. No hidden fees, just results.
                    </p>
                </div>

                <Tabs defaultValue={pricingPlans[0].category} className="w-full">
                    <div className="flex justify-center mb-12">
                        <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4 h-auto p-1">
                            {pricingPlans.map((plan) => (
                                <TabsTrigger
                                    key={plan.category}
                                    value={plan.category}
                                    className="text-sm md:text-base py-3 px-4 whitespace-normal h-full"
                                >
                                    {plan.category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {pricingPlans.map((category) => (
                        <TabsContent key={category.category} value={category.category}>
                            <div className="grid md:grid-cols-3 gap-8">
                                {category.plans.map((plan, index) => (
                                    <motion.div
                                        key={plan.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Card className={`flex flex-col h-full border-2 ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-transparent shadow-md hover:border-primary/50 transition-colors'}`}>
                                            {plan.popular && (
                                                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2">
                                                    Most Popular
                                                </div>
                                            )}
                                            <CardHeader>
                                                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                                                <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <div className="mb-6">
                                                    <span className="text-3xl font-bold">{plan.price}</span>
                                                    <span className="text-muted-foreground block text-sm mt-1">({plan.priceUsd})</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {plan.features.map((feature) => (
                                                        <li key={feature} className="flex items-start gap-2">
                                                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                                                    <Link href="/contact">{plan.cta}</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};
