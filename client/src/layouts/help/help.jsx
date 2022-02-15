import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";

const Help = () => {
  useEffect(() => {
    document.title = "Notify - Help";
  }, []);
  return <DashboardStructure content="Help" />;
};

export default Help;
