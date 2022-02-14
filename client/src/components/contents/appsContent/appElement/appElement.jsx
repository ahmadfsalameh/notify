import React, { useState } from "react";
import Button from "../../../common/button/button";
import dateFromObjectId from "../../../../utils/dateFromObjectId";
import TimeAgo from "timeago-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Group from "../../../common/group/group";
import InfoGroup from "../../../common/infoGroup/infoGroup";
import appsService from "../../../../services/appsService";
import text from "../../../../constants/text.json";

import "./appElement.css";

const AppElement = ({ app, apps, setApps }) => {
  const [loading, setLoading] = useState(false);

  const { _id: appId, name, apiKey, team, bugs } = app;
  const closedBugs = bugs.filter((bug) => bug.status == "closed").length;

  const deleteApp = async () => {
    setLoading(true);
    try {
      await appsService.deleteApp(appId);
      setLoading(false);
      setApps(apps.filter((a) => a._id != appId));
    } catch (ex) {
      setLoading(false);
    }
  };

  const { apps: appsText } = text;

  return (
    <Group
      label={name}
      prefix="App"
      actions={
        <>
          <Button
            label={<RiDeleteBin5Line />}
            className="btn-action btn-icon"
            LoadingSpinnerClass="loading-spinner-icon"
            onClick={deleteApp}
            loading={loading}
          />
        </>
      }
      content={
        <>
          <div className="row">
            <InfoGroup label={appsText.stats.issues} content={bugs.length} />
            <InfoGroup
              label={appsText.stats.solved}
              content={bugs.length ? closedBugs || 0 : 0}
            />
            <InfoGroup
              label={appsText.stats.lastreport}
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
            label={appsText.team}
            waves={true}
            content={appsText.noTeam}
          />
          <InfoGroup label={appsText.apikey} waves={true} content={apiKey} />
        </>
      }
    />
  );
};

export default AppElement;
