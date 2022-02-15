import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { PopupContext } from "../../../context/popupContext";
import Button from "../../common/button/button";
import text from "../../../constants/text.json";

import "./settingsContent.css";
import ChangeNameForm from "./changeNameForm/changeNameForm";

const SettingsContent = () => {
  const { user, token, setUser } = useContext(UserContext);
  const setPopup = useContext(PopupContext);

  const { settings } = text;

  if (!user) return null;

  return (
    <section className="settings">
      <div className="settings-container">
        <ul>
          <li>
            <p>
              <span>{settings.name}</span>
              {user.name}
            </p>
            <Button
              label={settings.change}
              className="btn-action"
              onClick={() =>
                setPopup([
                  <ChangeNameForm
                    token={token}
                    user={user}
                    setUser={setUser}
                    setPopup={setPopup}
                  />,
                  settings.changeName.label,
                ])
              }
            />
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
