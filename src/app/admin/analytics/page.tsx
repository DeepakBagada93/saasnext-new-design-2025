import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">Deep dive into platform metrics.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">More detailed revenue reports, client activity, and project statistics will be shown here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
