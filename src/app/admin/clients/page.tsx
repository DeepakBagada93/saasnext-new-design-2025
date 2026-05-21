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
import { useCollection } from '@/supabase/hooks/use-collection';
import { useSupabase } from '@/supabase/provider';
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
import { Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

type Client = {
  id: string;
  company_name: string;
  contact_name?: string;
  full_name?: string;
  email: string;
};

export default function AdminClientsPage() {
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const { data: clients, isLoading: loading, error } = useCollection<Client>({
    table: 'client_profiles',
    eq: { column: 'role', value: 'client' }
  });

  const handleDeleteClient = async (clientId: string) => {
    if (!supabase) return;
    try {
      const { error } = await supabase.from('client_profiles').delete().eq('id', clientId);
      if (error) throw error;
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
                <TableHead>Company Name</TableHead>
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
                  <TableCell className="font-medium">{client.company_name || 'N/A'}</TableCell>
                  <TableCell>{client.contact_name || client.full_name || 'N/A'}</TableCell>
                  <TableCell>{client.email || 'N/A'}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/clients/${client.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                          <AlertDialogAction 
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => handleDeleteClient(client.id)}>
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
