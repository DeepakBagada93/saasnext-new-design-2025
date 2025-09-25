"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 ml-10 text-sm font-medium">
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
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Client Login</Link>
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/register">Register</Link>
            </Button>
          </nav>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
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
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Client Login</Link>
                    </Button>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                    </Button>
                  </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
