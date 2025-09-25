'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

export default function ClientProjectsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const projectsQuery =
    user?.uid &&
    query(collection(firestore, 'projects'), where('userId', '==', user.uid));

  const [projectsSnapshot, loading, error] = useCollection(projectsQuery || null);

  const clientProjects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">My Projects</h1>
        <p className="text-muted-foreground">
          Track the status and timeline of all your projects.
        </p>
      </div>
      <div className="space-y-4">
        {loading && <p>Loading projects...</p>}
        {error && <p className="text-destructive">Error loading projects.</p>}
        {clientProjects?.map((project: any) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>Project ID: {project.id}</CardDescription>
              </div>
              <Badge
                variant={project.status === 'Completed' ? 'secondary' : 'default'}
                className="text-sm"
              >
                {project.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-sm font-semibold">Timeline</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(project.timeline.start).toLocaleDateString()} -{' '}
                    {new Date(project.timeline.end).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/client/projects/${project.id}`}>
                    View Updates <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
