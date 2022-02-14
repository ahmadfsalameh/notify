import React, { useState } from "react";
import Group from "../../../common/group/group";
import InfoGroup from "../../../common/infoGroup/infoGroup";
import Button from "../../../common/button/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import Member from "./member/member";
import InviteMemberForm from "./inviteMemberForm/inviteMemberForm";
import teamsService from "../../../../services/teamsService";
import text from "../../../../constants/text.json";

const TeamElement = ({ user, token, team, teams, setTeams, setPopup }) => {
  const [loading, setLoading] = useState(false);

  //When adding a team and updating the state we don't have the team owner!
  if (!team.owner) team.owner = user;

  const deleteTeam = async () => {
    teamsService.setToken(token);
    setLoading(true);
    try {
      await teamsService.deleteTeam(team._id);
      setLoading(false);
      setTeams([...teams.filter((t) => t._id !== team._id)]);
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }
  };

  const { teams: teamsText } = text;

  return (
    <Group
      label={team.name}
      prefix={teamsText.prefix}
      actions={
        team.owner._id == user._id && (
          <>
            <Button
              label={teamsText.inviteAction}
              className="btn-action"
              LoadingSpinnerClass="loading-spinner-icon"
              onClick={() =>
                setPopup([
                  <InviteMemberForm team={team} />,
                  teamsText.invite.label,
                ])
              }
            />
            <Button
              label={<RiDeleteBin5Line />}
              className="btn-action btn-icon"
              LoadingSpinnerClass="loading-spinner-icon"
              loading={loading}
              onClick={deleteTeam}
            />
          </>
        )
      }
      content={
        <>
          <InfoGroup
            label={teamsText.members}
            waves={true}
            content={
              <div className="members">
                <Member member={team.owner} leader={true} />
                {team.members &&
                  team.members.map((member) => (
                    <Member key={member._id} member={member} />
                  ))}
              </div>
            }
          />
          <InfoGroup
            label={teamsText.app}
            waves={true}
            content={team.app.name}
          />
        </>
      }
    />
  );
};

export default TeamElement;
