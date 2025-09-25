import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image src="/saasnext.png" alt="SaaSNext Logo" width={32} height={32} />
      <span className="font-headline text-2xl font-bold text-primary">
        SaaSNext
      </span>
    </Link>
  );
}
