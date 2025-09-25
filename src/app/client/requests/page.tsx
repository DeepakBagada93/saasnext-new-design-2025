
'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser, useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

export default function ClientRequestsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const requestsQuery =
    user?.uid &&
    query(
      collection(firestore, 'serviceRequests'),
      where('userId', '==', user.uid)
    );

  const [requestsSnapshot, loading, error] = useCollection(requestsQuery || null);

  const requests = requestsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">My Service Requests</h1>
        <p className="text-muted-foreground">
          Track the status of all your submitted requests.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && <p>Loading requests...</p>}
          {error && (
            <p className="text-destructive">Error: {error.message}</p>
          )}
          {requests && requests.length > 0 ? (
            requests.map((request: any) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{request.serviceType}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {request.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Requested on: {new Date(request.requestedAt.toDate()).toLocaleDateString()}
                    </p>
                     <div className="text-sm text-muted-foreground mt-2 space-x-4">
                        {request.budget && <span>Budget: {request.budget} {request.currency}</span>}
                    </div>
                  </div>
                  <Badge variant="outline">{request.status}</Badge>
                </div>
              </div>
            ))
          ) : (
            !loading && <p>You haven't submitted any service requests yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
