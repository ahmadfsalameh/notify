import React, { useState } from "react";
import useForm from "../../../../hooks/useForm";
import { Link } from "react-router-dom";
import Button from "../../../common/button/button";
import Input from "../../../common/input/input";
import { BiGroup } from "react-icons/bi";
import Select from "react-select";
import teamsService from "../../../../services/teamsService";
import { createTeamSchema } from "../../../../validation/team";
import text from "../../../../constants/text.json";

const CreateTeamForm = ({ apps, token, teams, setTeams, setPopup }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      name: "",
      appId: "",
    },
    createTeamSchema
  );
  const [loading, setLoading] = useState(false);

  teamsService.setToken(token);

  const createTeam = async () => {
    setLoading(true);
    try {
      const { data: team } = await teamsService.createTeam(data);
      setTeams([team, ...teams]);
      setPopup(null);
    } catch (ex) {
      setLoading(false);
    }
  };

  if (!apps.length)
    return (
      <div className="create-content">
        <p>
          Please create an app first! <Link to="/apps">Create App</Link>
        </p>
      </div>
    );

  const { create: createText } = text.teams;
  return (
    <div className="create-content">
      <p>{createText.description}</p>
      <form onSubmit={(e) => handleSubmit(e, createTeam)}>
        <Input
          value={data.name}
          onChange={setData}
          name="name"
          label={createText.form.name}
          error={errors.name}
          icon={<BiGroup />}
        />
        <Select
          options={apps}
          onChange={(e) => setData({ ...data, appId: e.value }, true)}
          placeholder={createText.form.select}
          className={errors.appId ? "reactselect-invalid" : ""}
        />
        <Button
          label={createText.form.action}
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default CreateTeamForm;
