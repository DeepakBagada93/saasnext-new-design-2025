'use client';

import { PlusCircle, CreditCard, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuickActionBar() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="h-11 rounded-xl bg-accent px-6 text-sm font-bold hover:bg-accent/90">
        <Link href="/client/dashboard">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Request
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-11 rounded-xl px-6 text-sm border-white/10 bg-white/5">
        <Link href="/client/billing">
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Invoice
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-11 rounded-xl px-6 text-sm border-white/10 bg-white/5">
        <Link href="/client/dashboard">
          <CalendarClock className="mr-2 h-4 w-4" />
          Schedule Call
        </Link>
      </Button>
    </div>
  );
}
