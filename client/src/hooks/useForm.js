import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
            ? true
            : false
          : event.target.value,
    });
  };

  const onSubmit = (event, callback) => {
    event.preventDefault();
    callback(values);
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
