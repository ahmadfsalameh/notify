import React from "react";
import Button from "../../../common/button/button";
import dateFromObjectId from "../../../../utils/dateFromObjectId";
import TimeAgo from "timeago-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Group from "../../../common/group/group";
import InfoGroup from "../../../common/infoGroup/infoGroup";

import "./appElement.css";

const AppElement = ({ app, loading, onDelete }) => {
  const { _id: appId, name, apiKey, team, bugs } = app;
  const closedBugs = bugs.filter((bug) => bug.status == "closed").length;
  return (
    <Group
      label={name}
      prefix="App"
      actions={
        <>
          {team ? null : (
            <Button
              label="Assign to team"
              className="btn-action"
              LoadingSpinnerClass="loading-spinner-icon"
            />
          )}
          <Button
            label={<RiDeleteBin5Line />}
            className="btn-action btn-icon"
            LoadingSpinnerClass="loading-spinner-icon"
            onClick={() => onDelete(appId)}
            loading={loading}
          />
        </>
      }
      content={
        <>
          <div className="row">
            <InfoGroup label="Issues" content={bugs.length} />
            <InfoGroup
              label="Solved Issues"
              content={bugs.length ? closedBugs || 0 : 0}
            />
            <InfoGroup
              label="Last Report"
              waves={true}
              content={
                bugs.length ? (
                  <TimeAgo
                    datetime={dateFromObjectId(bugs[bugs.length - 1]._id)}
                  />
                ) : (
                  "No reports yet"
                )
              }
            />
          </div>
          <InfoGroup
            label="Responsible Team"
            waves={true}
            content={"You haven't assigned this app to a team yet!"}
          />
          <InfoGroup label="Api Key" waves={true} content={apiKey} />
        </>
      }
    />
  );
};

export default AppElement;
