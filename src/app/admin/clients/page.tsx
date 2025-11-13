
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
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


type Client = {
  id: string;
  name: string;
  contact: string;
  email: string;
};

export default function AdminClientsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [clientsSnapshot, loading, error] = useCollection(
    collection(firestore, 'client_profiles')
  );

  const clients = clientsSnapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Client)
  );

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteDoc(doc(firestore, 'client_profiles', clientId));
      toast({
        title: 'Client Deleted',
        description: 'The client has been successfully deleted.',
      });
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: e.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Client Management</h1>
        <p className="text-muted-foreground">
          View, create, edit, and delete client profiles.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {error && (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive">
                        Error fetching clients: {error.message}
                    </TableCell>
                </TableRow>
              )}
              {clients?.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the client
                            and all their associated data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteClient(client.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
               {clients && clients.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No clients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
