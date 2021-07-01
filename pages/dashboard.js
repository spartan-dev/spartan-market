import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";

const Dashboard = () => {
  const user = { role: "VENDOR", email: "ventas@gmail.com" };

  switch (user.role) {
    case "ADMIN":
      return <div>admin</div>;

    case "VENDOR":
      return (
        <div>
          <h1>Vendedor</h1>
        </div>
      );

    case "COSTUMER":
      return <div>costumer</div>;

    default:
      return <div>no user set</div>;
  }
};

export default Dashboard;
