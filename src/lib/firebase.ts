import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Config pública do app Web (identificadores, não seguranha — os dados são
// protegidos pelas regras do Firestore). Fallback para o CI/build que não
// tem acesso a .env.local; env local sobrepõe se definido.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDqAh0lGnXb1wFTmmEusN8F_LCExfkMEe0',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'ocodigobrasil-site.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'ocodigobrasil-site',
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);

declare global {
  interface Window {
    __ocbFirestoreEmulator?: boolean;
  }
}

if (
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  !window.__ocbFirestoreEmulator
) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  window.__ocbFirestoreEmulator = true;
}
