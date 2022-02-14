import { useState } from "react";

const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({ global: "", ...initialValues });

  const handleSubmit = (e, callback) => {
    e.preventDefault();

    if (validationSchema) {
      let { error } = validationSchema.validate(values);

      if (error && error.details.length) {
        error.details.forEach((err) => setErrors({ [err.path]: err.message }));
      } else {
        callback(values);
      }
    } else {
      callback(values);
    }
  };

  return [
    values,
    errors,
    (e, manual = false) => {
      if (manual) {
        setValues(e);
      } else {
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    },
    setErrors,
    handleSubmit,
  ];
};

export default useForm;
