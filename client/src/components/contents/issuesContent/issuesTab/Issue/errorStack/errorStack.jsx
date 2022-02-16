import React from "react";

import "./errorStack.css";

const ErrorStack = ({ bug }) => {
  const { message, error } = bug;
  return (
    <div className="error-stack">
      <p>{message}</p>
      <pre>{JSON.parse(error)}</pre>
    </div>
  );
};

export default ErrorStack;
