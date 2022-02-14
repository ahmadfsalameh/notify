import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/userContext";
import Assignee from "./assignee/assignee";
import teamsService from "../../../../services/teamsService";

import "./assignIssue.css";

const AssignIssue = ({ bugs, bugId, setBugs, setPopup }) => {
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
    bugId: bugId,
    bugs: bugs,
    setBugs: setBugs,
    setPopup: setPopup,
  };

  return (
    <ul className="assign-issue-members">
      <Assignee assignee={user} self={true} {...props} />
      {teams.map((team) =>
        team.members.map((member) => (
          <li key={member._id}>
            <Assignee assignee={member} team={team} {...props} />
          </li>
        ))
      )}
    </ul>
  );
};

export default AssignIssue;
