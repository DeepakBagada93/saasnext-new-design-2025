'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Megaphone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/supabase/provider';
import { useCollection } from '@/supabase/hooks/use-collection';
import { useDoc } from '@/supabase/hooks/use-doc';

import { OnboardingChecklist } from './_components/OnboardingChecklist';
import { QuickActionBar } from './_components/QuickActionBar';
import { ProjectStatusCard } from './_components/ProjectStatusCard';

const quickServices = [
  {
    title: 'Website',
    description: 'Launch, redesign, landing page, portfolio, or business site.',
    icon: Code2,
  },
  {
    title: 'AI Automation',
    description: 'Chatbot, lead agent, workflow automation, or smart support.',
    icon: Bot,
  },
  {
    title: 'Marketing',
    description: 'Lead generation, SEO, ads, conversion pages, and content.',
    icon: Megaphone,
  },
];

const setupSteps = [
  'Choose what you need',
  'Tell us your goal',
  'Get a clear action plan',
];

function firstName(name?: string | null) {
  return name?.split(' ')[0] || 'there';
}

export default function ClientDashboardPage() {
  const { user } = useUser();

  const { data: profileSnapshot, isLoading: loadingProfile } = useDoc(
    user?.id ? { table: 'client_profiles', id: user.id } : null
  );
  const profile = profileSnapshot?.data?.() || null;

  const [projectsSnapshot, loadingProjects] = useCollection(
    user?.id ? { table: 'projects', eq: { column: 'client_id', value: user.id } } : null
  );

  const [requestsSnapshot, loadingRequests] = useCollection(
    user?.id ? { table: 'service_requests', eq: { column: 'client_id', value: user.id } } : null
  );

  const projects = projectsSnapshot?.docs || [];
  const requests = requestsSnapshot?.docs || [];
  const activeProject = projects.find((project: any) => project.status !== 'Completed') || projects[0];
  const latestRequest = requests[0];
  const loading = loadingProfile || loadingProjects || loadingRequests;

  return (
    <div className="min-h-[calc(100vh-5rem)] space-y-6 pb-8">
      {/* Integrated Onboarding Flow */}
      <OnboardingChecklist profile={profile} />

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#070707]">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8 p-5 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              20 Second Setup
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                Hi {firstName(user?.user_metadata?.full_name)}, let us make this simple.
              </h1>
              <p className="text-lg leading-relaxed text-neutral-400">
                Choose a service, tell us the business goal, and we will turn it into a clear plan. No long forms. No confusion.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {setupSteps.map((step, index) => (
                <div key={step} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold">{step}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions Integration */}
            <QuickActionBar />
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-5 sm:p-8 lg:border-l lg:border-t-0">
            {/* Modular Status Card */}
            <ProjectStatusCard 
              project={activeProject} 
              request={latestRequest} 
              loading={loading} 
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickServices.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.title}
              href="/client/dashboard"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-accent/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-headline text-xl font-bold">{service.title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <div className="mt-5 flex items-center text-sm font-bold text-accent">
                Select this <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <Card className="border-white/10 bg-white/[0.03]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              What Happens After You Start
            </CardTitle>
            <CardDescription>A simple handoff from your idea to our execution team.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-sm font-bold">We review</p>
              <p className="mt-1 text-sm text-muted-foreground">Your goal, business, and timeline.</p>
            </div>
            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-sm font-bold">We suggest</p>
              <p className="mt-1 text-sm text-muted-foreground">The best service, budget, and roadmap.</p>
            </div>
            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-sm font-bold">We execute</p>
              <p className="mt-1 text-sm text-muted-foreground">Design, development, automation, or marketing.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageCircle className="h-5 w-5 text-accent" />
              Not Sure?
            </CardTitle>
            <CardDescription>Tell us in plain language. We will guide the rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="h-12 w-full bg-white text-black hover:bg-neutral-200">
              <Link href="/client/dashboard">Describe My Goal</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full">
              <Link href="/client/dashboard">Talk to an Expert</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
