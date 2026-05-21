'use client';

import { PlusCircle, CreditCard, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuickActionBar({ 
  onNewRequest, 
  onScheduleCall 
}: { 
  onNewRequest: () => void;
  onScheduleCall: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        onClick={onNewRequest}
        className="h-11 rounded-xl bg-accent px-6 text-sm font-bold hover:bg-accent/90"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Request
      </Button>
      <Button asChild variant="outline" className="h-11 rounded-xl px-6 text-sm border-white/10 bg-white/5">
        <Link href="/client/billing">
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Invoice
        </Link>
      </Button>
      <Button 
        onClick={onScheduleCall}
        variant="outline" 
        className="h-11 rounded-xl px-6 text-sm border-white/10 bg-white/5"
      >
        <CalendarClock className="mr-2 h-4 w-4" />
        Schedule Call
      </Button>
    </div>
  );
}
