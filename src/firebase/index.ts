
'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

// react-firebase-hooks
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

function initializeFirebase() {
    if (typeof window !== 'undefined') {
        if (!app) {
            const apps = getApps();
            if (!apps.length) {
                app = initializeApp(firebaseConfig);
            } else {
                app = getApp();
            }
            auth = getAuth(app);
            firestore = getFirestore(app);
        }
    }
    // On the server, we return null instances.
    return { app, auth, firestore };
}

export { useCollection, useDocument };
export { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
export { initializeFirebase };
