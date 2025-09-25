'use client';
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

type ServiceRequest = {
  id: string;
  serviceType: string;
  description: string;
  budget?: number;
  currency?: string;
  timeline?: string;
  clientName: string;
  clientEmail: string;
  userId: string;
};

export default function AdminRequestsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [requestsSnapshot, loading, error] = useCollection(
    collection(firestore, 'serviceRequests')
  );

  const requests = requestsSnapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ServiceRequest)
  );

  const handleApprove = async (request: ServiceRequest) => {
    try {
      // Create a new project
      await addDoc(collection(firestore, 'projects'), {
        name: `New Project: ${request.serviceType}`,
        clientId: request.clientName, // Keep the name for display
        userId: request.userId,
        status: 'Planning',
        budget: request.budget || 0,
        currency: request.currency || 'USD',
        timeline: {
          start: new Date().toISOString(),
          end: request.timeline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now
        },
        createdAt: serverTimestamp(),
        updates: [],
      });

      // Delete the service request
      await deleteDoc(doc(firestore, 'serviceRequests', request.id));

      toast({
        title: 'Project Approved',
        description: `A new project has been created for ${request.clientName}.`,
      });
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Approval Failed',
        description: e.message,
      });
    }
  };

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
                        {request.timeline && <span>Timeline: {new Date(request.timeline).toLocaleDateString()}</span>}
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
                    <Button size="sm" onClick={() => handleApprove(request)}>
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
    </div>
  );
}
