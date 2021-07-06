import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  VendorDashboard,
  AdminDashboard,
  CostumerDashboard,
} from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
const Dashboard = ({ children }) => {
  const [user, setUser] = useState();
  const { auth } = useAuth();

  switch (auth.role) {
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
