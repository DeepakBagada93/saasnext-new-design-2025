import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "/about", label: "Our Story" },
    { href: "/services", label: "What We Do" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog",label: "Insights" },
    { href: "/contact", label: "Connect" },
    { href: "/admin-login", label: "Admin" },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-1">
                <Logo />
                <p className="text-sm text-muted-foreground">
                    Your partner in digital excellence. We build, market, and grow.
                </p>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild><Link href="#"><Github className="h-4 w-4" /></Link></Button>
                    <Button variant="ghost" size="icon" asChild><Link href="#"><Twitter className="h-4 w-4" /></Link></Button>
                    <Button variant="ghost" size="icon" asChild><Link href="#"><Linkedin className="h-4 w-4" /></Link></Button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
                <div>
                    <h4 className="font-headline font-semibold mb-2">Company</h4>
                    <ul className="space-y-2">
                        {navLinks.slice(0, 3).map(link => (
                            <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline font-semibold mb-2">Resources</h4>
                    <ul className="space-y-2">
                        {navLinks.slice(3).map(link => (
                            <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline font-semibold mb-2">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SaaSNext. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
