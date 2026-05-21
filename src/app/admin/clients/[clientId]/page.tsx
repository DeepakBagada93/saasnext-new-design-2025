'use client';

import { useParams } from "next/navigation";
import { 
  Briefcase, 
  Bell, 
  CalendarClock, 
  FileText, 
  ArrowLeft,
  User,
  Building2,
  Mail
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDoc } from "@/supabase/hooks/use-doc";
import { useCollection } from "@/supabase/hooks/use-collection";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ClientDetailPage() {
  const { clientId } = useParams();
  
  const { data: profileSnapshot, isLoading: loadingProfile } = useDoc(
    clientId ? { table: 'client_profiles', id: clientId as string } : null
  );
  const profile = profileSnapshot?.data?.() || null;

  const [projectsSnapshot, loadingProjects] = useCollection(
    clientId ? { table: 'projects', eq: { column: 'client_id', value: clientId } } : null
  );
  
  const [requestsSnapshot, loadingRequests] = useCollection(
    clientId ? { table: 'service_requests', eq: { column: 'client_id', value: clientId } } : null
  );

  const [meetingsSnapshot, loadingMeetings] = useCollection(
    clientId ? { table: 'meeting_requests', eq: { column: 'client_id', value: clientId } } : null
  );

  const [invoicesSnapshot, loadingInvoices] = useCollection(
    clientId ? { table: 'invoices', eq: { column: 'client_id', value: clientId } } : null
  );

  const loading = loadingProfile || loadingProjects || loadingRequests || loadingMeetings || loadingInvoices;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/clients">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-headline text-3xl font-bold">Client Record</h1>
      </div>

      {/* Client Header Info */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</p>
                <p className="text-lg font-semibold">{profile?.company_name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</p>
                <p className="text-lg font-semibold">{profile?.full_name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-lg font-semibold">{profile?.email || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consolidated View Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
          <TabsTrigger value="projects" className="gap-2">
            <Briefcase className="h-4 w-4" /> 
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="gap-2">
            <Bell className="h-4 w-4" /> 
            <span className="hidden sm:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="meetings" className="gap-2">
            <CalendarClock className="h-4 w-4" /> 
            <span className="hidden sm:inline">Meetings</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <FileText className="h-4 w-4" /> 
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle>Active & Past Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projectsSnapshot?.docs?.length ? (
                <div className="space-y-4">
                  {projectsSnapshot.docs.map((project: any) => (
                    <div key={project.id} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                      <div>
                        <p className="font-bold">{project.name || project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No projects found for this client.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {requestsSnapshot?.docs?.length ? (
                <div className="space-y-4">
                  {requestsSnapshot.docs.map((request: any) => (
                    <div key={request.id} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                      <div>
                        <p className="font-bold">{request.service_type}</p>
                        <p className="text-sm text-muted-foreground">{request.details}</p>
                      </div>
                      <Badge>{request.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No service requests found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="mt-6">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle>Meeting History</CardTitle>
            </CardHeader>
            <CardContent>
              {meetingsSnapshot?.docs?.length ? (
                 <div className="space-y-4">
                 {meetingsSnapshot.docs.map((meeting: any) => (
                   <div key={meeting.id} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                     <div>
                       <p className="font-bold">{new Date(meeting.preferred_date).toLocaleDateString()}</p>
                       <p className="text-sm text-muted-foreground">{meeting.reason}</p>
                     </div>
                     <Badge variant="secondary">{meeting.status}</Badge>
                   </div>
                 ))}
               </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No meetings scheduled.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle>Invoice Trail</CardTitle>
            </CardHeader>
            <CardContent>
              {invoicesSnapshot?.docs?.length ? (
                <div className="space-y-4">
                  {invoicesSnapshot.docs.map((invoice: any) => (
                    <div key={invoice.id} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                      <div>
                        <p className="font-bold">Invoice #{invoice.invoice_number}</p>
                        <p className="text-sm text-muted-foreground">${invoice.amount} - {invoice.due_date}</p>
                      </div>
                      <Badge variant={invoice.status === 'Paid' ? 'default' : 'destructive'}>{invoice.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No invoices generated.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
