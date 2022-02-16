import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import DashboardContent from "../../components/contents/dashboardContent/dashboardContent";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Notify - Dashboard";
  }, []);
  return <DashboardStructure content={<DashboardContent />} />;
};

export default Dashboard;
