
'use client';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { notFound } from 'next/navigation';

type Quotation = {
    id: string;
    status: string;
    date: string;
    dueDate: string;
    amount: number;
    currency: string;
    items: {
        description: string;
        quantity: number;
        price: number;
    }[];
    clientName?: string;
    clientEmail?: string;
    upiId?: string;
};

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
}

export default function QuotationDetails({ quotationId }: { quotationId: string }) {
    const firestore = useFirestore();
    const quotationRef = doc(firestore, 'quotations', quotationId);
    const [data, loading, error] = useDocumentData(quotationRef);

    const handlePrint = () => {
        window.print();
    }
    
    if (loading) {
        return <div>Loading quotation...</div>
    }

    if (error || !data) {
        notFound();
    }

    const quotation: Quotation = { ...data, id: quotationId } as Quotation;


    return (
        <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6 no-print">
                <div>
                    <h1 className="font-headline text-2xl font-bold">Quotation {quotation.id}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-muted-foreground">Status:</p>
                        <Badge variant={quotation.status === 'Paid' ? 'secondary' : 'destructive'}>{quotation.status}</Badge>
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
                        <p className="text-xs text-gray-500 mt-1">Junagadh, Gujarat</p>
                        <p className="text-xs text-gray-500">connect@saasnext.in</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-4xl font-bold text-gray-800 uppercase">Quotation</h1>
                        <p className="text-sm text-gray-500"># {quotation.id}</p>
                    </div>
                </header>
                
                <section className="grid grid-cols-2 gap-4 my-8">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2">Bill To</h2>
                        <p className="font-bold">{quotation.clientName || 'Client Name'}</p>
                        <p className="text-sm text-gray-600">{quotation.clientEmail || 'client@email.com'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm"><span className="font-semibold text-gray-600">Quotation Date:</span> {new Date(quotation.date).toLocaleDateString()}</p>
                        <p className="text-sm"><span className="font-semibold text-gray-600">Due Date:</span> {new Date(quotation.dueDate).toLocaleDateString()}</p>
                        <p className="text-lg mt-2"><span className="font-semibold text-gray-600">Amount Due:</span> <span className="font-bold text-gray-800">{formatCurrency(quotation.amount, quotation.currency)}</span></p>
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
                            {quotation.items && quotation.items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{item.description}</td>
                                    <td className="text-center p-2">{item.quantity}</td>
                                    <td className="text-right p-2">{formatCurrency(item.price, quotation.currency)}</td>
                                    <td className="text-right p-2">{formatCurrency(item.quantity * item.price, quotation.currency)}</td>
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
                                    <td className="p-2 text-right">{formatCurrency(quotation.amount, quotation.currency)}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-gray-600">Tax (0%)</td>
                                    <td className="p-2 text-right">{formatCurrency(0, quotation.currency)}</td>
                                </tr>
                                <tr className="font-bold bg-gray-100">
                                    <td className="p-2 text-gray-800">Total</td>
                                    <td className="p-2 text-right text-gray-800">{formatCurrency(quotation.amount, quotation.currency)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer className="mt-auto pt-10 text-center text-xs text-gray-500 border-t">
                    <p>Thank you for your business!</p>
                    <p>Please send payments to SaaSNext. Payment terms are 15 days.</p>
                    {quotation.upiId && <p className="mt-2 font-semibold">UPI ID: {quotation.upiId}</p>}
                    <p className="mt-2 font-semibold">UDYAM REGISTRATION NUMBER: UDYAM-GJ-11-0050439</p>
                </footer>
            </div>
        </div>
    );
}
