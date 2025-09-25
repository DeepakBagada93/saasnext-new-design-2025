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
import { Calendar, Clock } from 'lucide-react';
import { ProjectProgress } from './project-progress';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { ProjectTimeline } from './project-timeline';


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
  
  const milestones = [
    { name: 'Project Kick-off', date: project.timeline.start, status: 'Completed' },
    { name: 'Design Phase', date: new Date(new Date(project.timeline.start).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(), status: project.status === 'Planning' ? 'Upcoming' : 'Completed' },
    { name: 'Development', date: new Date(new Date(project.timeline.start).getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(), status: project.status === 'In Progress' ? 'Active' : (project.status === 'Completed' ? 'Completed' : 'Upcoming') },
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

        <div className="md:col-span-1">
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
