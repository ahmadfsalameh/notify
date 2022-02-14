import React from "react";
import wavesSvg from "../../../assets/vectors/waves.svg";

import "./infoGroup.css";

const InfoGroup = ({ label, content, waves = false }) => {
  return (
    <div className={waves ? "info-group info-group-waves" : "info-group"}>
      {waves && (
        <div className="waves">
          <img src={wavesSvg} />
        </div>
      )}
      <label>{label}</label>
      <div className="info-group-content">{content}</div>
    </div>
  );
};

export default InfoGroup;
