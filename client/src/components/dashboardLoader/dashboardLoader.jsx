import React from "react";
import LoadingSpinner from "../common/loadingSpinner/loadingSpinner";

const DashboardLoader = () => {
  return (
    <div className="content-container-main">
      <LoadingSpinner classes="loading-spinner-dashboard" />
    </div>
  );
};

export default DashboardLoader;
