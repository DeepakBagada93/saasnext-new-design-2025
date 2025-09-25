'use client';

import Link from "next/link";
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

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

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

    if (email !== ADMIN_EMAIL) {
      setError("You are not authorized to access the admin portal.");
      toast({
        variant: "destructive",
        title: "Authorization Error",
        description: "You are not authorized to access the admin portal.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      setError(error.message);
       toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
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
              placeholder="deepakbagada25@gmail.com" 
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
