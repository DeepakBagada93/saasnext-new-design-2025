'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DollarSign, Users, Briefcase, Bell } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from '@/components/ui/chart';
import { useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
};

function formatCurrency(amount: number, currency: string = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const [projectsSnapshot, loadingProjects] = useCollection(collection(firestore, 'projects'));
  const [clientsSnapshot, loadingClients] = useCollection(collection(firestore, 'clients'));
  const [requestsSnapshot, loadingRequests] = useCollection(collection(firestore, 'serviceRequests'));
  
  const loading = loadingProjects || loadingClients || loadingRequests;

  const totalRevenue = useMemo(() => {
    if (!projectsSnapshot) return 0;
    return projectsSnapshot.docs
        .filter(doc => doc.data().status === 'Completed')
        .reduce((acc, doc) => acc + (doc.data().budget || 0), 0);
  }, [projectsSnapshot]);

  const chartData = useMemo(() => {
    if (!projectsSnapshot) return [];
    
    const monthlyRevenue: { [key: string]: number } = {};

    projectsSnapshot.docs.forEach(doc => {
        const project = doc.data();
        if (project.createdAt) {
            const date = project.createdAt.toDate();
            const month = date.toLocaleString('default', { month: 'long' });
            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (project.budget || 0);
        }
    });

    // Get last 6 months for chart labels
    const monthLabels = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return d.toLocaleString('default', { month: 'long' });
    }).reverse();
    
    return monthLabels.map(month => ({
        month,
        revenue: monthlyRevenue[month] || 0,
    }));

  }, [projectsSnapshot]);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the platform's activity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-3/4" /> : <>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">From all completed projects</p>
            </>}
          </CardContent>
        </Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Monthly revenue from projects created in the last 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-[200px] w-full" /> : 
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
            </ChartContainer>
          }
        </CardContent>
      </Card>
    </div>
  );
}
