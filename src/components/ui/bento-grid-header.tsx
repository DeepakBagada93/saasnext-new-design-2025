import React from "react";
import { cn } from "@/lib/utils";

export const BentoGridHeader = ({ tags }: { tags?: string[] }) => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden flex flex-col justify-end p-4 group-hover/bento:scale-105 transition-transform duration-200">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-50" />

            {/* Hover Gradient Overlay - More Vibrant */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover/bento:animate-shine" />

            {/* Content (Tags) - Always Visible but Enhanced on Hover */}
            <div className="relative z-10 transition-all duration-300">
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/40 dark:bg-black/40 text-neutral-700 dark:text-neutral-200 rounded-md border border-white/20 backdrop-blur-md shadow-sm group-hover/bento:bg-white/60 dark:group-hover/bento:bg-black/60 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
