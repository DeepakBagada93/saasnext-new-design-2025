
'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth, useFirestore } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "../actions/send-notification-email";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!firestore) {
      setError("Firestore is not initialized.");
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Database connection failed. Please try again later.",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile in Firebase Auth
      await updateProfile(user, { displayName: name });
      
      // Create a client document in Firestore
      const clientRef = doc(firestore, "client_profiles", user.uid);
      await setDoc(clientRef, {
          name: name,
          email: user.email,
          contact: name, // Default contact to name
          createdAt: serverTimestamp(),
          id: user.uid, // Explicitly store the user's UID
          clientId: user.uid,
      });

      // Send notification email
      const subject = "New Client Registration on SaaSNext";
      const htmlBody = `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Client Registration</h2>
          <p>A new user has created an account on the SaaSNext platform.</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        </div>
      `;
      await sendNotificationEmail(subject, htmlBody, email);
      
      toast({
        title: "Account Created",
        description: "Redirecting to your dashboard...",
      });
      router.push("/client/dashboard");
      
    } catch (error: any) {
      let errorMessage = "An unknown error occurred.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already in use.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password must be at least 6 characters long.';
          break;
        default:
          errorMessage = error.message;
          break;
      }
      setError(errorMessage);
       toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <Logo className="mx-auto mb-4" />
        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
        <CardDescription>Join SaaSNext to manage your projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
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
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground w-full text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
