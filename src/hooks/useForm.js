import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  function handleChange(evt) {
    const { name, value } = evt.target;
    const stateKey = name === "weather-type" ? "weatherType" : name;
    setValues({ ...values, [stateKey]: value });
  }

  return { values, setValues, handleChange };
}
