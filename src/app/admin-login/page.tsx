
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth, useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "../actions/send-notification-email";
import { doc, setDoc } from "firebase/firestore";

const ADMIN_EMAIL = "deeepakbagada25@gmail.com";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSuccessfulLogin = async (user: any) => {
    // Ensure the admin role document exists
    const adminRoleRef = doc(firestore, "roles_admin", user.uid);
    await setDoc(adminRoleRef, { isAdmin: true }, { merge: true });

    // Send notification email
    const subject = "Admin Login on SaaSNext";
    const htmlBody = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Admin Login</h2>
        <p>An administrator has logged into the SaaSNext platform.</p>
        <hr>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      </div>
    `;
    await sendNotificationEmail(subject, htmlBody);

    toast({
      title: "Login Successful",
      description: "Redirecting to dashboard...",
    });
    router.push("/admin/dashboard");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (email.toLowerCase() !== ADMIN_EMAIL) {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleSuccessfulLogin(userCredential.user);
    } catch (error: any) {
      // If user not found, try to create it.
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
          toast({
            title: "Admin Account Created",
            description: "Your admin account has been set up. Logging you in...",
          });
          await handleSuccessfulLogin(newUserCredential.user);
        } catch (createError: any) {
            let errorMessage = "An unknown error occurred during signup.";
            if (createError.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. It must be at least 6 characters long.";
            } else {
                errorMessage = createError.message;
            }
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Admin Creation Failed",
                description: errorMessage,
            });
        }
      } else {
        let errorMessage = "An unknown error occurred.";
        switch (error.code) {
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
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
