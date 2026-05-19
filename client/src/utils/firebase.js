
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-dc88e.firebaseapp.com",
  projectId: "interviewiq-dc88e",
  storageBucket: "interviewiq-dc88e.firebasestorage.app",
  messagingSenderId: "485447161812",
  appId: "1:485447161812:web:adc055ba424c8b7c926841"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };