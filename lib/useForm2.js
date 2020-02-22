import { useState } from "react";

function useForm(initial = {}) {
  const [inputs, updateInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }

    updateInputs({
      ...inputs,
      [name]: value
    });
  }

  function resetForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    updateInputs(blankState);
  }

  return {
    inputs,
    updateInputs,
    handleChange,
    resetForm
  };
}

export default useForm;
