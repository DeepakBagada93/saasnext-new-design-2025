'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  Palette, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Globe,
  Bot
} from 'lucide-react';
import { useSupabase, useUser } from '@/supabase/provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const STEPS = [
  { 
    id: 'vision', 
    title: 'The Vision', 
    icon: Sparkles, 
    description: 'What are we building together?',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    id: 'core', 
    title: 'Strategic Path', 
    icon: Target, 
    description: 'Define your primary objective.',
    color: 'from-purple-500 to-pink-400'
  },
  { 
    id: 'launch', 
    title: 'Launch Scope', 
    icon: Rocket, 
    description: 'Budget and timeline for takeoff.',
    color: 'from-orange-500 to-amber-400'
  },
];

const OBJECTIVES = [
  { id: 'lead_gen', label: 'Lead Generation', icon: Zap, desc: 'Fueling your sales pipeline with high-intent leads.' },
  { id: 'ecom', label: 'E-commerce', icon: Globe, desc: 'A high-performance digital storefront for global sales.' },
  { id: 'ai_agent', label: 'AI Automation', icon: Bot, desc: 'Intelligent agents to automate your business scale.' },
  { id: 'brand', label: 'Brand Identity', icon: Palette, desc: 'Establishing a premium presence that stands out.' },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    objective: '',
    projectName: '',
    outcome: '',
    timeline: '1-2 Months',
    budget: 'Premium (₹1L+)',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, isUserLoading } = useUser();
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if not logged in (after loading)
  useEffect(() => {
    if (!isUserLoading && !user) {
        router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // 1. Create a service request based on onboarding
      const { error: requestError } = await supabase.from('service_requests').insert({
        client_id: user.id,
        client_email: user.email!,
        client_name: user.user_metadata?.full_name || 'New Client',
        service_type: `Onboarding: ${formData.projectName || formData.objective}`,
        description: `Strategic Objective: ${formData.objective}. Final Outcome Vision: ${formData.outcome}. Timeline: ${formData.timeline}`,
        type: 'Onboarding',
        status: 'Pending',
        metadata: formData as any,
      });

      if (requestError) throw requestError;

      // 2. Mark profile as completed
      const { error: profileError } = await supabase.from('client_profiles').upsert({
        id: user.id,
        has_completed_onboarding: true,
        onboarding_completed_at: new Date().toISOString(),
        onboarding_data: formData as any,
      });

      if (profileError) throw profileError;

      toast({
        title: "Mission Initialized!",
        description: "Your project details have been securely received. Redirecting to your dashboard...",
      });
      
      router.push('/client/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Initialization Failed",
        description: error.message || "Failed to save onboarding details.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 selection:bg-accent selection:text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="w-full max-w-3xl z-10 space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono tracking-widest text-accent uppercase"
            >
                <Sparkles className="w-3 h-3" />
                Project Initialization
            </motion.div>
            <motion.h1 
                key={currentStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-5xl font-headline font-bold"
            >
                {STEPS[currentStep].title}
            </motion.h1>
            <p className="text-neutral-400 max-w-md mx-auto">{STEPS[currentStep].description}</p>
        </header>

        {/* Progress Bar */}
        <div className="flex justify-center gap-2">
            {STEPS.map((_, idx) => (
                <div 
                    key={idx} 
                    className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        idx === currentStep ? "w-12 bg-accent shadow-[0_0_15px_rgba(41,171,226,0.5)]" : 
                        idx < currentStep ? "w-8 bg-emerald-500" : "w-8 bg-white/10"
                    )} 
                />
            ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full"
                >
                    {currentStep === 0 && (
                        <div className="space-y-8 max-w-xl mx-auto text-center">
                            <div className="space-y-4">
                                <Label className="text-sm font-mono text-neutral-500 uppercase tracking-tighter">Project Name</Label>
                                <Input 
                                    placeholder="Enter project name..." 
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                                    className="h-16 text-2xl text-center bg-transparent border-white/10 focus:border-accent transition-all rounded-2xl"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-sm font-mono text-neutral-500 uppercase tracking-tighter">The Visionary Goal</Label>
                                <Textarea 
                                    placeholder="Describe the ultimate result of this project..." 
                                    value={formData.outcome}
                                    onChange={(e) => setFormData({...formData, outcome: e.target.value})}
                                    className="min-h-[150px] text-lg bg-white/5 border-white/10 focus:border-accent transition-all rounded-2xl p-6"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {OBJECTIVES.map((obj) => (
                                <Card 
                                    key={obj.id}
                                    onClick={() => setFormData({...formData, objective: obj.label})}
                                    className={cn(
                                        "p-6 cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-3xl group relative overflow-hidden",
                                        formData.objective === obj.label ? "border-accent ring-1 ring-accent" : ""
                                    )}
                                >
                                    {formData.objective === obj.label && (
                                        <div className="absolute top-4 right-4 text-accent">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                                        formData.objective === obj.label ? "bg-accent text-white" : "bg-white/5 text-neutral-400 group-hover:text-white"
                                    )}>
                                        <obj.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{obj.label}</h3>
                                    <p className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">{obj.desc}</p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-12 max-w-xl mx-auto">
                            <div className="space-y-6">
                                <Label className="text-sm font-mono text-neutral-500 uppercase tracking-tighter text-center block">Target Timeline</Label>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['Rapid (2-4 Weeks)', 'Standard (1-2 Months)', 'Scale (3+ Months)'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setFormData({...formData, timeline: t})}
                                            className={cn(
                                                "px-6 py-3 rounded-full border transition-all text-sm font-medium",
                                                formData.timeline === t ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(41,171,226,0.3)]" : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/20"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Label className="text-sm font-mono text-neutral-500 uppercase tracking-tighter text-center block">Budget Profile</Label>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['MVP (₹30k - ₹70k)', 'Premium (₹1L - ₹3L)', 'Enterprise (₹5L+)'].map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => setFormData({...formData, budget: b})}
                                            className={cn(
                                                "px-6 py-3 rounded-full border transition-all text-sm font-medium",
                                                formData.budget === b ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(41,171,226,0.3)]" : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/20"
                                            )}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-sm font-mono text-neutral-500 uppercase tracking-tighter text-center block italic opacity-50">Any specialized tech or integrations needed?</Label>
                                <Input 
                                    placeholder="e.g. Stripe, OpenAI, Custom Dashboard..." 
                                    value={formData.additionalInfo}
                                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                                    className="bg-white/5 border-white/10 focus:border-accent rounded-xl text-center"
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
            <Button 
                variant="ghost" 
                onClick={handleBack}
                disabled={currentStep === 0 || isSubmitting}
                className="text-neutral-500 hover:text-white"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest hidden sm:block">Step 0{currentStep + 1} / 03</span>
                {currentStep < STEPS.length - 1 ? (
                    <Button 
                        onClick={handleNext}
                        disabled={currentStep === 0 ? (!formData.projectName || !formData.outcome) : currentStep === 1 ? !formData.objective : false}
                        className="bg-white text-black hover:bg-neutral-200 px-8 py-6 rounded-2xl font-bold group"
                    >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                ) : (
                    <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-accent/90 text-white px-10 py-6 rounded-2xl font-bold shadow-[0_0_30px_rgba(41,171,226,0.3)] group"
                    >
                        {isSubmitting ? 'Initializing Mission...' : 'Commence Project'}
                        <Rocket className="w-4 h-4 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                )}
            </div>
        </footer>
      </div>
    </div>
  );
}
