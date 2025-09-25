'use client';
import InvoiceDetails from './invoice-details';
import { notFound } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function InvoicePage({ params }: { params: { id: string } }) {
    const firestore = useFirestore();
    const invoiceRef = doc(firestore, 'invoices', params.id);
    const [invoice, loading, error] = useDocumentData(invoiceRef);

    if (loading) {
        return <div>Loading invoice...</div>
    }

    if (error || !invoice) {
        notFound();
    }

    // The useDocumentData hook doesn't include the ID, so we add it back.
    const invoiceWithId = { ...invoice, id: params.id };

    return <InvoiceDetails invoice={invoiceWithId as any} />;
}
