'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { services } from '@/lib/data';
import { useUser, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function NewRequestPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [timeline, setTimeline] = useState<Date>();

  // State for conditional fields
  const [websiteType, setWebsiteType] = useState('');
  const [aiRequirements, setAiRequirements] = useState('');

  const handleServiceChange = (serviceTitle: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceTitle)
        ? prev.filter((s) => s !== serviceTitle)
        : [...prev, serviceTitle]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not Authenticated',
        description: 'You must be logged in to submit a request.',
      });
      return;
    }

    if (selectedServices.length === 0 || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description:
          'Please select at least one service type and provide a description.',
      });
      return;
    }
    
    // Construct additional details object
    const additionalDetails: any = {};
    if (selectedServices.includes('Web Development') && websiteType) {
        additionalDetails.websiteType = websiteType;
    }
    if (selectedServices.includes('AI Solutions') && aiRequirements) {
        additionalDetails.aiRequirements = aiRequirements;
    }

    try {
      await addDoc(collection(firestore, 'serviceRequests'), {
        userId: user.uid,
        clientName: user.displayName,
        clientEmail: user.email,
        serviceType: selectedServices.join(', '), // Join selected services into a string
        description,
        budget: Number(budget) || null,
        currency,
        timeline: timeline ? timeline.toISOString() : null,
        status: 'Pending',
        requestedAt: serverTimestamp(),
        ...additionalDetails
      });
      toast({
        title: 'Request Submitted',
        description:
          "We've received your request and will get back to you shortly.",
      });
      router.push('/client/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">New Service Request</h1>
        <p className="text-muted-foreground">
          Let us know what you need, and we'll get back to you with a proposal.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>
            Provide as much detail as possible for a more accurate quote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-3">
              <Label>Service Type(s)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-md border p-4">
                {services.map((service) => (
                  <div key={service.slug} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.slug}
                      checked={selectedServices.includes(service.title)}
                      onCheckedChange={() => handleServiceChange(service.title)}
                    />
                    <Label htmlFor={service.slug} className="font-normal">
                      {service.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {selectedServices.includes('Web Development') && (
                <div className="space-y-3 pt-2">
                    <Label>Website Type</Label>
                    <RadioGroup value={websiteType} onValueChange={setWebsiteType} className="flex flex-col sm:flex-row gap-4">
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="e-commerce" id="e-commerce" />
                            <Label htmlFor="e-commerce">E-commerce Store</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="corporate" id="corporate" />
                            <Label htmlFor="corporate">Corporate / Brochure</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="portfolio" id="portfolio" />
                            <Label htmlFor="portfolio">Portfolio / Personal</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                        </div>
                    </RadioGroup>
                </div>
            )}

            {selectedServices.includes('AI Solutions') && (
                <div className="space-y-2 pt-2">
                    <Label htmlFor="ai-requirements">Specific AI Requirements</Label>
                    <Textarea
                        id="ai-requirements"
                        placeholder="e.g., Customer service chatbot, data analysis model, image generation feature..."
                        value={aiRequirements}
                        onChange={(e) => setAiRequirements(e.target.value)}
                    />
                </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, goals, and requirements."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Preferred Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 5000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Preferred Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Preferred Timeline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !timeline && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {timeline ? (
                      format(timeline, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={timeline}
                    onSelect={setTimeline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="pt-2">
              <Button type="submit" className="bg-accent hover:bg-accent/90">
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
