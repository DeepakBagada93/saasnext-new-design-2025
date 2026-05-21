
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "@/supabase/provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "../actions/send-notification-email";
import { isEmailAdmin } from "@/lib/constants";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  const handleSuccessfulLogin = async (user: any) => {
    // 1. Ensure the user exists in client_profiles and has the admin role.
    // This is the primary table used for RLS policies.
    try {
        const { error: profileError } = await supabase
          .from('client_profiles')
          .upsert({ 
            id: user.id, 
            role: 'admin',
            full_name: user.user_metadata?.full_name || 'Admin User',
            email: user.email // Ensure email is also synced if possible
          }, { onConflict: 'id' });

        if (profileError) {
            console.error("Error updating client_profiles:", profileError);
        }

        // 2. Attempt to sync with roles_admin (auxiliary table).
        // We do this after client_profiles and ignore failures to ensure the login proceeds.
        const { error: roleError } = await supabase
          .from('roles_admin')
          .upsert({ 
            admin_id: user.id, 
            email: user.email, 
            role: 'admin' 
          }, { onConflict: 'admin_id' });

        if (roleError) {
            // Log but don't block the login
            console.warn("Roles_admin sync skipped or failed:", roleError.message);
        }
    } catch (err) {
        console.error("Critical error during role synchronization:", err);
    }

    // Send notification email
    const subject = "Admin Login on SaaSNext";
    const htmlBody = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Admin Login</h2>
        <p>An administrator has logged into the SaaSNext platform.</p>
        <hr>
        <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
        <p><strong>ID:</strong> ${user.id}</p>
      </div>
    `;
    await sendNotificationEmail(subject, htmlBody);

    toast({
      title: "Login Successful",
      description: "Welcome to the Admin Command Center.",
    });
    
    // Hard redirect to ensure clean state and session pickup
    window.location.href = "/admin/analytics";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!isEmailAdmin(email)) {
        const authError = "You are not authorized to access the admin portal.";
        setError(authError);
        toast({
            variant: "destructive",
            title: "Authorization Error",
            description: authError,
        });
        return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // If user not found/invalid credentials, try to create it (first time setup).
        // Supabase error messages vary, but usually 'Invalid login credentials' means we can try signup
        if (signInError.message.includes('Invalid login credentials')) {
           const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
               email,
               password
           });

           if (signUpError) {
               throw signUpError;
           }
           
           toast({
            title: "Admin Account Created",
            description: "Your admin account has been set up. Logging you in...",
          });
          if (signUpData.user) {
             await handleSuccessfulLogin(signUpData.user);
          }
        } else {
             throw signInError;
        }
      } else if (data.user) {
        await handleSuccessfulLogin(data.user);
      }
    } catch (error: any) {
        console.error("Full Login Error Object:", error);
        let errorMessage = error.message || "An unknown error occurred.";
        
        // Provide cleaner messages for common errors
        if (errorMessage.toLowerCase().includes("invalid login credentials")) {
            errorMessage = "Invalid email or password. Please check your credentials.";
        }
        
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <Logo className="mx-auto mb-4" />
        <CardTitle className="font-headline text-2xl">Admin Portal Login</CardTitle>
        <CardDescription>Restricted Access</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
