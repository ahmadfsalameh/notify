import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/button/button";
import dateFromObjectId from "../../../../utils/dateFromObjectId.js";
import TimeAgo from "timeago-react";

import "./notification.css";

const Notification = ({ icon, message, path, id }) => {
  const navigate = useNavigate();
  return (
    <div className="notification">
      <div className="notification-icon">{icon}</div>
      <p>
        <span>{message}</span>
        <span>{<TimeAgo datetime={dateFromObjectId(id)} />}</span>
      </p>
      <Button
        label="View"
        className="btn-action"
        onClick={() => navigate(path)}
      />
    </div>
  );
};

export default Notification;
