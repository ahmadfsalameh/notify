import React from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

import "./button.css";

const Button = ({
  className,
  LoadingSpinnerClass,
  label,
  loading,
  onClick = null,
}) => {
  return (
    <button
      className={`btn ${className} ${loading ? "btn-loading" : ""}`}
      onClick={onClick}
      disabled={loading ? "disabled" : null}
    >
      {label}
      {loading && <LoadingSpinner classes={LoadingSpinnerClass} />}
    </button>
  );
};

export default Button;
