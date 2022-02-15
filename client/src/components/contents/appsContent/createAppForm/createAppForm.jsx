import React, { useEffect, useState } from "react";
import useForm from "../../../../hooks/useForm";
import appsService from "../../../../services/appsService";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";
import { BiCog } from "react-icons/bi";
import { createAppSchema } from "../../../../validation/app";
import text from "../../../../constants/text.json";

const CreateAppForm = ({ apps, setApps, setPopup }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      name: "",
    },
    createAppSchema
  );
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const createApp = async () => {
    setLoading(true);
    try {
      const { data: app } = await appsService.createApp(data);
      app.team = "";
      app.status = "unassigned";
      app.bugs = [];
      setLoading(false);
      setApps([app, ...apps]);
      setPopup(null);
      if (mounted) setData({ name: "" }, true);
    } catch (ex) {
      setLoading(false);
    }
  };

  const { apps: appsText } = text;

  return (
    <div className="create-content">
      <p>{appsText.create.description}</p>
      <form onSubmit={(e) => handleSubmit(e, createApp)}>
        <Input
          value={data.name}
          onChange={setData}
          name="name"
          label={appsText.create.form.name}
          error={errors.name}
          icon={<BiCog />}
        />
        <Button
          label={appsText.create.form.action}
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default CreateAppForm;
