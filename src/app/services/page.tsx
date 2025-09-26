
'use client';
import { useState, useRef, useEffect } from 'react';
import { services } from "@/lib/data";
import { ServiceCard } from '@/components/service-card';
import { ServicesNav } from '@/components/services-nav';


export default function ServicesPage() {
    const [activeService, setActiveService] = useState<string>(services[0].slug);
    const serviceRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveService(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        const currentRefs = serviceRefs.current.filter(ref => ref !== null);
        currentRefs.forEach(ref => observer.observe(ref!));

        return () => {
             currentRefs.forEach(ref => observer.unobserve(ref!));
        };
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-20">
            <section className="text-center max-w-3xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Digital Services in Junagadh</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                We offer a comprehensive suite of digital services in Junagadh, designed to elevate your brand and accelerate your growth in the local market.
                </p>
            </section>

            <div className="mt-20 max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12">
                <aside className="hidden lg:block lg:col-span-3">
                   <ServicesNav services={services} activeService={activeService} />
                </aside>

                <div className="lg:col-span-9 space-y-12">
                    {services.map((service, index) => (
                        <section
                            key={service.slug}
                            id={service.slug}
                            ref={(el) => (serviceRefs.current[index] = el)}
                            className="scroll-mt-24"
                        >
                            <ServiceCard service={service} />
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
