import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/data";

export default function NewRequestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">New Service Request</h1>
        <p className="text-muted-foreground">Let us know what you need, and we'll get back to you with a proposal.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Provide as much detail as possible for a more accurate quote.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="service-type">Service Type</Label>
              <Select>
                <SelectTrigger id="service-type">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.slug} value={service.slug}>{service.title}</SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea id="description" placeholder="Describe your project, goals, and requirements." rows={6} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Preferred Budget (USD)</Label>
                <Input id="budget" type="number" placeholder="e.g., 5000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <Input id="timeline" type="date" />
              </div>
            </div>
            <div className="pt-2">
                <Button type="submit" className="bg-accent hover:bg-accent/90">Submit Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
