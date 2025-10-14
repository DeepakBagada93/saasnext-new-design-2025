
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/services", label: "What We Do" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Connect" },
];


export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full p-4">
      <div className="md:hidden flex h-14 items-center justify-between rounded-lg border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Logo />
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle><Logo /></SheetTitle>
                </SheetHeader>
                <div className="flex-1 flex flex-col p-4 space-y-4">
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map(({ href, label }) => (
                        <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname === href ? "text-primary" : "text-foreground/80"
                        )}
                        >
                        {label}
                        </Link>
                    ))}
                  </nav>
                  <div className="flex-grow"></div>
                  <div className="space-y-2">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                    </Button>
                  </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden md:flex max-w-5xl mx-auto h-16 items-center justify-between rounded-full border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Logo />
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-foreground/60"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end space-x-2">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full" asChild>
                <Link href="/register">Get Started</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
