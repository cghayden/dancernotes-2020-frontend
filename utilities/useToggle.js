import { useState } from 'react'

export function useToggle(initial) {
  const [isToggled, setToggle] = useState(initial)
  const toggle = () => setToggle((isToggled) => !isToggled)
  // return [isToggled, setToggle, toggle]
  return { isToggled, setToggle, toggle }
}
