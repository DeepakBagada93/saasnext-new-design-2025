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

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
}

export default function ClientQuotationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const quotationsQuery = user?.uid && query(collection(firestore, 'quotations'), where('userId', '==', user.uid));
  const [quotationsSnapshot, loading, error] = useCollection(quotationsQuery || null);

  const clientQuotations = quotationsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Quotations</h1>
        <p className="text-muted-foreground">Manage your billing and payments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quotation History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation ID</TableHead>
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
                  <TableCell colSpan={6} className="text-center">Loading quotations...</TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-destructive">Error: {error.message}</TableCell>
                </TableRow>
              )}
              {clientQuotations && clientQuotations.length === 0 && !loading && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center">You don't have any quotations yet.</TableCell>
                </TableRow>
              )}
              {clientQuotations?.map((quotation: any) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-mono">{quotation.id}</TableCell>
                  <TableCell>{new Date(quotation.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{formatCurrency(quotation.amount, quotation.currency || 'INR')}</TableCell>
                  <TableCell>
                    <Badge variant={quotation.status === 'Paid' ? 'secondary' : 'destructive'}>{quotation.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/client/invoices/${quotation.id}`}><Eye className="mr-2 h-4 w-4"/>View</Link>
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
