import React from "react";
import Input from "../../../../common/input/input";
import { BiAt } from "react-icons/bi";
import Button from "../../../../common/button/button";
import useForm from "../../../../../hooks/useForm";
import { useState } from "react";
import invitesService from "../../../../../services/invitesService";

const InviteMemberForm = ({ team }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      email: "",
    },
    null
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendInvite = async () => {
    setLoading(true);
    try {
      const inviteData = {
        teamId: team._id,
        email: data.email,
      };
      await invitesService.sendInvite(inviteData);
      setSuccess(true);
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  if (success)
    return (
      <div className="create-content">
        <p>
          An invitation was successfully sent to:
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
      </div>
    );

  return (
    <div className="create-content">
      <p>Invite new members to your team ({team.name}).</p>
      <form onSubmit={(e) => handleSubmit(e, sendInvite)}>
        <Input
          name="email"
          label="Member email"
          icon={<BiAt />}
          value={data.email}
          onChange={setData}
        />
        <Button
          label="Invite to team"
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default InviteMemberForm;
