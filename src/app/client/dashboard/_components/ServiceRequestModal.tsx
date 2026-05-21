'use client';

import { useState } from "react";
import { 
  PlusCircle, 
  Bot, 
  Code2, 
  Megaphone, 
  ArrowRight,
  Send,
  Loader2
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
import { Input } from "@/components/ui/input";
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
  
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(initialType);
  const [details, setDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('service_requests').insert({
        client_id: user.id,
        service_type: serviceTypes.find(t => t.id === type)?.title || type,
        details,
        status: 'Pending',
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We've received your request and will review it shortly.",
      });
      onClose();
      setDetails('');
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-[#0A0A0A]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">New Service Request</DialogTitle>
          <DialogDescription>
            Tell us what you need, and we'll handle the roadmap.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
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
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="h-11 bg-accent px-8 font-bold hover:bg-accent/90"
              disabled={loading || !details.trim()}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
