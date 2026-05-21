'use client';

import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href: string;
  label: string;
}

interface OnboardingChecklistProps {
  profile: any;
}

export function OnboardingChecklist({ profile }: OnboardingChecklistProps) {
  // In a real app, these would be derived from the profile/database
  const steps: Step[] = [
    {
      id: "profile",
      title: "Complete your company profile",
      description: "Tell us more about your business to help us tailor our services.",
      completed: !!profile?.company_name,
      href: "/client/settings",
      label: "Update Settings",
    },
    {
      id: "request",
      title: "Submit your first service request",
      description: "Let us know what you need help with first.",
      completed: false, // This would check if service_requests count > 0
      href: "/client/dashboard", // ideally opens a drawer or inline form
      label: "Start Request",
    },
    {
      id: "meeting",
      title: "Schedule your intro call",
      description: "Meet the team and discuss your roadmap.",
      completed: false,
      href: "/client/dashboard",
      label: "Book Call",
    },
    {
      id: "invoice",
      title: "Review your welcome invoice",
      description: "Check your initial setup or retainer details.",
      completed: false,
      href: "/client/billing",
      label: "View Billing",
    },
  ];

  const allCompleted = steps.every(s => s.completed);

  if (allCompleted && profile?.has_completed_onboarding) return null;

  return (
    <Card className="border-accent/20 bg-accent/5">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to SaaSNext! 🚀</CardTitle>
        <CardDescription>
          Follow these quick steps to get your workspace fully ready.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "relative flex flex-col justify-between rounded-xl border p-4 transition",
              step.completed 
                ? "border-emerald-500/30 bg-emerald-500/5" 
                : "border-white/10 bg-white/5"
            )}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2">
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <h3 className="text-sm font-bold">{step.title}</h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {!step.completed && (
              <Button asChild variant="link" className="h-auto p-0 text-accent justify-start text-xs font-bold">
                <Link href={step.href}>
                  {step.label} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
