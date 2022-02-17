import React, { useEffect } from "react";
import Notification from "./notification/notification";
import { BiBug, BiGroup } from "react-icons/bi";
import notificationsService from "../../../services/notificationsService";

import "./notifications.css";

const Notifications = ({ token, notifications }) => {
  useEffect(() => {
    notificationsService.setToken(token);
    notificationsService.markRead();
  }, []);

  if (!notifications.length)
    return (
      <div className="notifications-container-nn">
        <p>You have no notifications</p>
      </div>
    );
  return (
    <div className="notifications-container">
      {notifications.map((n) => {
        const { _id, type, sender } = n;

        switch (type) {
          case "new_assigned_task":
            return (
              <Notification
                key={_id}
                message={sender.user.name + " has assigned a new task for you."}
                icon={<img src={sender.user.avatar} />}
                id={_id}
                path="/tasks"
              />
            );
            break;
          case "new_bug":
            return (
              <Notification
                key={_id}
                message={
                  "Your app " + sender.app.name + " has received a new bug."
                }
                icon={<BiBug />}
                id={_id}
                path="/apps"
              />
            );
            break;
          case "new_team_member":
            return (
              <Notification
                key={_id}
                message={
                  "A new member has joined " + sender.team.name + " team."
                }
                icon={<BiGroup />}
                id={_id}
                path="/teams"
              />
            );
        }
      })}
    </div>
  );
};

export default Notifications;
