import { firebaseConfig } from './config';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const auth: Auth = getAuth(firebaseApp);
const firestore: Firestore = getFirestore(firebaseApp);

// react-firebase-hooks
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';


export { firebaseApp, auth, firestore, useCollection, useDocument };
export { 
    FirebaseProvider, 
    useFirebase,
    useFirebaseApp, 
    useAuth, 
    useFirestore 
} from './provider';
export { useUser } from './auth/use-user';
