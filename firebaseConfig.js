// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqYqF3LcfURfRTd0v2qRREecTn3Lu5AFQ",
  authDomain: "pulse-app-7c7d1.firebaseapp.com",
  projectId: "pulse-app-7c7d1",
  storageBucket: "pulse-app-7c7d1.firebasestorage.app",
  messagingSenderId: "481049714036",
  appId: "1:481049714036:web:f5e250763e8fe9ac912021",
  measurementId: "G-B7JP6361Y2"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Initialise Firestore (notre base de données) et on l'exporte
const db = getFirestore(app);

export { db }; // On exporte uniquement la base de données pour l'instant
