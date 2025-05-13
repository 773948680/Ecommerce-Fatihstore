import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

const firebaseConfig = {
  // apiKey: "AIzaSyB8SqymSLI8P5VvPZ91cisB51_Q2EH4Kyk",
  // authDomain: "eshop-54e55.firebaseapp.com",
  // projectId: "eshop-54e55",
  // storageBucket: "eshop-54e55.firebasestorage.app",
  // messagingSenderId: "506226449573",
  // appId: "1:506226449573:web:66ea516262e0061635814c"
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isAdminRoute = router.pathname.startsWith("/admin/dashboard");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
        if (isAdminRoute) {
          router.push("/admin/login");  // Assure-toi d'avoir une route pour la page de login
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdminRoute]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      {!isAdminRoute && <Navbar />}
      {isAdminRoute && <Sidebar />}
      <Component {...pageProps} />
      {!isAdminRoute && <Footer />}
    </Provider>
  );
}
