'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/supabase/provider';
import { useCollection } from '@/supabase/hooks/use-collection';

export default function ClientRequestsPage() {
  const { user } = useUser();

  const queryOptions = user?.id ? { table: 'service_requests', eq: { column: 'client_id', value: user.id } } : null;
  const [requestsSnapshot, loading, error] = useCollection(queryOptions);

  const requests = requestsSnapshot?.docs?.map((doc: any) => ({
    ...doc,
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
                    <h3 className="font-semibold">{request.service_type}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {request.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Requested on: {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'N/A'}
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
