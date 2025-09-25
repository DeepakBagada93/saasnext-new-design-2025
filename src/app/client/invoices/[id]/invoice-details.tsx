'use client';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

// A more generic type for the invoice since it now comes from Firestore
type Invoice = {
    id: string;
    status: string;
    date: string;
    dueDate: string;
    amount: number;
    items: {
        description: string;
        quantity: number;
        price: number;
    }[];
    // Add other fields from your Firestore document as needed
    clientName?: string;
    clientEmail?: string;
};

export default function InvoiceDetails({ invoice }: { invoice: Invoice }) {
    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6 no-print">
                <div>
                    <h1 className="font-headline text-2xl font-bold">Invoice {invoice.id}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-muted-foreground">Status:</p>
                        <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>{invoice.status}</Badge>
                    </div>
                </div>
                <Button onClick={handlePrint} className="bg-accent hover:bg-accent/90">
                    <Printer className="mr-2 h-4 w-4" /> Print / Save PDF
                </Button>
            </div>
            <div id="invoice-print-area" className="w-full max-w-[210mm] min-h-[297mm] p-10 mx-auto bg-white text-black shadow-lg rounded-sm font-sans">
                <header className="flex justify-between items-start pb-6 border-b">
                    <div>
                        <Logo className="text-primary" />
                        <p className="text-xs text-gray-500 mt-1">123 Digital Ave, Tech City, 54321</p>
                        <p className="text-xs text-gray-500">contact@saasnext.com</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-4xl font-bold text-gray-800 uppercase">Invoice</h1>
                        <p className="text-sm text-gray-500"># {invoice.id}</p>
                    </div>
                </header>
                
                <section className="grid grid-cols-2 gap-4 my-8">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2">Bill To</h2>
                        <p className="font-bold">{invoice.clientName || 'Client Name'}</p>
                        <p className="text-sm text-gray-600">{invoice.clientEmail || 'client@email.com'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm"><span className="font-semibold text-gray-600">Invoice Date:</span> {new Date(invoice.date).toLocaleDateString()}</p>
                        <p className="text-sm"><span className="font-semibold text-gray-600">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
                        <p className="text-lg mt-2"><span className="font-semibold text-gray-600">Amount Due:</span> <span className="font-bold text-gray-800">${invoice.amount.toFixed(2)}</span></p>
                    </div>
                </section>

                <section>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left font-semibold p-2">Description</th>
                                <th className="text-center font-semibold p-2">Qty</th>
                                <th className="text-right font-semibold p-2">Unit Price</th>
                                <th className="text-right font-semibold p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items && invoice.items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{item.description}</td>
                                    <td className="text-center p-2">{item.quantity}</td>
                                    <td className="text-right p-2">${item.price.toFixed(2)}</td>
                                    <td className="text-right p-2">${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="flex justify-end mt-8">
                    <div className="w-1/2">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td className="p-2 text-gray-600">Subtotal</td>
                                    <td className="p-2 text-right">${invoice.amount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-gray-600">Tax (0%)</td>
                                    <td className="p-2 text-right">$0.00</td>
                                </tr>
                                <tr className="font-bold bg-gray-100">
                                    <td className="p-2 text-gray-800">Total</td>
                                    <td className="p-2 text-right text-gray-800">${invoice.amount.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer className="mt-auto pt-10 text-center text-xs text-gray-500 border-t">
                    <p>Thank you for your business!</p>
                    <p>Please send payments to SaaSNext. Payment terms are 15 days.</p>
                </footer>
            </div>
        </div>
    );
}
