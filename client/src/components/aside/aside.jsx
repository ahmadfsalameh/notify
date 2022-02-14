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
import logoSvg from "../../assets/vectors/logo.svg";
import text from "../../constants/text.json";

import "./aside.css";

const Aside = () => {
  const { logo, aside } = text;
  return (
    <aside>
      <div className="aside-logo">
        <div className="logo-container">
          <img src={logoSvg} />
        </div>
        <p>
          {logo.name}
          <span>{logo.description}</span>
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <BiHomeCircle />
              {aside.dashboard}
            </NavLink>
          </li>
          <li>
            <NavLink to="/teams">
              <BiGroup />
              {aside.teams}
            </NavLink>
          </li>
          <li>
            <NavLink to="/apps">
              <BsHddStack />
              {aside.apps}
            </NavLink>
          </li>
          <li>
            <NavLink to="/issues">
              <BiBugAlt />
              {aside.issues}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <BsListCheck />
              {aside.tasks}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/settings">
              <BiCog />
              {aside.settings}
            </NavLink>
          </li>
          <li>
            <NavLink to="/help">
              <BiHelpCircle />
              {aside.help}
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className="copyright">{aside.credit}</p>
    </aside>
  );
};

export default Aside;
