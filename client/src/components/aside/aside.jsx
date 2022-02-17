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
              <p>{aside.dashboard}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/teams">
              <BiGroup />
              <p>{aside.teams}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/apps">
              <BsHddStack />
              <p>{aside.apps}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/issues">
              <BiBugAlt />
              <p>{aside.issues}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <BsListCheck />
              <p>{aside.tasks}</p>
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/settings">
              <BiCog />
              <p>{aside.settings}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/help">
              <BiHelpCircle />
              <p>{aside.help}</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className="copyright">{aside.credit}</p>
    </aside>
  );
};

export default Aside;
