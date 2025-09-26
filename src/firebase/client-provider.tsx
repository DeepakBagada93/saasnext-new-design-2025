
'use client';

import { useMemo } from 'react';
import { FirebaseProvider, initializeFirebase } from '@/firebase';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const firebase = useMemo(() => {
    return initializeFirebase();
  }, []);

  // On the first render, firebase might be null on the server.
  // We can render a loading state or null until it's initialized on the client.
  if (!firebase.app) {
    return null; // Or a loading spinner
  }

  return <FirebaseProvider value={firebase as any}>{children}</FirebaseProvider>;
}
