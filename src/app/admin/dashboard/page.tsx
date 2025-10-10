
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Briefcase, Bell } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const [projectsSnapshot, loadingProjects] = useCollection(collection(firestore, 'projects'));
  const [clientsSnapshot, loadingClients] = useCollection(collection(firestore, 'clients'));
  const [requestsSnapshot, loadingRequests] = useCollection(collection(firestore, 'serviceRequests'));
  
  const loading = loadingProjects || loadingClients || loadingRequests;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the platform's activity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {loading ? <Skeleton className="h-8 w-1/4" /> : <>
                <div className="text-2xl font-bold">+{clientsSnapshot?.size || 0}</div>
                <p className="text-xs text-muted-foreground">Total registered clients</p>
            </>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-1/4" /> : <>
                <div className="text-2xl font-bold">+{projectsSnapshot?.docs.filter(doc => doc.data().status !== 'Completed').length || 0}</div>
                <p className="text-xs text-muted-foreground">Projects currently in progress</p>
            </>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-1/4" /> : <>
                <div className="text-2xl font-bold">{requestsSnapshot?.size || 0}</div>
                <p className="text-xs text-muted-foreground">New service requests to review</p>
            </>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
