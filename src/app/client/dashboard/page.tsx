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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

export default function ClientDashboardPage() {
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here's a summary of your projects.
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90">
          <Link href="/client/requests/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Service Request
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
          <CardDescription>
            Overview of your active and past projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading projects...
                  </TableCell>
                </TableRow>
              )}
               {error && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-destructive">
                        Error: {error.message}
                    </TableCell>
                </TableRow>
              )}
              {clientProjects?.map((project: any) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === 'Completed' ? 'secondary' : 'default'
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${project.budget?.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(project.timeline.end).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/client/projects/${project.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
