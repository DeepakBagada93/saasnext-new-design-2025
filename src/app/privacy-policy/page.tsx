
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto space-y-8 text-muted-foreground">
        <p>
            Welcome to SaaSNext. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            We may collect personal information such as your name, email address, phone number, and company information when you register for an account, request a service, or contact us.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="list-disc pl-5 space-y-2">
                <li>To provide, operate, and maintain our services.</li>
                <li>To improve, personalize, and expand our services.</li>
                <li>To understand and analyze how you use our services.</li>
                <li>To develop new products, services, features, and functionality.</li>
                <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                <li>To process your transactions and manage your orders.</li>
                <li>To find and prevent fraud.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Security of Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>4. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            If you have questions or comments about this Privacy Policy, please contact us at: connect@saasnext.in
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
