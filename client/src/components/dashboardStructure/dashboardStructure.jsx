import React, { useState } from "react";
import { PopupContext } from "../../context/popupContext";
import Popup from "../common/popup/popup";
import Header from "../../components/header/header";
import Aside from "../../components/aside/aside";

import "./dashboardStructure.css";
import "../contents/contents-core.css";

const DashboardStructure = ({ content }) => {
  const [popup, setPopup] = useState(null);
  return (
    <>
      <article className="dashboard">
        <Aside />
        <main>
          <PopupContext.Provider value={setPopup}>
            <Header />
            <div className="content">{content}</div>
          </PopupContext.Provider>
        </main>
      </article>
      {popup && <Popup popup={popup[0]} label={popup[1]} setPopup={setPopup} />}
    </>
  );
};

export default DashboardStructure;
