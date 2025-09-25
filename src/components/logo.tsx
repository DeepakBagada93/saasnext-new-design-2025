import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image src="/saaasnext.png" alt="SaaSNext Logo" width={132} height={32} />
      
    </Link>
  );
}
