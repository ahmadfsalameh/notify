import React from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import SettingsContent from "../../components/contents/settingsContent/settingsContent";

const Settings = () => {
  return <DashboardStructure content={<SettingsContent />} />;
};

export default Settings;
