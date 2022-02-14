import React, { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import Button from "../../../common/button/button";
import Textarea from "../../../common/textarea/textarea";
import Select from "react-select";
import bugsService from "../../../../services/bugsService";

const CreateIssueForm = ({ apps, bugs, setBugs, setPopup }) => {
  const options = apps.map((app) => {
    return {
      value: app.apiKey,
      label: app.label,
    };
  });

  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      message: "",
      apiKey: "",
    },
    null
  );
  const [loading, setLoading] = useState(false);

  const createBug = async () => {
    setLoading(true);
    try {
      const bugData = {
        apiKey: data.apiKey,
        bug: { message: data.message },
      };
      const { data: bug } = await bugsService.createBug(bugData);
      setBugs([bug, ...bugs]);
      setPopup(null);
    } catch (ex) {
      setLoading(false);
    }
  };
  if (!options.length)
    return (
      <div className="create-content">
        <p>
          Please create an app first! <Link to="/apps">Create App</Link>
        </p>
      </div>
    );
  return (
    <div className="create-content">
      <p>Create new issues and assign it to different members in your teams!</p>
      <form onSubmit={(e) => handleSubmit(e, createBug)}>
        <Textarea
          value={data.message}
          name="message"
          placeholder="Insert issue text here ..."
          label="Issue"
          onChange={setData}
        />
        <Select
          options={options}
          onChange={(e) => setData({ ...data, apiKey: e.value }, true)}
          placeholder="Select app..."
        />
        <Button
          label="Create Issue"
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default CreateIssueForm;
