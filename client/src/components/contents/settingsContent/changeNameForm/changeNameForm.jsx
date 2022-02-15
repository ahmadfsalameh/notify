import React, { useState } from "react";
import useForm from "../../../../hooks/useForm";
import Input from "../../../common/input/input";
import { BiUser } from "react-icons/bi";
import Button from "../../../common/button/button";
import validationSchema from "../../../../validation/name";
import userService from "../../../../services/userService";
import text from "../../../../constants/text.json";

const ChangeNameForm = ({ token, user, setUser, setPopup }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      name: "",
    },
    validationSchema
  );

  const [loading, setLoading] = useState(false);

  const { changeName } = text.settings;

  const changeUserName = async () => {
    userService.setToken(token);
    setLoading(true);
    try {
      await userService.changeUserName(data);
      setUser({ ...user, ...data });
      setPopup(null);
    } catch (ex) {
      setLoading(false);
    }
  };

  return (
    <div className="create-content">
      <p>{changeName.description}</p>
      <form onSubmit={(e) => handleSubmit(e, changeUserName)}>
        <Input
          name="name"
          value={data.name}
          label={changeName.form.name}
          onChange={setData}
          icon={<BiUser />}
          error={errors.name}
        />
        <Button
          label={changeName.form.action}
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ChangeNameForm;
