import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
const Dashboard = () => {
  const [user, setUser] = useState();
  const { auth } = useAuth();
  console.log(auth);
  // const user = { role: "VENDOR", email: "ventas@gmail.com" };

  switch (auth.role) {
    case "ADMIN":
      return <div>admin</div>;

    case "VENDOR":
      return (
        <Layout>
          <h1>Vendedor</h1>
        </Layout>
      );

    case "COSTUMER":
      return <div>costumer</div>;

    default:
      return <div>no user set</div>;
  }
};

export default Dashboard;
