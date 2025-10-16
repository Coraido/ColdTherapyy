import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase project configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBdblbwcJgR-xud7QdQQPnO5wLlG3Qm5no",
  authDomain: "cold-therapy.firebaseapp.com",
  projectId: "cold-therapy",
  storageBucket: "cold-therapy.firebasestorage.app",
  messagingSenderId: "239836453075",
  appId: "1:239836453075:web:1242c0a25f5ba034cedc26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
