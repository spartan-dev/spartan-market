import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import {
  VendorDashboard,
  AdminDashboard,
  CostumerDashboard,
} from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
const Dashboard = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth === undefined || auth === null) {
      router.replace("/");
    }
  }, [auth, router]);
  switch (auth?.role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "VENDOR":
      return <VendorDashboard />;

    case "COSTUMER":
      return <CostumerDashboard />;

    default:
      return <div>Redirect to no where</div>;
  }
};

export default Dashboard;
