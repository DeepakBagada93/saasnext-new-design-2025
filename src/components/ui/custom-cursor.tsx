"use client";

import { useCustomCursor } from "@/hooks/use-custom-cursor";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const { x, y, isHovering } = useCustomCursor();
  
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
            "pointer-events-none fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform",
            isHovering ? "scale-0" : "scale-100"
        )}
        style={{ left: `${x}px`, top: `${y}px` }}
      />
      <div
        className={cn(
            "pointer-events-none fixed z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary transition-transform",
            isHovering ? "scale-150 opacity-50" : "scale-100 opacity-100"
        )}
        style={{ left: `${x}px`, top: `${y}px` }}
      />
    </>
  );
}
