import React from "react";

import "./group.css";

const Group = ({ label, prefix, actions, content }) => {
  return (
    <div className="group">
      <div className="group-header">
        <label>
          {prefix && <span>{prefix}</span>}
          {label}
        </label>
        <div className="group-actions">{actions}</div>
      </div>
      <div className="group-content">{content}</div>
    </div>
  );
};

export default Group;
