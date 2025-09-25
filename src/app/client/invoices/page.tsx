'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useUser, useFirestore } from "@/firebase";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

export default function ClientInvoicesPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const invoicesQuery = user?.uid && query(collection(firestore, 'invoices'), where('userId', '==', user.uid));
  const [invoicesSnapshot, loading, error] = useCollection(invoicesQuery || null);

  const clientInvoices = invoicesSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">Manage your billing and payments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Loading invoices...</TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-destructive">Error: {error.message}</TableCell>
                </TableRow>
              )}
              {clientInvoices && clientInvoices.length === 0 && !loading && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center">You don't have any invoices yet.</TableCell>
                </TableRow>
              )}
              {clientInvoices?.map((invoice: any) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono">{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/client/invoices/${invoice.id}`}><Eye className="mr-2 h-4 w-4"/>View</Link>
                    </Button>
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
