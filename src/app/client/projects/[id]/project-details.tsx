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
import { Calendar, Clock, Phone } from 'lucide-react';
import { ProjectProgress } from './project-progress';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
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

export default function ProjectDetails({ id }: { id: string }) {
  const firestore = useFirestore();
  const projectRef = doc(firestore, 'projects', id);
  const [projectSnapshot, loading, error] = useDocument(projectRef);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !projectSnapshot?.exists()) {
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
    { name: 'Project Kick-off', date: project.timeline.start, status: 'Completed' },
    { name: 'Final Delivery', date: project.timeline.end, status: project.status === 'Completed' ? 'Completed' : 'Upcoming' },
  ];


  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground">
          Detailed view of your project's progress and updates.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>Project Overview</CardTitle>
                    <Badge
                    variant={project.status === 'Completed' ? 'secondary' : 'default'}
                    className="text-sm"
                    >
                    {project.status}
                    </Badge>
                </div>
                <CardDescription>Project ID: {project.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <ProjectProgress
                    start={project.timeline.start}
                    end={project.timeline.end}
                    status={project.status}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                        Start Date:{' '}
                        {new Date(project.timeline.start).toLocaleDateString()}
                    </span>
                    </div>
                    <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                        End Date: {new Date(project.timeline.end).toLocaleDateString()}
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
                    {project.quickCallNumber && (
                         <Button asChild variant="outline" className="w-full justify-start">
                            <a href={`tel:${project.quickCallNumber}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                {project.quickCallNumber}
                            </a>
                        </Button>
                    )}
                    {project.whatsappLink && (
                        <Button asChild variant="outline" className="w-full justify-start">
                            <Link href={project.whatsappLink} target="_blank">
                                <WhatsappIcon className="mr-2 h-4 w-4" />
                                Join WhatsApp Group
                            </Link>
                        </Button>
                    )}
                    {(!project.quickCallNumber && !project.whatsappLink) && (
                        <p className="text-sm text-muted-foreground text-center py-4">No quick contact methods have been added for this project.</p>
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
