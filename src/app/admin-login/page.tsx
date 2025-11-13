'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "deeeepakbagada25@gmail.com";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await auth.signOut(); // Sign out the non-admin user
        const authError = "You are not authorized to access the admin portal.";
        setError(authError);
        toast({
            variant: "destructive",
            title: "Authorization Error",
            description: authError,
        });
        return;
      }

      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      router.push("/admin/dashboard");

    } catch (error: any) {
      let errorMessage = "An unknown error occurred.";
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
        default:
          errorMessage = error.message;
          break;
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
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
