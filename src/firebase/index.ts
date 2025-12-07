'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Important! When deployed to Firebase App Hosting, the SDK is automatically
    // initialized with the correct project configuration.
    // In other environments, we fall back to the firebaseConfig object.
    let firebaseApp;
    // The `VITE_FIREBASE_APP_HOSTING_CONFIG` is a special environment variable
    // set by Firebase App Hosting.
    if (process.env.VITE_FIREBASE_APP_HOSTING_CONFIG) {
        try {
            firebaseApp = initializeApp();
        } catch(e) {
            console.error("initializeApp failed", e);
            firebaseApp = initializeApp(firebaseConfig);
        }
    } else {
        firebaseApp = initializeApp(firebaseConfig);
    }
    
    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
