'use client';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Phone, FileText, Rocket, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ProjectProgress } from './project-progress';
import { useDoc } from '@/supabase/hooks/use-doc';
import { ProjectTimeline } from './project-timeline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Milestone = {
    name: string;
    date: string;
    status: 'Completed' | 'Active' | 'Upcoming';
}

function WhatsappIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
    )
}

function NotionIcon(props: any) {
    return (
        <svg 
            {...props}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
        >
            <path d="M13.633 21.026L12 18.053V2.974h8.333v13.567l-2.018-3.026L19.528 17.5l-5.895 3.526zM5.333 2.974h5.667v18.052H5.333V2.974zm1.112 1.111v15.83h3.443V4.085H6.445z"/>
        </svg>
    )
}

export default function ProjectDetails({ id }: { id: string }) {
  const { data: projectSnapshot, isLoading: loading, error } = useDoc({ table: 'projects', id });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !projectSnapshot) {
    notFound();
  }

  const project = { id: projectSnapshot.id, ...projectSnapshot.data() };
  
  const getMilestoneStatus = (milestoneDate: string, projectStatus: string, allMilestones: Milestone[]): 'Completed' | 'Active' | 'Upcoming' => {
      const now = new Date();
      const date = new Date(milestoneDate);
      
      if (projectStatus === 'Completed' || date < now) {
          return 'Completed';
      }
      
      const upcomingMilestones = allMilestones
          .filter(m => new Date(m.date) >= now)
          .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (upcomingMilestones.length > 0 && upcomingMilestones[0].date === milestoneDate) {
          return 'Active';
      }
      
      return 'Upcoming';
  };

  const milestones: Milestone[] = project.milestones ? project.milestones.map((m: any) => ({
      ...m,
      status: getMilestoneStatus(m.date, project.status, project.milestones),
  })) : [
    // Fallback for older projects without milestones
    { name: 'Project Kick-off', date: project.timeline?.start, status: 'Completed' },
    { name: 'Final Delivery', date: project.timeline?.end, status: project.status === 'Completed' ? 'Completed' : 'Upcoming' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">
            Detailed view of your project's progress and updates.
            </p>
        </div>
        <Badge
            variant={project.status === 'Completed' ? 'secondary' : 'default'}
            className="text-lg px-4 py-1 w-fit"
        >
            {project.status}
        </Badge>
      </div>

      {project.status === 'Planning' && (
          <Card className="bg-blue-500/10 border-blue-500/20">
              <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-blue-500 p-2 rounded-lg text-white">
                      <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                      <CardTitle>Getting Started</CardTitle>
                      <CardDescription>Follow these steps to kick off your project successfully.</CardDescription>
                  </div>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-background border">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600">1</div>
                      <div>
                          <p className="font-semibold text-sm">Book Kick-off</p>
                          <p className="text-xs text-muted-foreground">Schedule a meeting to align on goals.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-background border">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600">2</div>
                      <div>
                          <p className="font-semibold text-sm">Submit Docs</p>
                          <p className="text-xs text-muted-foreground">Upload any branding or content assets.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-background border">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600">3</div>
                      <div>
                          <p className="font-semibold text-sm">Review Timeline</p>
                          <p className="text-xs text-muted-foreground">Confirm the delivery milestones below.</p>
                      </div>
                  </div>
              </CardContent>
          </Card>
      )}

      {project.status === 'Completed' && (
          <Card className="bg-emerald-500/10 border-emerald-500/20">
              <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-emerald-500 p-2 rounded-lg text-white">
                      <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                      <CardTitle>Project Successfully Completed!</CardTitle>
                      <CardDescription>Everything you need for your final handover.</CardDescription>
                  </div>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Handover Documents</h4>
                      <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-between" asChild>
                              <Link href="#">
                                  <span>Final Project Report</span>
                                  <FileText className="h-4 w-4" />
                              </Link>
                          </Button>
                          <Button variant="outline" className="w-full justify-between" asChild>
                              <Link href="#">
                                  <span>Credentials & Access</span>
                                  <ShieldCheck className="h-4 w-4" />
                              </Link>
                          </Button>
                      </div>
                  </div>
                  <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Next Steps</h4>
                      <div className="space-y-2">
                          <Button variant="default" className="w-full bg-accent hover:bg-accent/90" asChild>
                              <Link href="/client/dashboard">Start Maintenance Plan</Link>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                              <Link href="/contact">Leave a Review</Link>
                          </Button>
                      </div>
                  </div>
              </CardContent>
          </Card>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Project ID: {project.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <ProjectProgress
                    start={project.timeline?.start}
                    end={project.timeline?.end}
                    status={project.status}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                        Start Date:{' '}
                        {project.timeline?.start && new Date(project.timeline.start).toLocaleDateString()}
                    </span>
                    </div>
                    <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                        End Date: {project.timeline?.end && new Date(project.timeline.end).toLocaleDateString()}
                    </span>
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                    <CardDescription>Key milestones and delivery dates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectTimeline milestones={milestones} />
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                    <CardDescription>Get in touch with the team.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {project.quick_call_number && (
                         <Button asChild variant="outline" className="w-full justify-start">
                            <a href={`tel:${project.quick_call_number}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                {project.quick_call_number}
                            </a>
                        </Button>
                    )}
                    {project.whatsapp_link && (
                        <Button asChild variant="outline" className="w-full justify-start">
                            <Link href={project.whatsapp_link} target="_blank">
                                <WhatsappIcon className="mr-2 h-4 w-4" />
                                Join WhatsApp Group
                            </Link>
                        </Button>
                    )}
                    {(!project.quick_call_number && !project.whatsapp_link) && (
                        <p className="text-sm text-muted-foreground text-center py-4">No quick contact methods have been added for this project.</p>
                    )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Project Resources</CardTitle>
                    <CardDescription>Essential documents and links.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {project.notion_link && (
                         <Button asChild variant="outline" className="w-full justify-start">
                            <Link href={project.notion_link} target="_blank">
                                <NotionIcon className="mr-2 h-4 w-4" />
                                Open Notion Page
                            </Link>
                        </Button>
                    )}
                    {project.google_doc_link && (
                        <Button asChild variant="outline" className="w-full justify-start">
                            <Link href={project.google_doc_link} target="_blank">
                                <FileText className="mr-2 h-4 w-4" />
                                Open Google Doc
                            </Link>
                        </Button>
                    )}
                    {(!project.notion_link && !project.google_doc_link) && (
                        <p className="text-sm text-muted-foreground text-center py-4">No resources have been added for this project yet.</p>
                    )}
                </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>
                Latest news from our team.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {project.updates && project.updates.length > 0 ? (
                <div className="flex flex-col gap-8">
                    {project.updates.map((update: any, index: number) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mt-1" />
                        {index < project.updates.length - 1 && (
                            <div className="w-px flex-1 bg-border" />
                        )}
                        </div>
                        <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            <span>
                            {new Date(update.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            </span>
                        </div>
                        <p className="text-foreground">{update.text}</p>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No updates have been posted for this project yet.</p>
                    <p className="text-sm mt-1">Check back soon!</p>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
