'use client';
import QuotationDetails from './invoice-details';
import { notFound } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function QuotationPage({ params: { id } }: { params: { id: string } }) {
    const firestore = useFirestore();
    const quotationRef = doc(firestore, 'quotations', id);
    const [quotation, loading, error] = useDocumentData(quotationRef);

    if (loading) {
        return <div>Loading quotation...</div>
    }

    if (error || !quotation) {
        notFound();
    }

    // The useDocumentData hook doesn't include the ID, so we add it back.
    const quotationWithId = { ...quotation, id };

    return <QuotationDetails quotation={quotationWithId as any} />;
}
