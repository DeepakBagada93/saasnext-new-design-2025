import InvoiceDetails from './invoice-details';
import { invoices } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function InvoicePage({ params }: { params: { id: string } }) {
    const invoice = invoices.find(inv => inv.id === params.id);

    if (!invoice) {
        notFound();
    }

    return <InvoiceDetails invoice={invoice} />;
}
