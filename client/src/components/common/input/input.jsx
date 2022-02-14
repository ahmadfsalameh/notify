import React, { useRef } from "react";
import activateFormLabel from "../../../utils/activateFormLabel";

import "./input.css";

const Input = ({
  value,
  onChange,
  name,
  label,
  icon = null,
  type = "text",
  error,
}) => {
  const labelRef = useRef();

  const getClasses = () => {
    let classes = "";

    if (value) classes += "input-active";
    if (error) classes += " input-error";
    return classes;
  };
  const classes = getClasses();

  return (
    <div className="input-container">
      <div className="input-box">
        <input
          type={type}
          value={value}
          spellCheck="false"
          autoComplete="off"
          name={name}
          id={name}
          onChange={onChange}
          onFocus={(e) => activateFormLabel(e, labelRef, value)}
          onBlur={(e) => activateFormLabel(e, labelRef, value)}
          className={classes}
        />
        <label htmlFor={name} ref={labelRef}>
          {label}
        </label>
        {icon && <span className="input-icon">{icon}</span>}
      </div>
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
};

export default Input;
