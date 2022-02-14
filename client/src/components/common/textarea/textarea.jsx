import React from "react";

import "./textarea.css";

const Textarea = ({ value, onChange, name, error, placeholder, label }) => {
  const getClasses = () => {
    let classes = "";

    if (error) classes += " textarea-error";
    return classes;
  };
  const classes = getClasses();

  return (
    <div className="textarea-container">
      <div className="textarea-box">
        <textarea
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          className={classes}
          placeholder={placeholder}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <p className="textarea-error-msg">{error}</p>}
    </div>
  );
};

export default Textarea;
