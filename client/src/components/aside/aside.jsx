import React from "react";
import {
  BiHomeCircle,
  BiBugAlt,
  BiGroup,
  BiCog,
  BiHelpCircle,
} from "react-icons/bi";
import { BsHddStack, BsListCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../../assets/vectors/logo.svg";

import "./aside.css";

const Aside = () => {
  return (
    <aside>
      <div className="aside-logo">
        <div className="logo-container">
          <img src={logo} />
        </div>
        <p>
          Notify<span>Track your applications</span>
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <BiHomeCircle />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/teams">
              <BiGroup />
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink to="/apps">
              <BsHddStack />
              Apps
            </NavLink>
          </li>
          <li>
            <NavLink to="/issues">
              <BiBugAlt />
              Issues
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <BsListCheck />
              Tasks
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/settings">
              <BiCog />
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/help">
              <BiHelpCircle />
              Help
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className="copyright">Made by Ahmad Salameh</p>
    </aside>
  );
};

export default Aside;
