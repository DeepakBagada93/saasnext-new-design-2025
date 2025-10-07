
'use client';
import { useState, useRef, useEffect } from 'react';
import { services } from "@/lib/data";
import { ServiceCard } from '@/components/service-card';
import { ServicesNav } from '@/components/services-nav';
import { AnimatedHeadline } from '@/components/animated-headline';


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
        <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
             <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
                <AnimatedHeadline
                    words={['Growth', 'Engagement', 'Results']}
                    prefix="Digital Services that Drive"
                    suffix="."
                    className="font-headline text-4xl md:text-6xl font-bold tracking-tighter"
                />
                <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                    We offer a comprehensive suite of digital services in Junagadh, including web development, SEO, and lead generation services, designed to elevate your brand and accelerate your growth in the local market.
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
             <section className="mt-24 max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Your Full-Service Digital Partner in Junagadh</h2>
                <p className="mt-4 text-muted-foreground text-lg">
                    As a premier digital marketing company in Junagadh, we offer end-to-end solutions. From custom website development to targeted B2B lead generation, our services are designed to deliver results. Whether you need a WordPress developer, ecommerce solutions, or a comprehensive social media strategy, our team is the best digital marketing agency in Junagadh to help your small business succeed.
                </p>
            </section>
            <section className="mt-16 max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Local Presence, Global Standards</h2>
                <p className="mt-4 text-muted-foreground text-lg">
                    When you search for a "web developer near me in Junagadh," you're looking for a local team that understands the market. As a top web design company in Junagadh, we provide that local expertise combined with world-class website development services. We build custom websites that are not only affordable but also powerful enough to compete on a global scale.
                </p>
            </section>
             <section className="mt-16 max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Driving Growth with Performance Marketing</h2>
                <p className="mt-4 text-muted-foreground text-lg">
                    Our SMM services in Junagadh are built for performance. As a data-driven social media marketing agency, we go beyond simple posting. We manage targeted Facebook and Instagram marketing campaigns that deliver real, measurable results, making us the digital advertising agency Junagadh businesses trust for growth.
                </p>
            </section>
        </div>
    );
}
