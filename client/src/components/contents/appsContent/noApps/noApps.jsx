import React from "react";
import createAppSvg from "../../../../assets/vectors/create-app.svg";
import CreateAppForm from "../createAppForm/createAppForm";

import "./noApps.css";

const NoApps = ({ apps, setApps }) => {
  return (
    <div className="content-container-main">
      <div className="no-apps">
        <div className="no-apps-visual">
          <img src={createAppSvg} />
        </div>
        <div className="no-apps-content">
          <h6>You have no apps yet!</h6>
          <CreateAppForm apps={apps} setApps={setApps} />
        </div>
      </div>
    </div>
  );
};

export default NoApps;
