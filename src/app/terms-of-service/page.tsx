
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto space-y-8 text-muted-foreground">
        <p>
            Please read these Terms and Conditions carefully before using our website and services operated by SaaSNext. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>1. Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            The Service and its original content, features and functionality are and will remain the exclusive property of SaaSNext and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Purchases and Payments</CardTitle>
          </CardHeader>
          <CardContent>
            If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information. We use third-party services for payment processing (e.g., payment processors). We will not store or collect your payment card details.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>5. Limitation Of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            In no event shall SaaSNext, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            These Terms shall be governed and construed in accordance with the laws of Gujarat, India, without regard to its conflict of law provisions.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            If you have any questions about these Terms, please contact us at: connect@saasnext.in
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
