import React, { useState, useContext } from "react";
import validationSchema from "../../validation/register";
import useForm from "../../hooks/useForm";
import { BiAt, BiLockAlt, BiUser } from "react-icons/bi";
import Input from "../common/input/input";
import Button from "../common/button/button";
import user from "../../services/userService";
import auth from "../../services/authService";
import { UserContext } from "../../context/userContext";

import "./registerForm.css";

const RegisterForm = () => {
  const { setToken } = useContext(UserContext);
  const [data, errors, setData, setErrors, handleSubmit] = useForm(
    {
      name: "",
      email: "",
      password: "",
    },
    validationSchema
  );
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);

    try {
      const { headers } = await user.register(data).then((d) => {
        setLoading(false);
        return d;
      });
      const token = headers["x-auth-token"];
      auth.storeToken(token);
      setToken(token);
    } catch (ex) {
      setLoading(false);
      if (ex.response.status === 400)
        setErrors({
          global: "",
          name: false,
          email: "This email is already used!",
          password: false,
        });
    }
  };

  return (
    <form className="register-form" onSubmit={(e) => handleSubmit(e, register)}>
      <Input
        value={data.name}
        onChange={setData}
        name="name"
        label="Name"
        icon={<BiUser />}
        error={errors.name}
      />
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
      <Button className={"auth-form-btn"} label="Sign Up" loading={loading} />
    </form>
  );
};

export default RegisterForm;
