import React from "react";
import { cn } from "@/lib/utils";

export const BentoGridHeader = ({ tags }: { tags?: string[] }) => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden flex flex-col justify-end p-4 group-hover/bento:scale-105 transition-transform duration-200">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300" />

            {/* Content (Tags) */}
            <div className="relative z-10 opacity-0 group-hover/bento:opacity-100 transition-all duration-300 translate-y-4 group-hover/bento:translate-y-0">
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white rounded-sm border border-white/20 backdrop-blur-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Default State Pattern */}
            <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-40 group-hover/bento:opacity-10 transition-opacity duration-300" />
        </div>
    );
};
