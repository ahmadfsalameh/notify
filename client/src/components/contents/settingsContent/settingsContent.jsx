import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import Button from "../../common/button/button";
import text from "../../../constants/text.json";

import "./settingsContent.css";

const SettingsContent = () => {
  const { user } = useContext(UserContext);
  const { settings } = text;
  return (
    <section className="settings">
      <div className="settings-container">
        <ul>
          <li>
            <p>
              <span>{settings.name}</span>
              {user.name}
            </p>
            <Button label={settings.change} className="btn-action" />
          </li>
          <li>
            <p>
              <span>{settings.password}</span>
              ••••••••
            </p>
            <Button label={settings.change} className="btn-action" />
          </li>
          <li>
            <p>
              <span>{settings.account}</span>
              {settings.danger}
            </p>
            <Button label={settings.delete} className="btn-action btn-danger" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SettingsContent;
