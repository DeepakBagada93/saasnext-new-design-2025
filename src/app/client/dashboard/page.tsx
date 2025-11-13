
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

function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
}

export default function ClientDashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const projectsQuery =
    user?.uid &&
    query(collection(firestore, 'projects'), where('clientId', '==', user.uid));
  const [projectsSnapshot, loadingProjects, errorProjects] = useCollection(projectsQuery || null);
  
  const requestsQuery =
    user?.uid &&
    query(collection(firestore, 'service_requests'), where('clientId', '==', user.uid));
  const [requestsSnapshot, loadingRequests, errorRequests] = useCollection(requestsQuery || null);

  const clientProjects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const serviceRequests = requestsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here's a summary of your projects and requests.
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
          <Link href="/client/requests/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Service Request
          </Link>
        </Button>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>My Service Requests</CardTitle>
          <CardDescription>
            Track the status of your recent service inquiries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Requested On</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingRequests && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading requests...
                  </TableCell>
                </TableRow>
              )}
               {errorRequests && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive">
                        Error: {errorRequests.message}
                    </TableCell>
                </TableRow>
              )}
              {serviceRequests && serviceRequests.length === 0 && !loadingRequests && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center">You have no pending service requests.</TableCell>
                </TableRow>
              )}
              {serviceRequests?.map((request: any) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.serviceType}</TableCell>
                  <TableCell>
                    <Badge variant='outline'>{request.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {request.createdAt ? new Date(request.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/client/requests`}>
                        View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                <TableHead className="hidden sm:table-cell">Budget</TableHead>
                <TableHead className="hidden md:table-cell">End Date</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingProjects && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading projects...
                  </TableCell>
                </TableRow>
              )}
               {errorProjects && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-destructive">
                        Error: {errorProjects.message}
                    </TableCell>
                </TableRow>
              )}
              {clientProjects && clientProjects.length === 0 && !loadingProjects && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center">You don't have any projects yet.</TableCell>
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
                  <TableCell className="hidden sm:table-cell">{formatCurrency(project.budget || 0, project.currency || 'USD')}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(project.timeline.end).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/client/projects/${project.id}`}>
                        View <ArrowRight className="ml-2 h-4 w-4" />
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
