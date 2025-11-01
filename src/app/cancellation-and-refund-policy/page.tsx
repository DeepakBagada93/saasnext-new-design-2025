
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancellationAndRefundPolicyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Cancellation & Refund Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto space-y-8 text-muted-foreground">
        <p>
          At SaaSNext, we are committed to providing our clients with exceptional service. This policy outlines the terms for cancellation and refunds for our services.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>1. Service Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Clients may cancel their service subscription at any time. To cancel, please contact our support team at connect@saasnext.in. Cancellations will be effective at the end of the current billing cycle.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Refund Policy</CardTitle>
          </CardHeader>
          <CardContent>
             <p>Due to the nature of our digital services, we generally do not offer refunds once a service period has begun. However, we may consider refunds on a case-by-case basis under special circumstances. All refund requests must be submitted in writing.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Non-Refundable Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Certain items are non-refundable, including but not limited to domain name registrations, third-party service fees, and any initial setup or consultation fees.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>4. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            If you have any questions about our Cancellation and Refund Policy, please contact us at: connect@saasnext.in
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
