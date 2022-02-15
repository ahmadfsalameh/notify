import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import SettingsContent from "../../components/contents/settingsContent/settingsContent";

const Settings = () => {
  useEffect(() => {
    document.title = "Notify - Settings";
  }, []);
  return <DashboardStructure content={<SettingsContent />} />;
};

export default Settings;
