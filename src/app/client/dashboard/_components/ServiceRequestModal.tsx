'use client';

import { useState } from "react";
import { 
  PlusCircle, 
  Bot, 
  Code2, 
  Megaphone, 
  ArrowRight,
  Send,
  Loader2,
  CheckCircle,
  Zap,
  ArrowLeft
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useSupabase, useUser } from "@/supabase/provider";
import { useToast } from "@/hooks/use-toast";
import { usePackages, Package } from "@/hooks/use-packages";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const serviceTypes = [
  { id: 'website', title: 'Website Development', icon: Code2 },
  { id: 'ai', title: 'AI Automation', icon: Bot },
  { id: 'marketing', title: 'Digital Marketing', icon: Megaphone },
];

export function ServiceRequestModal({ 
  isOpen, 
  onClose, 
  initialType = 'website' 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialType?: string;
}) {
  const { supabase } = useSupabase();
  const { user } = useUser();
  const { toast } = useToast();
  const { packages, isLoading: loadingPackages } = usePackages();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(initialType);
  const [details, setDetails] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleNext = () => {
    if (step === 1 && details.trim()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('service_requests').insert({
        client_id: user.id,
        service_type: serviceTypes.find(t => t.id === type)?.title || type,
        details,
        status: 'Pending',
        created_at: new Date().toISOString(),
        metadata: {
          package_id: selectedPackage?.id,
          package_title: selectedPackage?.title,
          package_price: selectedPackage?.price
        }
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We've received your request and will review it shortly.",
      });
      handleClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDetails('');
      setSelectedPackage(null);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn(
        "border-white/10 bg-[#0A0A0A] transition-all duration-300",
        step === 1 ? "sm:max-w-[500px]" : "sm:max-w-[900px] max-h-[90vh] overflow-y-auto"
      )}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            {step === 1 ? "New Service Request" : "Choose Your Plan"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Tell us what you need, and we'll handle the roadmap." 
              : "Select a package that best fits your business goals."}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 pt-4"
            >
              <div className="space-y-2">
                <Label>What do you need help with?</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-12 border-white/10 bg-white/5">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0A0A0A]">
                    {serviceTypes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <div className="flex items-center gap-2">
                          <t.icon className="h-4 w-4 text-accent" />
                          {t.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Tell us your goal (briefly)</Label>
                <Textarea
                  id="details"
                  placeholder="e.g. I want to build a high-conversion landing page for my new SaaS product."
                  className="min-h-[120px] resize-none border-white/10 bg-white/5 focus-visible:ring-accent"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </div>

              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="h-11 bg-accent px-8 font-bold hover:bg-accent/90"
                  onClick={handleNext}
                  disabled={!details.trim()}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pt-4"
            >
              {loadingPackages ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={cn(
                        "relative flex flex-col justify-between rounded-xl border p-4 transition cursor-pointer group",
                        selectedPackage?.id === pkg.id 
                          ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(242,106,46,0.1)]" 
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      )}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 -right-2 bg-accent text-[8px] font-black px-2 py-0.5 rounded-full z-10 uppercase tracking-widest text-white">
                          Popular
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className={cn("h-4 w-4", selectedPackage?.id === pkg.id ? "text-accent" : "text-neutral-500")} />
                          <h3 className="text-xs font-bold uppercase tracking-wider">{pkg.title}</h3>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                          {pkg.description}
                        </p>
                        <div className="text-lg font-bold text-white mb-1">
                          {pkg.price ? pkg.price.replace('Starting From ', '') : 'Custom Quote'}
                        </div>
                        <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-tighter">
                          Approx {pkg.price_usd} USD
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-4">
                        {pkg.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle className="h-2.5 w-2.5 text-accent shrink-0 mt-0.5" />
                            <span className="text-[9px] text-neutral-400">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={cn(
                        "h-8 flex items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-widest transition",
                        selectedPackage?.id === pkg.id 
                          ? "bg-accent text-white" 
                          : "bg-white/10 text-white group-hover:bg-white/20"
                      )}>
                        {selectedPackage?.id === pkg.id ? "Selected" : "Select Plan"}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <DialogFooter className="pt-4 border-t border-white/5">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleBack}
                  disabled={loading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Skip & Submit
                  </Button>
                  <Button 
                    type="button" 
                    className="h-11 bg-accent px-8 font-bold hover:bg-accent/90"
                    onClick={handleSubmit}
                    disabled={loading || !selectedPackage}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Complete Request
                  </Button>
                </div>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
