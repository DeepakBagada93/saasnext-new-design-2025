"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, Globe, Clock, Info, ShieldCheck, ChevronRight, ChevronLeft, Rocket, Cpu, TrendingUp, Briefcase, Bot, Layers, ShoppingBag, LayoutDashboard, UserPlus, Filter, Search, MessageSquareText, Zap, Mic, Database, Calendar, Repeat } from "lucide-react";
import { 
  PRICING_SERVICES, PRICING_CATEGORIES, 
  CURRENCIES, CurrencyCode, 
  CONTRACT_PERIODS
} from "@/lib/pricing-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { sendNotificationEmail } from "@/app/actions/send-notification-email";

const CATEGORY_ICONS: Record<string, any> = {
  "Digital Presence": Globe,
  "Growth & Lead Gen": TrendingUp,
  "AI & WhatsApp": Bot,
  "Business Operations": Briefcase,
};

const SERVICE_ICONS: Record<string, any> = {
  Globe, Layers, ShoppingBag, LayoutDashboard, UserPlus, Filter, Search, TrendingUp, Bot, MessageSquareText, Zap, Mic, Database, Calendar, Repeat, ShieldCheck
};

export const PricingCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("INR");
  const [contractMonths, setContractMonths] = useState<number>(1);
  
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentCurrency = useMemo(() => 
    CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0],
    [currencyCode]
  );

  const currentContract = useMemo(() => 
    CONTRACT_PERIODS.find(p => p.months === contractMonths) || CONTRACT_PERIODS[0],
    [contractMonths]
  );

  const selectedServices = useMemo(() => 
    PRICING_SERVICES.filter(s => selectedIds.includes(s.id)),
    [selectedIds]
  );

  // Calculation Engine
  const basePrice = useMemo(() => 
    selectedServices.reduce((sum, s) => sum + s.prices[currencyCode], 0),
    [selectedServices, currencyCode]
  );
  const contractDiscount = basePrice * currentContract.discount;
  const finalPrice = Math.max(0, basePrice - contractDiscount);

  const toggleService = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    setIsSubmitting(true);
    try {
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCurrency: ${currentCurrency.code}\nPeriod: ${currentContract.label}\nTotal: ${currentCurrency.symbol}${finalPrice}\nServices: ${selectedServices.map(s => s.name).join(', ')}`;
      await sendNotificationEmail(`Global Build [${currentCurrency.code}]: ${formData.name}`, body, formData.email, formData.email);
      setIsSubmitted(true);
    } catch (err) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [...PRICING_CATEGORIES, "Review & Launch"];

  if (isSubmitted) {
    return (
      <section className="py-40 bg-black flex items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="text-accent text-7xl font-bold">✓</div>
          <h2 className="text-4xl font-headline text-white font-bold tracking-tight">Transmission Complete.</h2>
          <p className="text-neutral-500 max-w-sm mx-auto font-medium">Uplink received. Our engineers are reviewing your configuration.</p>
          <Button onClick={() => { setIsSubmitted(false); setCurrentStep(0); setSelectedIds([]); }} variant="outline" className="rounded-full border-neutral-800 text-neutral-400">New Build</Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 md:py-32 bg-black text-white selection:bg-accent/20 border-y border-neutral-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Step Navigation Bar */}
        <div className="mb-12 md:mb-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter">AI OS <span className="text-accent italic">Architect.</span></h2>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">AI Business OS v5.0</p>
                </div>
                
                {/* Horizontal Stepper Indicator */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-4 lg:pb-0">
                    {steps.map((step, idx) => {
                        const Icon = CATEGORY_ICONS[step] || Check;
                        const isActive = currentStep === idx;
                        const isDone = currentStep > idx;
                        return (
                            <div key={step} className="flex items-center gap-2 shrink-0">
                                <button 
                                    onClick={() => setCurrentStep(idx)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all",
                                        isActive ? "bg-white text-black border-white shadow-xl" : "bg-neutral-900/40 border-neutral-800 text-neutral-500 hover:text-neutral-300"
                                    )}
                                >
                                    <Icon className={cn("w-3.5 h-3.5", isActive ? "text-accent" : "text-neutral-600")} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{step.split(' ')[0]}</span>
                                    {isDone && <Check className="w-3 h-3 text-emerald-500" />}
                                </button>
                                {idx < steps.length - 1 && <div className="w-4 h-px bg-neutral-900" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* Main Area (8/12) */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {currentStep < PRICING_CATEGORIES.length ? (
                <motion.div 
                    key={steps[currentStep]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-px bg-accent/40" />
                        <h3 className="text-xl font-bold tracking-tight text-white">{steps[currentStep]}</h3>
                        <div className="h-px flex-1 bg-neutral-900" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PRICING_SERVICES.filter(s => s.category === steps[currentStep]).map(s => {
                            const SvgIcon = SERVICE_ICONS[s.icon] || Info;
                            return (
                                <button 
                                    key={s.id}
                                    onClick={() => toggleService(s.id)}
                                    className={cn(
                                        "flex items-center justify-between gap-6 p-7 rounded-[2rem] border transition-all duration-300 text-left relative overflow-hidden group",
                                        selectedIds.includes(s.id)
                                        ? "bg-white text-black border-white shadow-xl scale-[1.02]"
                                        : "bg-neutral-900/10 border-neutral-800 hover:border-neutral-700 text-neutral-400"
                                    )}
                                >
                                    <div className="space-y-3 relative z-10 flex-1 min-w-0">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            selectedIds.includes(s.id) ? "bg-black/5 text-black" : "bg-neutral-800/50 text-neutral-600"
                                        )}>
                                            <SvgIcon className="w-4 h-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-bold text-base md:text-lg tracking-tight leading-tight truncate">{s.name}</div>
                                            <div className={cn("text-[10px] font-mono tracking-widest uppercase", 
                                                selectedIds.includes(s.id) ? "text-neutral-500" : "text-neutral-700"
                                            )}>{currentCurrency.symbol}{s.prices[currencyCode].toLocaleString()} / MO</div>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shrink-0 relative z-10",
                                        selectedIds.includes(s.id) ? "bg-black border-black" : "border-neutral-800 opacity-40 group-hover:opacity-100"
                                    )}>
                                        {selectedIds.includes(s.id) ? <Check className="w-5 h-5 text-white" strokeWidth={4} /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
              ) : (
                <motion.div 
                    key="launch"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                >
                    <div className="bg-neutral-900/20 border border-neutral-900 rounded-[3rem] p-10 md:p-16 space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                        
                        <div className="space-y-6 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                <Rocket className="w-3 h-3 text-accent" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-accent">Deployment Ready</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter">Your Custom <span className="text-accent">AI OS Plan.</span></h3>
                            <p className="text-neutral-500 max-w-xl text-lg">We've architected a bespoke operational stack based on your selections. Review your configuration and initialize the uplink.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Selected Modules</span>
                                    <div className="space-y-3">
                                        {selectedServices.map(s => (
                                            <div key={s.id} className="flex justify-between items-center py-3 border-b border-neutral-800/50">
                                                <span className="text-sm text-neutral-300 font-medium">{s.name}</span>
                                                <span className="text-xs font-mono text-neutral-500">{currentCurrency.symbol}{s.prices[currencyCode].toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 flex justify-between items-center">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-accent">Monthly Investment</p>
                                        <p className="text-xs text-neutral-500">{currentContract.label} Billing Cycle</p>
                                    </div>
                                    <div className="text-3xl font-bold text-white tracking-tighter">
                                        {currentCurrency.symbol}{finalPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Initialize Uplink</span>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <Input name="name" required placeholder="FULL NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-14 bg-black/50 border-neutral-800 rounded-xl focus:border-accent text-xs font-bold tracking-widest" />
                                        <Input name="email" type="email" required placeholder="WORK EMAIL" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-14 bg-black/50 border-neutral-800 rounded-xl focus:border-accent text-xs font-bold tracking-widest" />
                                        <Input name="phone" required placeholder="WHATSAPP NUMBER" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-14 bg-black/50 border-neutral-800 rounded-xl focus:border-accent text-xs font-bold tracking-widest" />
                                        <Button type="submit" disabled={isSubmitting || selectedIds.length === 0} className="w-full h-16 bg-accent text-white hover:bg-accent/90 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl shadow-accent/20">
                                            {isSubmitting ? "ENCRYPTING..." : "DEPLOY MY AI OS"}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-neutral-900">
                <Button 
                    variant="ghost" 
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className="text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-white disabled:opacity-0"
                >
                    <ChevronLeft className="mr-2 w-4 h-4" /> Previous
                </Button>
                {currentStep < steps.length - 1 && (
                    <Button 
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        className="bg-white text-black hover:bg-neutral-200 rounded-xl px-10 h-14 text-[10px] font-black uppercase tracking-widest"
                    >
                        Next Step <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </div>
          </div>

          {/* Persistent Summary Sidebar (4/12) */}
          <div className="lg:col-span-4 lg:sticky lg:top-10 space-y-6">
            <div className="bg-[#050505] border border-neutral-900 rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="space-y-8 relative z-10">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">Total Estimation</span>
                        <div className="space-y-1">
                            <motion.div key={finalPrice + currencyCode} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl font-bold tracking-tighter text-white">
                                {currentCurrency.symbol}{finalPrice.toLocaleString()}
                            </motion.div>
                            <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">Monthly commitment in {currentCurrency.code}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Region & Cycle</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div className="bg-neutral-900/40 p-1 rounded-xl border border-neutral-800 flex overflow-hidden">
                                {CURRENCIES.map(c => (
                                    <button key={c.code} onClick={() => setCurrencyCode(c.code)} className={cn("flex-1 py-2 rounded-lg text-[9px] font-bold transition-all", currencyCode === c.code ? "bg-white text-black" : "text-neutral-500")}>{c.code}</button>
                                ))}
                             </div>
                             <div className="bg-neutral-900/40 p-1 rounded-xl border border-neutral-800 flex overflow-hidden">
                                {CONTRACT_PERIODS.map(p => (
                                    <button key={p.months} onClick={() => setContractMonths(p.months)} className={cn("flex-1 py-2 rounded-lg text-[9px] font-bold transition-all", contractMonths === p.months ? "bg-accent text-white" : "text-neutral-500")}>{p.months}M</button>
                                ))}
                             </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Stack Contents</span>
                            <span className="text-[10px] font-mono text-accent">{selectedIds.length} ACTIVE</span>
                        </div>
                        <div className="space-y-3 max-h-[150px] overflow-y-auto no-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {selectedServices.map(s => (
                                    <motion.div key={s.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-between items-center group">
                                        <span className="text-xs text-neutral-500 group-hover:text-white transition-colors">{s.name}</span>
                                        <button onClick={() => toggleService(s.id)} className="text-neutral-700 hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5" /></button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {selectedIds.length === 0 && <p className="text-[10px] text-neutral-800 uppercase tracking-widest italic py-4">Build Empty...</p>}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-[9px] text-neutral-700 font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Global Infrastructure Secured</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Mobile Bar - Small and Compact */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-white text-black px-6 py-4 rounded-2xl flex justify-between items-center shadow-2xl border border-white/20">
            <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase tracking-widest opacity-50">Current Total</span>
                <span className="text-xl font-bold tracking-tighter">{currentCurrency.symbol}{finalPrice.toLocaleString()}</span>
            </div>
            <Button onClick={() => { if(currentStep < steps.length - 1) setCurrentStep(steps.length - 1); }} size="sm" className="bg-black text-white rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest">
                {currentStep === steps.length - 1 ? "Initialize" : "Launch"}
            </Button>
        </div>
      </div>
    </section>
  );
};
