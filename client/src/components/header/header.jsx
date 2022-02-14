import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiBell, BiLogOut } from "react-icons/bi";
import { UserContext } from "../../context/userContext";
import Button from "../common/button/button";
import auth from "../../services/authService";
import timeInDay from "../../utils/timeInDay";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  let { user, setToken } = useContext(UserContext);
  if (!user) user = {};

  const logout = () => {
    auth.deleteToken();
    navigate("/");
    setToken(null);
  };
  return (
    <header>
      <div className="header-user">
        <div className="user-avatar">
          <img src={user.avatar} />
        </div>
        <div className="user-hi">
          <p>Hi, {user.name}</p>
          <p>Good {timeInDay()}!</p>
        </div>
      </div>
      <div className="header-nav">
        <ul>
          <li>
            <span className="reminder"></span>
            <Button className={"btn-icon btn-action"} label={<BiBell />} />
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
