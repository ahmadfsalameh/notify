import React, { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import Button from "../../../common/button/button";
import Textarea from "../../../common/textarea/textarea";
import Select from "react-select";
import bugsService from "../../../../services/bugsService";
import { createIssueSchema } from "../../../../validation/issue";
import text from "../../../../constants/text.json";

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
    createIssueSchema
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

  const { issues: issuesText } = text;

  if (!options.length)
    return (
      <div className="create-content">
        <p>
          {issuesText.issue.noApps.description}{" "}
          <Link to="/apps">{issuesText.issue.noApps.link}</Link>
        </p>
      </div>
    );
  return (
    <div className="create-content">
      <p>{issuesText.issue.description}</p>
      <form onSubmit={(e) => handleSubmit(e, createBug)}>
        <Textarea
          value={data.message}
          name="message"
          placeholder={issuesText.issue.form.placeholder}
          label={issuesText.issue.form.issue}
          onChange={setData}
          error={errors.message}
        />
        <Select
          options={options}
          onChange={(e) => setData({ ...data, apiKey: e.value }, true)}
          placeholder={issuesText.issue.form.select}
          className={errors.apiKey ? "reactselect-invalid" : ""}
        />
        <Button
          label={issuesText.issue.form.action}
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default CreateIssueForm;
