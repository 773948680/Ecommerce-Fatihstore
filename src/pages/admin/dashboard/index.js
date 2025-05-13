import DashboardStats from "@/components/admin/DashboardStats";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/pages/_app";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);  // Ajout de l'état de chargement

  // Définir des couleurs pour chaque carte statistique
  const statCards = [
    { name: "Product", amount: productsCount, color: "bg-blue-500" },
    { name: "Category", amount: categoryCount, color: "bg-green-500" },
    { name: "Users", amount: 116, color: "bg-yellow-500" },
    { name: "Order", amount: ordersCount, color: "bg-red-500" },
  ];

  useEffect(() => {
    // Fonction pour récupérer les comptes
    async function fetchOrdersCount() {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const count = ordersSnapshot.size;
        setOrdersCount(count);
      } catch (error) {
        console.error("Error getting orders:", error.message);
      }
    }

    async function fetchProductsCount() {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        let categoryCount = 0;
        let uniqueCategories = new Set();

        productsSnapshot.forEach((doc) => {
          const category = doc.data().category;
          if (!uniqueCategories.has(category)) {
            uniqueCategories.add(category);
            categoryCount++;
          }
        });
        const count = productsSnapshot.size;
        setCategoryCount(categoryCount);
        setProductsCount(count);
      } catch (error) {
        console.error("Error getting products:", error.message);
      }
    }

    // Lancer les fetches et arrêter le chargement
    async function fetchData() {
      await Promise.all([fetchProductsCount(), fetchOrdersCount()]);
      setLoading(false);  // Désactivation de l'état de chargement après les appels API
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center text-3xl my-20">
        Welcome to the Admin Dashboard!
      </div>
      {/* Utilisation d'un container pour la mise en page */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (  // Affichage de "Loading..." tant que les données ne sont pas récupérées
          <div className="text-center">Loading...</div>
        ) : (
          statCards.map((stat) => (
            <DashboardStats
              key={stat.name}
              name={stat.name}
              amount={stat.amount}
              color={stat.color} // Passage de la couleur à DashboardStats
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
