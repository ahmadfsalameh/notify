import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import IssuesContent from "../../components/contents/issuesContent/issuesContent";

const Issues = () => {
  useEffect(() => {
    document.title = "Notify - Issues";
  }, []);
  return <DashboardStructure content={<IssuesContent />} />;
};

export default Issues;
