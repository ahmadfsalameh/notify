import React, { useState, useContext } from "react";
import validationSchema from "../../validation/login";
import useForm from "../../hooks/useForm";
import { BiAt, BiLockAlt } from "react-icons/bi";
import Input from "../common/input/input";
import Button from "../common/button/button";
import auth from "../../services/authService";
import { UserContext } from "../../context/userContext";

import "./loginForm.css";

const LoginForm = () => {
  const { setToken } = useContext(UserContext);
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      email: "",
      password: "",
    },
    validationSchema
  );
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);

    try {
      const { data: token } = await auth.login(data).then((d) => {
        setLoading(false);
        return d;
      });
      auth.storeToken(token);
      setToken(token);
    } catch (ex) {
      setLoading(false);
      if (ex.response.status === 400)
        setErrors({
          global: "Worng email or password!",
          email: true,
          password: true,
        });
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e, login)}>
      <Input
        value={data.email}
        onChange={setData}
        name="email"
        label="Email"
        icon={<BiAt />}
        error={errors.email}
      />
      <Input
        value={data.password}
        onChange={setData}
        name="password"
        label="Password"
        icon={<BiLockAlt />}
        type="password"
        error={errors.password}
      />
      {errors.global && <p className="form-error">{errors.global}</p>}
      <Button className={"auth-form-btn"} label="Login" loading={loading} />
    </form>
  );
};

export default LoginForm;
