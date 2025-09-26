
'use client';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

type Service = {
    title: string;
    description: string;
    process: string;
    benefits: string;
    results: string;
    slug: string;
}

export function ServiceCard({ service }: { service: Service }) {
    const cardVariants = {
        offscreen: {
            opacity: 0,
            y: 20
        },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
        >
            <Card className="overflow-hidden bg-card">
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
        </motion.div>
    );
}
