import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/userContext";
import Assignee from "./assignee/assignee";
import teamsService from "../../../../services/teamsService";
import LoadingSpinner from "../../../common/loadingSpinner/loadingSpinner";

import "./assignIssue.css";

const AssignIssue = ({ bugs, bug, setBugs, setPopup }) => {
  const { user, token } = useContext(UserContext);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    teamsService.setToken(token);
    setLoading(true);
    const getMembers = async () => {
      try {
        const { data } = await teamsService.getMembers(bug.app);
        setTeams(data);
      } catch (ex) {}
      setLoading(false);
    };
    getMembers();
  }, [token]);

  const props = {
    token: token,
    bugId: bug._id,
    bugs: bugs,
    setBugs: setBugs,
    setPopup: setPopup,
  };

  if (loading)
    return (
      <div className="assign-issue-loading">
        <LoadingSpinner classes="loading-spinner-icon" />
      </div>
    );

  return (
    <div className="assign-issue-members">
      <Assignee assignee={user} self={true} {...props} />
      {teams.map((team) =>
        team.members.map((member) => (
          <Assignee key={member._id} assignee={member} team={team} {...props} />
        ))
      )}
    </div>
  );
};

export default AssignIssue;
