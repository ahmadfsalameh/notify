import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button/button";
import invitesService from "../../services/invitesService";

import waves from "../../assets/vectors/waves.svg";
import "./invite.css";

const Invite = ({ id }) => {
  const [invite, setInvite] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await invitesService.getInvite(id);
        setInvite(data);
      } catch (ex) {}
    };
    getDetails();
  }, []);
  return (
    <section className="invite">
      <div className="invite">
        <div className="waves">
          <img src={waves} />
        </div>
        {invite && (
          <div className="details">
            <div className="sender-avatar">
              <img src={invite.sender.avatar} />
            </div>
            <p>
              <span>{invite.sender.name}</span> has invited you to join{" "}
              {invite.team.name}
              team on Notify.
            </p>
            <Button
              label="Accept"
              className="btn-action"
              onClick={() => navigate(`/invites/accept/${id}`)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Invite;
