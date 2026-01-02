export const AnimatedSVG = () => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden flex items-center justify-center group-hover/bento:scale-105 transition-transform duration-200">
            <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-50" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-32 h-32 text-neutral-400/20 z-10"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15 15 0 0 1 10 10" className="animate-[spin_10s_linear_infinite] origin-center" />
                <path d="M12 22a15 15 0 0 1-10-10" className="animate-[spin_10s_linear_infinite_reverse] origin-center" />
                <path d="M2 12h20" className="animate-pulse" />
                <path d="M12 2v20" className="animate-pulse" />
            </svg>
        </div>
    );
};
