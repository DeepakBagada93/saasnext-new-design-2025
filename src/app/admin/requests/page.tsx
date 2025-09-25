import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminRequestsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Service Requests</h1>
                <p className="text-muted-foreground">Approve or reject new client requests.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold">New Website for "Coffee Co."</h3>
                                <p className="text-sm text-muted-foreground">Client: client-3</p>
                                <p className="text-sm mt-2">Description: We need a new e-commerce website to sell our coffee beans online...</p>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline">Reject</Button>
                                <Button size="sm">Approve</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
