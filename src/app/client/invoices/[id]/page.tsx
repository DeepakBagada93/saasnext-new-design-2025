'use client';
import QuotationDetails from './invoice-details';

export default function QuotationPage({ params: { id } }: { params: { id: string } }) {
    return <QuotationDetails quotationId={id} />;
}
