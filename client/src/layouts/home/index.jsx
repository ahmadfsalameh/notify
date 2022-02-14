import React, { useEffect, useState } from "react";
import Greetings from "../../components/greetings/greetings";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";
import VisualBoard from "../../components/visualBoard/visualBoard";

import logo from "../../assets/vectors/logo.svg";

import "./style.css";

const Login = () => {
  const [form, setForm] = useState(true);

  useEffect(() => {
    document.title = "Bug Tracker - Track your applications bugs and issues";
  }, []);

  return (
    <article className="home">
      <section className="form">
        <section className="form-action">
          <div className="form-action-container">
            <div className="logo">
              <img src={logo} />
            </div>
            <Greetings key={form} form={form} />
            {form ? <LoginForm /> : <RegisterForm />}
          </div>
        </section>
        <div className="form-toggler">
          <p>
            {form ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setForm(!form)}>
              {form ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </section>
      <VisualBoard />
    </article>
  );
};

export default Login;
