import { useState } from 'react'

function useForm(initial = {}) {
  const [inputs, updateInputs] = useState(initial)

  function handleChange(e) {
    const { value, name, type } = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    // if (type === 'file') {
    //   [value] = e.target.files;
    // }
    updateInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  function resetForm() {
    updateInputs(initial)
  }

  // https://courses.wesbos.com/account/access/5bc08946d9a7d7279eef2f62/view/507222373 ::

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    )
    setInputs(blankState)
  }
  return {
    inputs,
    updateInputs,
    handleChange,
    resetForm,
    clearForm,
  }
}

export default useForm
