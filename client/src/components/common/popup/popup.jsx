import React from "react";
import Button from "../button/button";
import { IoClose } from "react-icons/io5";

import "./popup.css";

const Popup = ({ popup, label, setPopup }) => {
  return (
    <div className="popup">
      <div className="popup-overlay" onClick={() => setPopup(null)}></div>
      <div className="popup-container">
        <div className="popup-header">
          <p>{label}</p>
          <Button
            className="btn-action btn-icon"
            label={<IoClose />}
            onClick={() => setPopup(null)}
          />
        </div>
        <div className="popup-content">{popup}</div>
      </div>
    </div>
  );
};

export default Popup;
