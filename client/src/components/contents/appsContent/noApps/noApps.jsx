import React from "react";
import createAppSvg from "../../../../assets/vectors/create-app.svg";
import CreateAppForm from "../createAppForm/createAppForm";
import text from "../../../../constants/text.json";
import "./noApps.css";

const NoApps = ({ apps, setApps }) => {
  return (
    <div className="content-container-main">
      <div className="no-apps">
        <div className="no-apps-visual">
          <img src={createAppSvg} />
        </div>
        <div className="no-apps-content">
          <h6>{text.apps.noApps.label}</h6>
          <CreateAppForm apps={apps} setApps={setApps} />
        </div>
      </div>
    </div>
  );
};

export default NoApps;
