
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
import { ArrowRight, PlusCircle, Briefcase, Bell, CalendarClock, CreditCard } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { DashboardStatCard } from '@/components/dashboard-stats';
import { Skeleton } from '@/components/ui/skeleton';

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

  const loading = loadingProjects || loadingRequests;

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0] || 'Client'}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your projects and requests today.
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 w-full sm:w-auto shadow-lg shadow-accent/20">
          <Link href="/client/requests/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Service Request
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
        ) : (
            <>
                <DashboardStatCard 
                    title="Active Projects" 
                    value={clientProjects?.filter((p: any) => p.status !== 'Completed').length || 0} 
                    description="Current work in progress" 
                    icon={Briefcase} 
                    delay={0.1}
                />
                <DashboardStatCard 
                    title="Pending Requests" 
                    value={serviceRequests?.length || 0} 
                    description="Awaiting response" 
                    icon={Bell} 
                    delay={0.2}
                />
                <DashboardStatCard 
                    title="Total Spent" 
                    value={formatCurrency(clientProjects?.reduce((acc: number, p: any) => acc + (p.budget || 0), 0) || 0, 'USD')} 
                    description="Total investment" 
                    icon={CreditCard} 
                    delay={0.3}
                />
                 <DashboardStatCard 
                    title="Next Meeting" 
                    value="None Scheduled" 
                    description="Stay on track" 
                    icon={CalendarClock} 
                    delay={0.4}
                />
            </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="border-2">
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>My Service Requests</CardTitle>
                    <CardDescription>
                        Track your recent inquiries.
                    </CardDescription>
                </div>
                 <Button variant="ghost" size="sm" asChild>
                    <Link href="/client/requests" className="text-accent">View all</Link>
                </Button>
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {loadingRequests && (
                    <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                    </TableRow>
                )}
                {serviceRequests && serviceRequests.length === 0 && !loadingRequests && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No pending requests.</TableCell>
                    </TableRow>
                )}
                {serviceRequests?.slice(0, 5).map((request: any) => (
                    <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.serviceType}</TableCell>
                    <TableCell>
                        <Badge variant='outline' className="capitalize">{request.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                        <Link href={`/client/requests`}>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

        <Card className="border-2">
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>My Projects</CardTitle>
                    <CardDescription>
                        Active and past projects.
                    </CardDescription>
                </div>
                 <Button variant="ghost" size="sm" asChild>
                    <Link href="/client/projects" className="text-accent">View all</Link>
                </Button>
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {loadingProjects && (
                    <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                         <Skeleton className="h-4 w-full" />
                    </TableCell>
                    </TableRow>
                )}
                {clientProjects && clientProjects.length === 0 && !loadingProjects && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No projects yet.</TableCell>
                    </TableRow>
                )}
                {clientProjects?.slice(0, 5).map((project: any) => (
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
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                        <Link href={`/client/projects/${project.id}`}>
                            <ArrowRight className="h-4 w-4" />
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
    </div>
  );
}
