import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    if (event.target.type === "checkbox") {
      setValues({
        ...values,
        [event.target.name]: event.target.checked ? "SUBSCRIBED" : "NORMAL",
      });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }

    console.log(values);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
