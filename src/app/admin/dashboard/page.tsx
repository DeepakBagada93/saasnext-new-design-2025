
'use client';

import { Users, Briefcase, Bell, TrendingUp, CalendarClock, CreditCard, PlusCircle, UserPlus, Settings, FileSearch } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardStatCard } from '@/components/dashboard-stats';
import { RecentActivity } from '@/components/recent-activity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// ... (revenue chart data remains same)

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const [projectsSnapshot, loadingProjects] = useCollection(collection(firestore, 'projects'));
  const [clientsSnapshot, loadingClients] = useCollection(collection(firestore, 'client_profiles'));
  const [requestsSnapshot, loadingRequests] = useCollection(collection(firestore, 'service_requests'));
  
  const loading = loadingProjects || loadingClients || loadingRequests;

  const projects = projectsSnapshot?.docs.map(doc => doc.data()) || [];
  const statusCounts = projects.reduce((acc: any, p: any) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
  }, {});

  const statusData = [
      { name: 'Planning', value: statusCounts['Planning'] || 0, color: '#3b82f6' },
      { name: 'In Progress', value: statusCounts['In Progress'] || 0, color: '#8b5cf6' },
      { name: 'Completed', value: statusCounts['Completed'] || 0, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Command Center</h1>
            <p className="text-muted-foreground">
            Real-time metrics and platform oversight.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin/projects">Manage All Projects</Link>
            </Button>
            <Button size="sm" asChild className="bg-accent hover:bg-accent/90">
                <Link href="/admin/requests">Review Requests</Link>
            </Button>
        </div>
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
                    value={requestsSnapshot?.docs.filter(doc => doc.data().status === 'Pending').length || 0} 
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

      <Card className="border-2 bg-neutral-50 dark:bg-neutral-900/50">
          <CardHeader>
              <CardTitle className="text-xl">Quick Management Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-background hover:bg-accent/10 hover:text-accent transition-all group" asChild>
                  <Link href="/admin/projects">
                      <PlusCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>Create Project</span>
                  </Link>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-background hover:bg-accent/10 hover:text-accent transition-all group" asChild>
                  <Link href="/admin/clients">
                      <UserPlus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>Add Client</span>
                  </Link>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-background hover:bg-accent/10 hover:text-accent transition-all group" asChild>
                  <Link href="/admin/invoices">
                      <FileSearch className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>New Quotation</span>
                  </Link>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-background hover:bg-accent/10 hover:text-accent transition-all group" asChild>
                  <Link href="/admin/analytics">
                      <Settings className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>Platform Settings</span>
                  </Link>
              </Button>
          </CardContent>
      </Card>

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
        </Card>
        
        <Card className="md:col-span-3 border-2">
            <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Distribution across lifecycle stages.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{projects.length}</span>
                    <span className="text-xs text-muted-foreground">Total</span>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 p-4">
                <div className="grid grid-cols-3 gap-4 w-full text-xs">
                    {statusData.map((s) => (
                        <div key={s.name} className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                                <span className="font-medium">{s.name}</span>
                            </div>
                            <span className="text-muted-foreground">{s.value}</span>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
          <RecentActivity activities={mockActivities} />
          <Card className="border-2">
              <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>System performance and uptime.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-medium">Firebase Operations</span>
                      </div>
                      <span className="text-sm text-emerald-600 font-mono font-bold">OPTIMAL</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-medium">Auth Systems</span>
                      </div>
                      <span className="text-sm text-emerald-600 font-mono font-bold">ACTIVE</span>
                  </div>
                   <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="font-medium">Storage Quota</span>
                      </div>
                      <span className="text-sm text-blue-600 font-mono font-bold">12% USED</span>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
