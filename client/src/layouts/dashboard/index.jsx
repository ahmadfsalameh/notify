import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Notify - Dashboard";
  }, []);
  return (
    <DashboardStructure
      content={<div className="content-container-main">Dashboard</div>}
    />
  );
};

export default Dashboard;
