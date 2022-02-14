import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { PopupContext } from "../../../context/popupContext";
import appsService from "../../../services/appsService";
import teamsService from "../../../services/teamsService";
import Button from "../../common/button/button";
import { BiPlus } from "react-icons/bi";
import CreateTeamForm from "./createTeamForm/createTeamForm";
import TeamElement from "./teamElement/teamElement";
import DashboardLoader from "../../dashboardLoader/dashboardLoader";

import "./teamsContent.css";

const TeamsContent = () => {
  const { user, token } = useContext(UserContext);
  const setPopup = useContext(PopupContext);
  const [apps, setApps] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    appsService.setToken(token);
    teamsService.setToken(token);
    const getApps = async () => {
      try {
        const { data } = await appsService.getApps();
        setApps([
          ...data.map((a) => {
            return { value: a._id, label: a.name };
          }),
        ]);
      } catch (ex) {}
      setLoading(false);
    };
    const getTeams = async () => {
      try {
        const { data } = await teamsService.getTeams();
        setTeams(data);
      } catch (ex) {}
    };
    getApps();
    getTeams();
  }, [token]);

  if (loading) return <DashboardLoader />;

  return (
    <section className="teams">
      <div className="teams-header">
        <p>
          You are a member in {teams.length} team
          {teams.length > 1 || teams.length === 0 ? "s" : " only"}
        </p>
        <Button
          label={<BiPlus />}
          className="btn-action btn-icon"
          onClick={() =>
            setPopup([
              <CreateTeamForm
                apps={apps}
                token={token}
                teams={teams}
                setTeams={setTeams}
                setPopup={setPopup}
              />,
              "Create New Team",
            ])
          }
        />
      </div>
      <div className="teams-grid">
        {teams.map((team) => (
          <TeamElement
            key={team._id}
            user={user}
            token={token}
            team={team}
            teams={teams}
            setTeams={setTeams}
            setPopup={setPopup}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamsContent;
