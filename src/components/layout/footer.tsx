
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "/about", label: "Our Story" },
    { href: "/services", label: "What We Do" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Connect" },
    { href: "/documentation", label: "Hub Documentation" },
];

const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms & Conditions" },
    { href: "/cancellation-and-refund-policy", label: "Cancellation & Refund Policy" },
    { href: "/shipping-policy", label: "Shipping Policy" },
    { href: "/contact", label: "Contact Us" },
    { href: "/admin-login", label: "Admin" },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="space-y-4 md:col-span-1">
                <Logo />
                <p className="text-sm text-muted-foreground">
                    Your partner in digital excellence. We build, market, and grow.
                </p>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild><Link href="http://instagram.com/saasnext"><Instagram className="h-4 w-4" /></Link></Button>
                    <Button variant="ghost" size="icon" asChild><Link href="https://www.facebook.com/profile.php?id=100095196226560"><Facebook className="h-4 w-4" /></Link></Button>
                    <Button variant="ghost" size="icon" asChild><Link href="https://x.com/Saasnext_db?t=fVDtCuBlY0FtNBWUofEl6A&s=09"><Twitter className="h-4 w-4" /></Link></Button>
                    <Button variant="ghost" size="icon" asChild><Link href="https://www.linkedin.com/company/saasnext-deepak-bagada/"><Linkedin className="h-4 w-4" /></Link></Button>
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
                        {navLinks.slice(3, 5).map(link => (
                            <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline font-semibold mb-2">Legal</h4>
                    <ul className="space-y-2">
                        {legalLinks.map(link => (
                            <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground max-w-7xl mx-auto">
            <p>
                Made by <a href="https://deepakbagada.in/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Deepak Bagada</a>
            </p>
        </div>
      </div>
    </footer>
  );
}
