
'use client';

import { Users, Briefcase, Bell, TrendingUp, CalendarClock, CreditCard } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardStatCard } from '@/components/dashboard-stats';
import { RecentActivity } from '@/components/recent-activity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 3908 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--accent))",
  },
};

const mockActivities = [
  {
    id: '1',
    user: { name: 'John Doe', initials: 'JD' },
    action: 'submitted a new',
    target: 'service request',
    time: '2 hours ago',
  },
  {
    id: '2',
    user: { name: 'Alice Smith', initials: 'AS' },
    action: 'approved the',
    target: 'project proposal',
    time: '5 hours ago',
  },
  {
    id: '3',
    user: { name: 'Bob Wilson', initials: 'BW' },
    action: 'paid the',
    target: 'latest invoice',
    time: 'Yesterday',
  },
  {
    id: '4',
    user: { name: 'Sarah Connor', initials: 'SC' },
    action: 'scheduled a',
    target: 'meeting',
    time: '2 days ago',
  },
];

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const [projectsSnapshot, loadingProjects] = useCollection(collection(firestore, 'projects'));
  const [clientsSnapshot, loadingClients] = useCollection(collection(firestore, 'client_profiles'));
  const [requestsSnapshot, loadingRequests] = useCollection(collection(firestore, 'service_requests'));
  
  const loading = loadingProjects || loadingClients || loadingRequests;

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Command Center</h1>
        <p className="text-muted-foreground">
          Real-time metrics and platform oversight.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
        ) : (
            <>
                <DashboardStatCard 
                    title="Total Clients" 
                    value={clientsSnapshot?.size || 0} 
                    description="Total registered clients" 
                    icon={Users} 
                    trend={{ value: "12% this month", isPositive: true }}
                    delay={0.1}
                />
                <DashboardStatCard 
                    title="Active Projects" 
                    value={projectsSnapshot?.docs.filter(doc => doc.data().status !== 'Completed').length || 0} 
                    description="Projects in progress" 
                    icon={Briefcase} 
                    trend={{ value: "4 new today", isPositive: true }}
                    delay={0.2}
                />
                <DashboardStatCard 
                    title="Pending Requests" 
                    value={requestsSnapshot?.size || 0} 
                    description="Requests to review" 
                    icon={Bell} 
                    trend={{ value: "High priority", isPositive: false }}
                    delay={0.3}
                />
                 <DashboardStatCard 
                    title="Revenue" 
                    value="₹12.4L" 
                    description="Projected earnings" 
                    icon={CreditCard} 
                    trend={{ value: "24% vs last mo", isPositive: true }}
                    delay={0.4}
                />
            </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 border-2">
            <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly performance and revenue growth.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm border-t p-4">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
            </CardFooter>
        </Card>
        
        <div className="md:col-span-3">
            <RecentActivity activities={mockActivities} />
        </div>
      </div>
    </div>
  );
}
