"use client"
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  title,
  description,
  href,
  icon,
  className,
  background,
}: {
  title: string;
  description:string;
  href: string;
  icon: React.ReactNode;
  className?: string;
  background?: React.ReactNode;
}) => {
  return (
    <div
      key={title}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "dark:bg-black/80 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        "transform-gpu animate-fade-in-up",
        className,
      )}
    >
      {background}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-4">
        {icon}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="max-w-lg text-muted-foreground">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none z-10 flex-col items-center justify-center p-6 pt-0 text-sm font-medium text-gray-500 opacity-0 transition-all duration-300 group-hover:flex group-hover:opacity-100",
        )}
      >
        <Button
            variant="ghost"
            asChild
            size="sm"
            className="pointer-events-auto"
        >
            <Link href={href}>
                 Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/10 dark:group-hover:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };
