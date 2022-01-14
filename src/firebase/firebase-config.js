import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_L8cg3P4oomOvPriV_itZHpuTGWwq8pU",
    authDomain: "gestionts-app.firebaseapp.com",
    projectId: "gestionts-app",
    storageBucket: "gestionts-app.appspot.com",
    messagingSenderId: "349977555980",
    appId: "1:349977555980:web:2ac829ee5c1e9cf42d2a29"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const googleAuthProvider = new GoogleAuthProvider();
  export {
      db,
      googleAuthProvider
  }

