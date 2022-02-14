import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/userContext";
import Assignee from "./assignee/assignee";
import teamsService from "../../../../services/teamsService";

import "./assignIssue.css";

const AssignIssue = ({ bugs, bug, setBugs, setPopup }) => {
  const { user, token } = useContext(UserContext);

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    teamsService.setToken(token);
    const getTeams = async () => {
      try {
        const { data } = await teamsService.getTeams();
        setTeams(data);
      } catch (ex) {}
    };
    getTeams();
  }, [token]);

  const props = {
    token: token,
    bugId: bug._id,
    bugs: bugs,
    setBugs: setBugs,
    setPopup: setPopup,
  };

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
