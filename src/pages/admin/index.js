// import React, { useEffect, useState } from "react";
// import Login from "../login";
// import { auth } from "../_app";
// import { useRouter } from "next/router";

// const Admin = () => {
//   const router = useRouter();
//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         router.push("/admin/dashbord");
//       } else {
//       }
//     });
//   }, []);
//   return (
//     <div>
//       <Login />
//     </div>
//   );
// };

// export default Admin;
import React, { useEffect, useState } from "react";
import Login from "../login";
import { auth } from "../_app";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Met en place le listener Firebase pour surveiller l'état d'authentification
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        // Redirige vers le dashboard si connecté
        router.push("/admin/dashboard");
      }
    });

    // Nettoyage du listener à la destruction du composant
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    // Affiche un message ou un loader pendant la vérification de l'authentification
    return <p>Chargement...</p>;
  }

  // Si pas connecté, affiche la page de login
  if (!user) {
    return <Login />;
  }

  // Optionnel : on peut retourner null ici car la redirection est en cours
  return null;
};

export default Admin;
