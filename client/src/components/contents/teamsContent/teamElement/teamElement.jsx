import React from "react";
import Group from "../../../common/group/group";
import InfoGroup from "../../../common/infoGroup/infoGroup";
import Button from "../../../common/button/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import Member from "./member/member";
import InviteMemberForm from "./inviteMemberForm/inviteMemberForm";

const TeamElement = ({ user, team, setPopup }) => {
  //When adding a team and updating the state we don't have the team owner!
  if (!team.owner) team.owner = user;
  return (
    <Group
      label={team.name}
      prefix="Team"
      actions={
        <>
          <Button
            label="Invite member"
            className="btn-action"
            LoadingSpinnerClass="loading-spinner-icon"
            onClick={() =>
              setPopup([<InviteMemberForm team={team} />, "Invite Member "])
            }
          />
          <Button
            label={<RiDeleteBin5Line />}
            className="btn-action btn-icon"
            LoadingSpinnerClass="loading-spinner-icon"
          />
        </>
      }
      content={
        <>
          <InfoGroup
            label="Members"
            waves={true}
            content={
              <div className="members">
                <Member member={team.owner} leader={true} />
                {team.members &&
                  team.members.map((member) => <Member member={member} />)}
              </div>
            }
          />
          <InfoGroup label="Managed App" waves={true} content={team.app.name} />
        </>
      }
    />
  );
};

export default TeamElement;
