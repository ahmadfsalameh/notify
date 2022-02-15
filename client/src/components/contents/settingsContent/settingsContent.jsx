import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { PopupContext } from "../../../context/popupContext";
import Button from "../../common/button/button";
import text from "../../../constants/text.json";
import ChangeNameForm from "./changeNameForm/changeNameForm";
import userService from "../../../services/userService";
import auth from "../../../services/authService";

import "./settingsContent.css";

const SettingsContent = () => {
  const { user, token, setToken, setUser } = useContext(UserContext);
  const setPopup = useContext(PopupContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { settings } = text;

  if (!user) return null;

  const deleteUser = async () => {
    setLoading(true);
    userService.setToken(token);
    try {
      await userService.deleteUser();
      auth.deleteToken();
      setToken(null);
      navigate("/");
    } catch (ex) {}
    setLoading(false);
  };

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
            <Button
              label={settings.delete}
              className="btn-action btn-danger"
              loading={loading}
              onClick={deleteUser}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SettingsContent;
