
'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Service = {
    title: string;
    slug: string;
}

export function ServicesNav({ services, activeService }: { services: Service[], activeService: string }) {
    return (
        <nav className="space-y-8">
            <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase opacity-50">Navigation</span>
                <h3 className="font-headline text-2xl font-bold text-white tracking-tight">Our Services</h3>
            </div>
            <ul className="space-y-4">
                {services.map(service => (
                    <li key={service.slug} className="relative">
                        <Link
                            href={`#${service.slug}`}
                            className={cn(
                                'group flex items-center gap-4 py-2 text-sm font-medium transition-all duration-300 outline-none',
                                activeService === service.slug
                                    ? 'text-primary pl-4'
                                    : 'text-neutral-500 hover:text-white'
                            )}
                        >
                            {activeService === service.slug && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute left-0 w-1 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(41,171,226,0.5)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="font-mono text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">
                                0{services.indexOf(service) + 1}
                            </span>
                            <span className="tracking-tight">{service.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

