
'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Service = {
    title: string;
    slug: string;
}

export function ServicesNav({ services, activeService }: { services: Service[], activeService: string }) {
    return (
        <nav className="sticky top-28">
            <h3 className="font-headline text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
                {services.map(service => (
                    <li key={service.slug}>
                        <Link
                            href={`#${service.slug}`}
                            className={cn(
                                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                activeService === service.slug
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted'
                            )}
                        >
                            {service.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
