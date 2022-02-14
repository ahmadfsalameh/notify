import React from "react";

import "./member.css";

const Member = ({ member, leader }) => {
  return (
    <div className="member">
      <div className="member-avatar">
        <img src={member.avatar} />
      </div>
      <p className="member-name">{member.name}</p>
      {leader && (
        <div className="member-tag">
          <span>Leader</span>
        </div>
      )}
    </div>
  );
};

export default Member;
