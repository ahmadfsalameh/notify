import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import TeamsContent from "../../components/contents/teamsContent/teamsContent";

const Teams = () => {
  useEffect(() => {
    document.title = "Notify - Teams";
  }, []);
  return <DashboardStructure content={<TeamsContent />} />;
};

export default Teams;
