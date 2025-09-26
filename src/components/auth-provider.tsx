
'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from './auth-guard';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // While loading user or not yet mounted on client, render a simple loading screen.
    // This MUST be the same on server and initial client render to prevent hydration mismatch.
    if (!isMounted) {
        return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }

    return <AuthGuard>{children}</AuthGuard>;
}
