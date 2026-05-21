'use client';
import QuotationDetails from './invoice-details';

export default function QuotationPage({ params }: { params: { id: string } }) {
    return <QuotationDetails quotationId={params.id} />;
}
