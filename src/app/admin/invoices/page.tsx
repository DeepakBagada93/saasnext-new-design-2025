import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { invoices } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function AdminInvoicesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Invoice Management</h1>
                <p className="text-muted-foreground">Create and manage all client invoices.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Client ID</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map(invoice => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-mono">{invoice.id}</TableCell>
                                    <TableCell>{invoice.clientId}</TableCell>
                                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>{invoice.status}</Badge>
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
