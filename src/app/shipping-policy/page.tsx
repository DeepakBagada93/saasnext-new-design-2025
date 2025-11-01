
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingPolicyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Shipping & Delivery Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto space-y-8 text-muted-foreground">
        <p>
          This Shipping & Delivery Policy applies to all services provided by SaaSNext.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>1. Service Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p>All our products and services are digital and delivered electronically. This includes website development projects, digital marketing services, and AI solutions. Upon completion and payment, all deliverables will be transferred to you via secure digital means, such as email, file transfer services, or direct access to your hosting account.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. No Physical Shipping</CardTitle>
          </CardHeader>
          <CardContent>
             <p>As a digital service provider, we do not ship any physical products. Therefore, there are no shipping costs, and no physical delivery address is required for our services. All project timelines and delivery dates will be communicated and managed through our client portal.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>3. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            If you have any questions about our Shipping and Delivery Policy, please contact us at: connect@saasnext.in
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
