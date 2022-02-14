import React, { useEffect, useState } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import AppsContent from "../../components/contents/appsContent/appsContent";

const Apps = () => {
  useEffect(() => {
    document.title = "Notify - Apps";
  }, []);
  return <DashboardStructure content={<AppsContent />} />;
};

export default Apps;
