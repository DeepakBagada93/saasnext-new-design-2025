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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePackages } from '@/hooks/use-packages';
import { useUser, useSupabase } from '@/supabase/provider';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { CheckCircle, Zap, Globe, Bot, Palette, Rocket, ArrowRight, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const formatCurrency = (amount: number, currency: string) => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', options).format(amount);
};

export default function NewRequestPage() {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const router = useRouter();
  const { groupedPlans: pricingPlans, isLoading } = usePackages();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [customServiceDescription, setCustomServiceDescription] = useState('');
  const [currency, setCurrency] = useState('INR');
  
  // State for conditional fields
  const [websiteType, setWebsiteType] = useState('');
  const [aiRequirements, setAiRequirements] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const allPlans = (pricingPlans || []).flatMap(category => category.plans.map(plan => ({...plan, category: category.category})));

  const calculateTotalBudget = () => {
    return selectedServices.reduce((total, serviceTitle) => {
        const plan = allPlans.find(p => p.title === serviceTitle);
        if (!plan) return total;
        
        const priceString = currency === 'USD' ? plan.priceUsd : plan.price;
        // Improved parsing for range-based pricing
        const cleanPrice = priceString.replace(/[^0-9–-]/g, '').split(/[–-]/)[0];
        const priceValue = parseInt(cleanPrice, 10) || 0;
            
        return total + priceValue;
    }, 0);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to finalize your request.',
      });
      return;
    }

    const finalDescription = customServiceDescription ? `Custom Request: ${customServiceDescription}\n\nProject Scope: ${description}` : description;
    const finalServiceType = selectedServices.length > 0 ? selectedServices.join(', ') : 'Custom Strategy';

    const totalBudget = calculateTotalBudget();

    const payload: any = {
        website_type: websiteType || null,
        ai_requirements: aiRequirements || null,
        company_name: companyName || null,
        website_url: websiteUrl || null,
        contact_number: contactNumber || null,
        whatsapp_number: whatsappNumber || null,
        metadata: {
            selected_plans: selectedServices,
            calculated_total: totalBudget
        }
    };

    try {
      const { error } = await supabase.from('service_requests').insert([{
        client_id: user.id,
        client_name: user.user_metadata?.full_name || user.email,
        client_email: user.email,
        service_type: finalServiceType,
        description: finalDescription,
        budget: totalBudget > 0 ? totalBudget : null,
        currency,
        status: 'Pending',
        created_at: new Date().toISOString(),
        ...payload
      }]);
      
      if (error) throw error;
      
      toast({
        title: 'Mission Initialized',
        description: "We've received your strategy request. An expert will reach out within 24 hours.",
      });
      router.push('/client/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Initialization Failed',
        description: error.message,
      });
    }
  };
  
  const totalBudget = calculateTotalBudget();

  if (isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-[#050505]">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
    );
  }

  return (
    <div className="space-y-12 pb-12 bg-[#050505] min-h-screen text-white p-4 md:p-8">
      <header className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-accent uppercase">
            <Zap className="w-3 h-3" />
            Strategic Selection
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">New Mission Request</h1>
        <p className="text-neutral-400 text-lg">
          Select your growth pillars or describe a custom objective.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12 max-w-6xl">
        {/* Service Selection */}
        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-accent" />
                    Growth Pillars
                </h2>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
                    <Label htmlFor="currency" className="font-mono text-[10px] uppercase text-neutral-500 ml-2">Market Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency" className="w-[100px] bg-transparent border-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-12">
                {pricingPlans.map((category) => (
                    <div key={category.category} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/10" />
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80 font-bold">{category.category}</h3>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.plans.map((plan) => {
                                const isSelected = selectedServices.includes(plan.title);
                                return (
                                    <motion.div
                                        key={plan.title}
                                        whileHover={{ y: -5 }}
                                        onClick={() => {
                                            setSelectedServices((prev) =>
                                                prev.includes(plan.title)
                                                ? prev.filter((s) => s !== plan.title)
                                                : [...prev, plan.title]
                                            );
                                        }}
                                        className={cn(
                                            'p-6 border rounded-[2rem] cursor-pointer transition-all duration-500 relative flex flex-col group',
                                            isSelected
                                            ? 'border-accent bg-accent/5 ring-1 ring-accent'
                                            : 'border-white/5 bg-white/5 hover:border-white/20'
                                        )}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-6 right-6">
                                                <CheckCircle className="h-6 w-6 text-accent"/>
                                            </div>
                                        )}
                                        
                                        <div className="flex-grow space-y-4">
                                            <h4 className="text-xl font-bold group-hover:text-accent transition-colors">{plan.title}</h4>
                                            <p className="text-sm text-neutral-500 leading-relaxed">{plan.description}</p>
                                            
                                            <ul className="space-y-2 mt-4">
                                                {plan.features.slice(0, 3).map((f, i) => (
                                                    <li key={i} className="text-[11px] text-neutral-400 flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-accent/50" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-end justify-between">
                                            <div>
                                                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Investment</p>
                                                <p className="text-xl font-bold text-white">{currency === 'INR' ? plan.price : plan.priceUsd}</p>
                                            </div>
                                            <Zap className={cn("w-5 h-5 transition-all", isSelected ? "text-accent fill-accent" : "text-neutral-700")} />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Dynamic Budget & Payload */}
        <AnimatePresence>
            {selectedServices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 rounded-[2.5rem] bg-accent/10 border border-accent/20 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_50px_rgba(41,171,226,0.1)]"
                >
                    <div className="space-y-1 text-center md:text-left">
                        <h4 className="text-neutral-400 font-mono text-xs uppercase tracking-widest">Total Strategic Investment</h4>
                        <p className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                            {formatCurrency(totalBudget, currency)}
                            <span className="text-lg text-accent ml-2">+</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase">Estimated Starting Price</p>
                        <div className="flex gap-2">
                            {selectedServices.map(s => (
                                <div key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Configuration Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-white/5">
            <div className="space-y-8">
                <h2 className="text-2xl font-bold font-headline">Mission Configuration</h2>
                
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Custom Requirements</Label>
                        <Textarea
                            placeholder="Describe any specialized needs or project specific goals..."
                            rows={4}
                            value={customServiceDescription}
                            onChange={(e) => setCustomServiceDescription(e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-accent rounded-2xl p-6"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Deep Project Scope</Label>
                        <Textarea
                            placeholder="Goals, target audience, technical hurdles..."
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-accent rounded-2xl p-6"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-8 bg-white/5 p-8 rounded-[3rem] border border-white/10">
                <h2 className="text-xl font-bold font-headline">Intelligence Sync</h2>
                
                <div className="grid gap-6">
                    <div className="space-y-3">
                        <Label className="text-[10px] font-mono text-neutral-500 uppercase">Enterprise / Entity Name</Label>
                        <Input
                            placeholder="Your Company Inc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="bg-black/20 border-white/5 focus:border-accent h-14 px-6 rounded-xl"
                        />
                    </div>
                    
                    <div className="space-y-3">
                        <Label className="text-[10px] font-mono text-neutral-500 uppercase">Digital Coordinates (URL)</Label>
                        <Input
                            type="url"
                            placeholder="https://vision.com"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="bg-black/20 border-white/5 focus:border-accent h-14 px-6 rounded-xl"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-mono text-neutral-500 uppercase">Comm. Channel</Label>
                            <Input
                                placeholder="Contact Number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                className="bg-black/20 border-white/5 focus:border-accent h-14 px-6 rounded-xl text-sm"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-mono text-neutral-500 uppercase">Direct WhatsApp</Label>
                            <Input
                                placeholder="WhatsApp ID"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className="bg-black/20 border-white/5 focus:border-accent h-14 px-6 rounded-xl text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <Button 
                        type="submit" 
                        size="lg" 
                        disabled={selectedServices.length === 0 && !customServiceDescription}
                        className="w-full h-16 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] group transition-all"
                    >
                        Initialize Project
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-center text-[10px] text-neutral-600 mt-4 font-mono uppercase tracking-widest">
                        SECURE ENCRYPTED TRANSMISSION
                    </p>
                </div>
            </div>
        </section>
      </form>
    </div>
  );
}
