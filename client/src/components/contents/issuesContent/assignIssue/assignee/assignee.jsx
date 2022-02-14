import React, { useContext, useState } from "react";
import Button from "../../../../common/button/button";
import bugsService from "../../../../../services/bugsService";
import text from "../../../../../constants/text.json";

import "./assignee.css";

const Assignee = ({
  assignee,
  self,
  team,
  token,
  bugId,
  bugs,
  setBugs,
  setPopup,
}) => {
  const [loading, setLoading] = useState(false);

  const assigne = async () => {
    bugsService.setToken(token);
    setLoading(true);
    try {
      await bugsService.assignBug(bugId, assignee._id);

      const bugsClone = [...bugs];
      const targetBug = bugsClone.find((bug) => bug._id === bugId);

      targetBug.assignee = assignee;
      targetBug.status = "open";

      setBugs(bugsClone);
      setPopup(null);
    } catch (ex) {
      setLoading(false);
    }
  };

  const { assign } = text.issues;

  return (
    <div className="assignee">
      <div className="avatar">
        <img src={assignee.avatar} />
      </div>
      <div className="assignee-info">
        <p>{assignee.name}</p>
        {self ? <span>{assign.me}</span> : <span>{team.name}</span>}
      </div>
      <Button
        label={assign.action}
        className="btn-action"
        LoadingSpinnerClass="loading-spinner-icon"
        loading={loading}
        onClick={assigne}
      />
    </div>
  );
};

export default Assignee;
