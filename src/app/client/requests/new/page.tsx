
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const formatCurrency = (amount: number, currency: string) => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  };

  if (currency === 'USD') {
    options.minimumFractionDigits = 2;
  }

  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', options).format(amount);
};


export default function NewRequestPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('INR');
  
  // State for conditional fields
  const [websiteType, setWebsiteType] = useState('');
  const [aiRequirements, setAiRequirements] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const calculateTotalBudget = () => {
    return selectedServices.reduce((total, serviceTitle) => {
        const service = services.find(s => s.title === serviceTitle);
        if (!service) return total;
        
        const price = currency === 'USD' 
            ? (service.startingPriceUsd || 0)
            : (service.startingPrice || 0);
            
        return total + price;
    }, 0);
  }


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
          'Please select at least one service type and provide a project description.',
      });
      return;
    }
    
    const totalBudget = calculateTotalBudget();

    // Construct additional details object
    const additionalDetails: any = {};
    if (selectedServices.includes('Web Development') && websiteType) {
        additionalDetails.websiteType = websiteType;
    }
    if (selectedServices.includes('AI Solutions') && aiRequirements) {
        additionalDetails.aiRequirements = aiRequirements;
    }
     if (companyName) {
        additionalDetails.companyName = companyName;
    }
    if (websiteUrl) {
        additionalDetails.websiteUrl = websiteUrl;
    }
    if (contactNumber) {
        additionalDetails.contactNumber = contactNumber;
    }
    if (whatsappNumber) {
        additionalDetails.whatsappNumber = whatsappNumber;
    }

    try {
      await addDoc(collection(firestore, 'serviceRequests'), {
        userId: user.uid,
        clientName: user.displayName,
        clientEmail: user.email,
        serviceType: selectedServices.join(', '), // Join selected services into a string
        description,
        budget: totalBudget,
        currency,
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
  
  const totalBudget = calculateTotalBudget();

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
            Select the services you're interested in and provide as much detail as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <Label className="text-base font-semibold">Which service(s) are you interested in?</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="currency" className="font-semibold text-sm">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency" className="w-[100px]">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => {
                  const isSelected = selectedServices.includes(service.title);
                  
                  const price = currency === 'USD' 
                    ? (service.startingPriceUsd || 0)
                    : (service.startingPrice || 0);

                  return (
                    <motion.div
                      layout
                      key={service.slug}
                      onClick={() => {
                          setSelectedServices((prev) =>
                              prev.includes(service.title)
                              ? prev.filter((s) => s !== service.title)
                              : [...prev, service.title]
                          );
                      }}
                      className={cn(
                        'p-4 border rounded-lg cursor-pointer transition-all duration-300 relative flex flex-col',
                        isSelected
                          ? 'border-primary ring-2 ring-primary bg-primary/10'
                          : 'bg-card hover:bg-muted/50'
                      )}
                    >
                      <div className="flex-grow">
                          {isSelected && (
                             <CheckCircle className="h-5 w-5 text-primary absolute top-2 right-2"/>
                          )}
                          <h4 className="font-semibold">{service.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{service.description.substring(0, 70)}...</p>
                      </div>
                       <div className="mt-4">
                          <p className="text-xs text-muted-foreground">Starts at</p>
                          <p className="font-bold text-lg text-primary">{formatCurrency(price, currency)}</p>
                       </div>
                    
                     <AnimatePresence>
                      {isSelected && (service.title === 'Web Development' || service.title === 'AI Solutions') && (
                          <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-4"
                          >
                            {service.title === 'Web Development' && (
                              <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                                  <Label>What type of website do you need?</Label>
                                  <RadioGroup value={websiteType} onValueChange={setWebsiteType} className="gap-3">
                                      <div className="flex items-center space-x-2"><RadioGroupItem value="e-commerce" id="e-commerce" /><Label htmlFor="e-commerce">E-commerce</Label></div>
                                      <div className="flex items-center space-x-2"><RadioGroupItem value="corporate" id="corporate" /><Label htmlFor="corporate">Corporate/Brochure</Label></div>
                                      <div className="flex items-center space-x-2"><RadioGroupItem value="portfolio" id="portfolio" /><Label htmlFor="portfolio">Portfolio/Personal</Label></div>
                                      <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">Other</Label></div>
                                  </RadioGroup>
                              </div>
                            )}
                            {service.title === 'AI Solutions' && (
                              <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                                  <Label htmlFor="ai-requirements">What are your AI requirements?</Label>
                                  <Textarea
                                      id="ai-requirements"
                                      placeholder="e.g., Customer service chatbot, data analysis model..."
                                      value={aiRequirements}
                                      onChange={(e) => setAiRequirements(e.target.value)}
                                      className="bg-background"
                                  />
                              </div>
                            )}
                          </motion.div>
                      )}
                     </AnimatePresence>
                  </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <AnimatePresence>
                {selectedServices.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-lg bg-muted/50 flex flex-col sm:flex-row justify-between items-center"
                    >
                        <h4 className="font-semibold text-lg">Estimated Total:</h4>
                        <p className="font-bold text-2xl text-primary">{formatCurrency(totalBudget, currency)}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-base font-semibold">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your Company Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="text-base font-semibold">Current Website URL (if any)</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://your-website.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-base font-semibold">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="+91 12345 67890"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber" className="text-base font-semibold">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    placeholder="+91 12345 67890"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                  />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">Tell us about your project</Label>
              <Textarea
                id="description"
                placeholder="Describe your goals, requirements, target audience, and any other important details."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90" disabled={selectedServices.length === 0}>
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
