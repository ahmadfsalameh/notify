import React, { useEffect, useState } from "react";
import useForm from "../../../../hooks/useForm";
import appsService from "../../../../services/appsService";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";
import { BiCog } from "react-icons/bi";

const CreateAppForm = ({ apps, setApps, setPopup }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      name: "",
    },
    null
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
  return (
    <div className="create-content">
      <p>Create new apps for your projects and start adding issues.</p>
      <form onSubmit={(e) => handleSubmit(e, createApp)}>
        <Input
          value={data.name}
          onChange={setData}
          name="name"
          label="App Name"
          error={errors.name}
          icon={<BiCog />}
        />
        <Button
          label="Create App"
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default CreateAppForm;
