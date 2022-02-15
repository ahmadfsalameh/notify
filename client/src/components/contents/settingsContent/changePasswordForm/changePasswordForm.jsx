import React, { useState } from "react";
import useForm from "../../../../hooks/useForm";
import Input from "../../../common/input/input";
import { BiLock } from "react-icons/bi";
import Button from "../../../common/button/button";
import userService from "../../../../services/userService";
import text from "../../../../constants/text.json";

const ChangeNameForm = ({ token, user, setUser, setPopup }) => {
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      password: "",
      newPassword: "",
    },
    null
  );

  const [loading, setLoading] = useState(false);

  const { changePassword: changePasswordText } = text.settings;

  const changePassword = async () => {
    userService.setToken(token);
    setLoading(true);
    try {
      await userService.changePassword(data);
      setPopup(null);
    } catch (ex) {
      setLoading(false);
    }
  };

  return (
    <div className="create-content">
      <p>{changePasswordText.description}</p>
      <form onSubmit={(e) => handleSubmit(e, changePassword)}>
        <Input
          name="password"
          value={data.password}
          label={changePasswordText.form.password}
          onChange={setData}
          icon={<BiLock />}
          error={errors.password}
          type="password"
        />
        <Input
          name="newPassword"
          value={data.newPassword}
          label={changePasswordText.form.newPassword}
          onChange={setData}
          icon={<BiLock />}
          error={errors.newPassword}
          type="password"
        />
        <Button
          label={changePasswordText.form.action}
          className="btn-action btn-primary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ChangeNameForm;
