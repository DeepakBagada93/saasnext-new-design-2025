
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { addDays } from 'date-fns';

type ServiceRequest = {
  id: string;
  serviceType: string;
  description: string;
  budget?: number;
  currency?: string;
  clientName: string;
  clientEmail: string;
  userId: string;
};

type Milestone = {
  name: string;
  date: Date;
  status: 'Upcoming' | 'Active' | 'Completed';
}

function generateDefaultMilestones(serviceType: string): Milestone[] {
  const today = new Date();
  const baseMilestones = [
    { name: 'Project Kick-off', date: addDays(today, 2), status: 'Upcoming' as const },
  ];

  if (serviceType.includes('Web Development')) {
    baseMilestones.push(
      { name: 'Discovery & Design', date: addDays(today, 14), status: 'Upcoming' as const },
      { name: 'Development & Testing', date: addDays(today, 45), status: 'Upcoming' as const },
      { name: 'Launch & Handover', date: addDays(today, 60), status: 'Upcoming' as const }
    );
  }
  if (serviceType.includes('Digital Marketing')) {
    baseMilestones.push(
      { name: 'Strategy & Setup', date: addDays(today, 7), status: 'Upcoming' as const },
      { name: 'Campaign Launch', date: addDays(today, 14), status: 'Upcoming' as const },
      { name: 'First Report', date: addDays(today, 45), status: 'Upcoming' as const }
    );
  }
   if (serviceType.includes('Logo & Branding')) {
    baseMilestones.push(
      { name: 'Concept Presentation', date: addDays(today, 10), status: 'Upcoming' as const },
      { name: 'Final Asset Delivery', date: addDays(today, 20), status: 'Upcoming' as const }
    );
  }
   if (serviceType.includes('AI Solutions')) {
    baseMilestones.push(
      { name: 'Data Analysis & Model Plan', date: addDays(today, 21), status: 'Upcoming' as const },
      { name: 'Prototype Delivery', date: addDays(today, 60), status: 'Upcoming' as const },
       { name: 'Final Integration', date: addDays(today, 90), status: 'Upcoming' as const }
    );
  }

  // Ensure final delivery if not present
  if(!baseMilestones.find(m => m.name.toLowerCase().includes('delivery') || m.name.toLowerCase().includes('launch'))) {
      baseMilestones.push({ name: 'Final Delivery', date: addDays(today, 30), status: 'Upcoming' as const });
  }

  return baseMilestones.sort((a,b) => a.date.getTime() - b.date.getTime());
}


function ApproveRequestDialog({ request, isOpen, onClose }: { request: ServiceRequest, isOpen: boolean, onClose: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [projectName, setProjectName] = useState(`New Project: ${request.serviceType}`);
    const [milestones, setMilestones] = useState<Milestone[]>(generateDefaultMilestones(request.serviceType));

    const handleMilestoneDateChange = (index: number, date: Date | undefined) => {
        if (!date) return;
        const newMilestones = [...milestones];
        newMilestones[index].date = date;
        setMilestones(newMilestones);
    }

    const handleApprove = async () => {
        if (!projectName) {
            toast({
                variant: 'destructive',
                title: 'Project Name Required',
                description: 'Please provide a name for the project.',
            });
            return;
        }

        try {
            const start = milestones.length > 0 ? milestones[0].date : new Date();
            const end = milestones.length > 0 ? milestones[milestones.length - 1].date : addDays(new Date(), 30);

            await addDoc(collection(firestore, 'projects'), {
                name: projectName,
                clientName: request.clientName,
                userId: request.userId,
                status: 'Planning',
                budget: request.budget || 0,
                currency: request.currency || 'INR',
                timeline: { // Legacy timeline for progress bar
                    start: start.toISOString(),
                    end: end.toISOString(),
                },
                milestones: milestones.map(m => ({...m, date: m.date.toISOString()})), // Store new milestones
                createdAt: serverTimestamp(),
                updates: [],
            });

            await deleteDoc(doc(firestore, 'serviceRequests', request.id));

            toast({
                title: 'Project Approved',
                description: `A new project has been created for ${request.clientName}.`,
            });
            onClose();
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Approval Failed',
                description: e.message,
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Approve Service Request</DialogTitle>
                    <DialogDescription>
                        Create a new project and define the timeline for "{request.serviceType}" from {request.clientName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input
                            id="project-name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Project Timeline</Label>
                        <div className="space-y-2">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <Input value={milestone.name} readOnly className="flex-grow bg-muted"/>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-[280px] justify-start text-left font-normal")}
                                            >
                                                {format(milestone.date, "PPP")}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={milestone.date}
                                                onSelect={(date) => handleMilestoneDateChange(index, date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleApprove}>Create Project</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminRequestsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [requestsSnapshot, loading, error] = useCollection(
    collection(firestore, 'serviceRequests')
  );
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const requests = requestsSnapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ServiceRequest)
  );

  const handleReject = async (requestId: string) => {
     try {
      await deleteDoc(doc(firestore, 'serviceRequests', requestId));
       toast({
        variant: 'secondary',
        title: 'Request Rejected',
        description: 'The service request has been rejected and removed.',
      });
     } catch (e: any) {
        toast({
            variant: 'destructive',
            title: 'Rejection Failed',
            description: e.message,
        });
     }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Service Requests</h1>
        <p className="text-muted-foreground">
          Approve or reject new client requests.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && <p>Loading requests...</p>}
          {error && (
            <p className="text-destructive">Error: {error.message}</p>
          )}
          {requests && requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {request.serviceType}
                    </h3>
                     <p className="text-sm text-muted-foreground">
                      From: {request.clientName} ({request.clientEmail})
                    </p>
                    <p className="text-md mt-2">{request.description}</p>
                    <div className="text-sm text-muted-foreground mt-2 grid grid-cols-2 gap-x-4">
                        {request.budget && <span>Budget: {request.budget} {request.currency}</span>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => setSelectedRequest(request)}>
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <p>No pending service requests.</p>
          )}
        </CardContent>
      </Card>
      {selectedRequest && (
        <ApproveRequestDialog
            request={selectedRequest}
            isOpen={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}
