import { useState } from "react";

function useForm(initial = {}) {
  const [inputs, updateInputs] = useState(initial);

  function handleChange(e) {
    updateInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  function resetForm() {
    updateInputs(initial);
  }

  return {
    inputs,
    updateInputs,
    handleChange,
    resetForm
  };
}

export default useForm;
