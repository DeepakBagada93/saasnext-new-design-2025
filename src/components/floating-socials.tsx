"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, MessageCircle, Phone, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Custom WhatsApp Icon since Lucide might not have the brand one
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.58 20.16 9.17 19.76 7.89 19L7.59 18.82L4.47 19.64L5.3 16.6L5.11 16.29C4.26 14.93 3.81 13.37 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.61 14.9C16.36 14.78 15.14 14.18 14.91 14.09C14.68 14.01 14.51 13.97 14.34 14.22C14.17 14.47 13.69 15.03 13.54 15.2C13.4 15.37 13.25 15.39 13 15.26C12.75 15.14 11.94 14.87 10.99 14.02C10.25 13.36 9.75 12.55 9.6 12.3C9.46 12.05 9.59 11.91 9.71 11.79C9.83 11.67 9.97 11.49 10.09 11.35C10.22 11.21 10.26 11.11 10.34 10.94C10.42 10.77 10.38 10.63 10.32 10.51C10.26 10.38 9.76 9.16 9.55 8.66C9.35 8.17 9.14 8.23 9 8.23C8.87 8.22 8.7 8.22 8.53 8.22C8.36 8.22 8.08 8.29 7.85 8.54C7.62 8.79 6.98 9.39 6.98 10.61C6.98 11.83 7.87 13.01 8 13.18C8.13 13.35 9.8 15.93 12.35 17.03C12.96 17.29 13.43 17.45 13.8 17.57C14.45 17.77 15.04 17.75 15.51 17.68C16.03 17.6 17.07 17.05 17.29 16.42C17.51 15.8 17.51 15.26 17.44 15.15C17.38 15.04 17.21 14.97 16.96 14.85C16.71 14.73 16.61 14.9 16.61 14.9Z" />
    </svg>
);

interface SocialLink {
    icon: React.ElementType;
    href: string;
    label: string;
    color: string;
}

const socialLinks: SocialLink[] = [
    {
        icon: WhatsAppIcon,
        href: "https://wa.me/917016179234",
        label: "WhatsApp",
        color: "bg-green-500",
    },
    {
        icon: Instagram,
        href: "https://instagram.com/saasnext",
        label: "Instagram",
        color: "bg-pink-500",
    },
    {
        icon: Linkedin,
        href: "https://www.linkedin.com/company/saasnext-deepak-bagada/",
        label: "LinkedIn",
        color: "bg-blue-600",
    },
    {
        icon: Phone,
        href: "tel:+917016179234",
        label: "Call Us",
        color: "bg-indigo-500",
    },
];

export function FloatingSocials() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={cn(
                "fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 p-3 rounded-full",
                "bg-black/20 backdrop-blur-md border border-white/10 shadow-xl",
                "transition-all duration-300 hover:bg-black/40"
            )}
        >
            {socialLinks.map((social, index) => (
                <motion.div
                    key={social.label}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group"
                >
                    <AnimatePresence>
                        {hoveredIndex === index && (
                            <motion.div
                                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                                animate={{ opacity: 1, x: 20, scale: 1 }}
                                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                                className={cn(
                                    "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap shadow-lg",
                                    social.color
                                )}
                            >
                                {social.label}
                                {/* Little arrow pointing left */}
                                <div className={cn("absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45", social.color)} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/80 text-white shadow-md border border-neutral-800",
                            "transition-all duration-300 group-hover:scale-110",
                            hoveredIndex === index ? "border-transparent " + social.color : "hover:border-neutral-600"
                        )}
                        aria-label={social.label}
                    >
                        <social.icon className={cn("w-5 h-5 transition-colors duration-300", hoveredIndex === index ? "text-white" : "text-neutral-400 group-hover:text-white")} />
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
