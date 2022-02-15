import React from "react";
import Input from "../../../../common/input/input";
import { BiAt } from "react-icons/bi";
import Button from "../../../../common/button/button";
import useForm from "../../../../../hooks/useForm";
import { useState } from "react";
import invitesService from "../../../../../services/invitesService";
import { inviteMemberSchema } from "../../../../../validation/team";
import text from "../../../../../constants/text.json";

const InviteMemberForm = ({ team }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      email: "",
    },
    inviteMemberSchema
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

  const { invite: inviteText } = text.teams;

  return (
    <div className="create-content">
      <p>
        {inviteText.description} ({team.name}).
      </p>
      <form onSubmit={(e) => handleSubmit(e, sendInvite)}>
        <Input
          name="email"
          label={inviteText.form.email}
          icon={<BiAt />}
          value={data.email}
          onChange={setData}
          error={errors.email}
        />
        <Button
          label={inviteText.form.action}
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default InviteMemberForm;
