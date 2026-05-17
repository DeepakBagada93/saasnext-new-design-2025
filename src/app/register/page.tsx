'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "@/supabase/provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "../actions/send-notification-email";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, UserPlus, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (signUpError) throw signUpError;
      const user = data.user;

      if (!user) {
        throw new Error("Initialization sequence failed: Connection lost.");
      }

      // 2. Create profile with retry logic/upsert
      // The DB trigger handle_new_user should also handle this, but we upsert for safety.
      const { error: profileError } = await supabase
        .from('client_profiles')
        .upsert({
          id: user.id,
          full_name: name,
          company_name: companyName,
          has_completed_onboarding: false,
        }, { onConflict: 'id' });
      
      if (profileError) {
          console.error("Profile Sync Error:", profileError);
      }

      // 3. Email Notification (Async)
      sendNotificationEmail(
        "New Strategic Partner Registration", 
        `Entity: ${companyName}\nPartner: ${name}\nID: ${email}`
      ).catch(err => console.error("Notification Error:", err));
      
      toast({
        title: "Access Granted",
        description: "Welcome to the SaaSNext ecosystem. Initializing onboarding...",
      });
      
      router.push("/client/onboarding");
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: error.message || "Protocol failure. Please verify credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-white/5 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <ShieldCheck className="w-12 h-12 text-accent" />
          </div>

          <div className="text-center space-y-4 mb-10">
            <Logo className="mx-auto scale-110 mb-6" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-accent uppercase">
                <UserPlus className="w-3 h-3" />
                Partner Enrollment
            </div>
            <h1 className="text-3xl font-headline font-bold text-white tracking-tight">Create Identity</h1>
            <p className="text-neutral-500 text-sm">Join the next generation of digital excellence.</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase text-neutral-500 ml-1">Full Name</Label>
              <Input 
                placeholder="John Doe" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/20 border-white/5 focus:border-accent h-14 rounded-2xl px-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase text-neutral-500 ml-1">Company / Entity</Label>
              <Input 
                placeholder="Future Corp" 
                required 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-black/20 border-white/5 focus:border-accent h-14 rounded-2xl px-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase text-neutral-500 ml-1">Secure Email</Label>
              <Input 
                type="email" 
                placeholder="partner@saasnext.in" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/20 border-white/5 focus:border-accent h-14 rounded-2xl px-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase text-neutral-500 ml-1">Access Key (Password)</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/20 border-white/5 focus:border-accent h-14 rounded-2xl px-6"
              />
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-16 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] group transition-all"
              >
                {isLoading ? "Synchronizing..." : "Create Account"}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500">
              Already a partner?{" "}
              <Link href="/login" className="font-bold text-white hover:text-accent transition-colors underline-offset-4 underline">
                Login
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
