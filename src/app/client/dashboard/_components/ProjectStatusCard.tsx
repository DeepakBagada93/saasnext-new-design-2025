'use client';

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface ProjectStatusCardProps {
  project?: any;
  request?: any;
  loading: boolean;
}

function getStatus(request?: any, project?: any) {
  if (project) {
    return {
      label: project.status || 'In Progress',
      title: project.name || project.title || 'Project active',
      description: 'Your workspace is ready. Open it anytime to see updates and next steps.',
      href: `/client/projects/${project.id}`,
      cta: 'Open Project',
    };
  }

  if (request) {
    return {
      label: request.status || 'Pending',
      title: request.service_type || 'Request received',
      description: 'We have your request. The team will review it and shape the next step.',
      href: '/client/dashboard',
      cta: 'View Request',
    };
  }

  return {
    label: 'Ready',
    title: 'Start in 20 seconds',
    description: 'Pick a service and share the goal. You do not need a detailed brief.',
    href: '/client/dashboard',
    cta: 'Start Now',
  };
}

export function ProjectStatusCard({ project, request, loading }: ProjectStatusCardProps) {
  const status = getStatus(request, project);

  return (
    <Card className="h-full border-white/10 bg-black/25">
      <CardHeader>
        <Badge variant="outline" className="w-fit border-accent/30 bg-accent/10 text-accent">
          {status.label}
        </Badge>
        <CardTitle className="text-2xl">{status.title}</CardTitle>
        <CardDescription>{status.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        ) : (
          <Button asChild variant="secondary" className="h-11 w-full">
            <Link href={status.href}>
              {status.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
