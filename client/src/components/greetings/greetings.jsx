import React from "react";

import "./greetings.css";

const Greetings = ({ form }) => {
  return (
    <div className="greetings">
      <h1>{form ? "Welcome back!" : "Create an account!"}</h1>
      <p>
        {form
          ? "Login to your account to access your apps and start getting the job done!"
          : "It's never late to keep an eye on your apps, great to have you on board!"}
      </p>
    </div>
  );
};

export default Greetings;
