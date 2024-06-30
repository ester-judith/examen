import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAe3O8DSY1xtae1o80vxRu6einHEzNZPow",
    authDomain: "subastazz.firebaseapp.com",
    projectId: "subastazz",
    storageBucket: "subastazz.appspot.com",
    messagingSenderId: "1055646785644",
    appId: "1:1055646785644:web:65178436b9b2d4294bb849"
};

const app = initializeApp(firebaseConfig);

export const timestamp = serverTimestamp();
export const firestoreApp = getFirestore(app);
export const storageApp = getStorage(app);
export const authApp = getAuth(app);
export const firestore = getFirestore(app);
