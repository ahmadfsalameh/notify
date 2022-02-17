import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiBell, BiLogOut } from "react-icons/bi";
import { UserContext } from "../../context/userContext";
import { PopupContext } from "../../context/popupContext";
import Button from "../common/button/button";
import auth from "../../services/authService";
import notificationsService from "../../services/notificationsService";
import timeInDay from "../../utils/timeInDay";
import Notifications from "./notifications/notifications";
import LoadingSpinner from "../common/loadingSpinner/loadingSpinner";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const setPopup = useContext(PopupContext);
  let { user, token, setToken } = useContext(UserContext);
  if (!user) user = {};

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setNotificationsLoading] = useState(true);

  const reminder = useRef();

  useEffect(() => {
    notificationsService.setToken(token);
    const getNotifications = async () => {
      const { data } = await notificationsService.getNotifications();
      setNotifications(data);
      setNotificationsLoading(false);
    };
    getNotifications();
  }, [token]);

  const logout = () => {
    auth.deleteToken();
    navigate("/");
    setToken(null);
  };

  const showNotifications = () => {
    setPopup([
      <Notifications token={token} notifications={notifications} />,
      "Notifications",
    ]);
    if (reminder.current) reminder.current.className = "";
  };

  const unreadNotifications = notifications.filter((n) => {
    if (n.readBy.includes(user._id)) return false;
    return true;
  });

  return (
    <header>
      <div className="header-user">
        <div className="user-avatar">
          {user.avatar && <img src={user.avatar} />}
        </div>
        <div className="user-hi">
          <p className="user-name">
            Hi, {user.name || <span>loading ...</span>}
          </p>
          <p>Good {timeInDay()}!</p>
        </div>
      </div>
      <div className="header-nav">
        <ul>
          <li>
            {unreadNotifications.length && !loadingNotifications ? (
              <span className="reminder" ref={reminder}></span>
            ) : null}
            <Button
              className={"btn-icon btn-action"}
              label={
                loadingNotifications ? (
                  <LoadingSpinner classes="loading-spinner-icon loading-spinner-sm" />
                ) : (
                  <BiBell />
                )
              }
              onClick={() => loadingNotifications || showNotifications()}
            />
          </li>
          <li>
            <Button
              className={"btn-icon btn-action btn-icon-mirror"}
              label={<BiLogOut />}
              onClick={logout}
            />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
