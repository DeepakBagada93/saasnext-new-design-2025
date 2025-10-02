
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const documentationSteps = [
    {
        title: "1. Accessing Your Dashboard",
        content: "After logging in, you'll land on your personal dashboard. This is your command center for all your projects and requests with SaaSNext. You'll get a quick overview of your active projects, pending service requests, and recent notifications.",
    },
    {
        title: "2. Managing Your Projects",
        content: "Navigate to the 'Projects' tab to see a detailed list of all your projects. You can click on any project to view its status, timeline, recent updates from our team, and access important files or links.",
    },
    {
        title: "3. Submitting Service Requests",
        content: "Need something new? Go to 'New Service Request' to submit your requirements. Fill in the details about the service you need, your budget, and any specific goals. Our team will review it and get back to you with a proposal.",
    },
    {
        title: "4. Viewing Invoices",
        content: "The 'Quotations' section contains all your billing information. You can view past and current invoices, check their status (Paid, Due, Overdue), and download PDF copies for your records.",
    },
    {
        title: "5. Scheduling a Meeting",
        content: "If you need to discuss something with our team, use the 'Schedule a Meeting' feature. You can propose a topic, preferred date, and time. We'll confirm the meeting and add it to our calendars.",
    },
     {
        title: "6. Updating Your Profile",
        content: "Keep your contact information up-to-date in the 'Profile' section. This ensures we can always reach you with important updates about your projects.",
    }
];

export default function DocumentationPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Client Hub Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Welcome to your SaaSNext client hub! Here’s a simple guide to help you navigate and make the most of your portal.
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <div className="space-y-8">
            {documentationSteps.map(step => (
                <Card key={step.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                            <CheckCircle className="h-6 w-6 text-primary" />
                            {step.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{step.content}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
