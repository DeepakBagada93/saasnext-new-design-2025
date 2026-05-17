
'use client';
import {
  Card,
  CardContent,
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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSupabase } from '@/supabase/provider';
import { useCollection } from '@/supabase/hooks/use-collection';
import { useToast } from '@/hooks/use-toast';

type MeetingRequest = {
  id: string;
  topic: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  clientName: string;
  clientEmail: string;
  notes?: string;
};

function StatusSelector({
  requestId,
  currentStatus,
}: {
  requestId: string;
  currentStatus: MeetingRequest['status'];
}) {
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: MeetingRequest['status']) => {
    try {
      const { error } = await supabase
        .from('meeting_requests')
        .update({ status: newStatus })
        .eq('id', requestId);
      
      if (error) throw error;

      toast({
        title: 'Status Updated',
        description: `Meeting request has been set to ${newStatus}.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message,
      });
    }
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange as any}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Confirmed">Confirmed</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
        <SelectItem value="Cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default function AdminMeetingsPage() {
  const [requestsSnapshot, loading, error] = useCollection({
    table: 'meeting_requests',
    order: { column: 'created_at', ascending: false }
  });

  const requests = requestsSnapshot?.docs.map(
    (doc: any) => ({ 
        id: doc.id, 
        topic: doc.topic,
        preferredDate: doc.preferred_date,
        preferredTime: doc.preferred_time,
        status: doc.status,
        clientName: doc.client_name,
        clientEmail: doc.client_email,
        notes: doc.notes
    } as unknown as MeetingRequest)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Meeting Requests</h1>
        <p className="text-muted-foreground">
          Manage all client meeting requests.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Preferred Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading requests...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-destructive"
                  >
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              )}
              {requests?.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium">{request.clientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.clientEmail}
                    </div>
                  </TableCell>
                  <TableCell>{request.topic}</TableCell>
                  <TableCell>
                    {new Date(request.preferredDate).toLocaleDateString()} at{' '}
                    {request.preferredTime}
                  </TableCell>
                  <TableCell>
                    <StatusSelector
                      requestId={request.id}
                      currentStatus={request.status}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
