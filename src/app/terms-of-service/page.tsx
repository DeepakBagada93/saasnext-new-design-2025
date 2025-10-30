
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto space-y-8 text-muted-foreground">
        <p>
            Please read these Terms of Service carefully before using our website and services operated by SaaSNext. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>1. Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            The Service and its original content, features and functionality are and will remain the exclusive property of SaaSNext and its licensors.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>4. Limitation Of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            In no event shall SaaSNext, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            If you have any questions about these Terms, please contact us at: connect@saasnext.in
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
