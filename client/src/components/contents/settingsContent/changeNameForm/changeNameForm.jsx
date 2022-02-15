import React from "react";
import useForm from "../../../../hooks/useForm";
import Input from "../../../common/input/input";
import { BiUser } from "react-icons/bi";
import Button from "../../../common/button/button";
import text from "../../../../constants/text.json";

const ChangeNameForm = ({ token }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      name: "",
    },
    null
  );

  const { changeName } = text.settings;

  return (
    <div className="create-content">
      <p>{changeName.description}</p>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={data.name}
          label={changeName.form.name}
          onChange={setData}
          icon={<BiUser />}
        />
        <Button
          label={changeName.form.action}
          className="btn-action btn-primary"
        />
      </form>
    </div>
  );
};

export default ChangeNameForm;
