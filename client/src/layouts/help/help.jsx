import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import HelpContent from "../../components/contents/helpContent/helpContent";

const Help = () => {
  useEffect(() => {
    document.title = "Notify - Help";
  }, []);
  return <DashboardStructure content={<HelpContent />} />;
};

export default Help;
