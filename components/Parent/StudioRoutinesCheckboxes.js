import React from 'react'
import styled from 'styled-components'
import { useDisplayControls } from './ParentDisplayProvider'

// styles for checkbox and label of each dance for the studio
const Checkboxes = styled.div``
const StudioHeading = styled.h4`
  color: ${(props) => (props.disabled ? props.theme.disabledText : 'inherit')};
  padding: 0.5rem 0;
`
const CheckboxLabel = styled.label`
  color: ${(props) => (props.disabled ? props.theme.disabledText : 'inherit')};
  margin-bottom: 0.5rem;
`
const CheckboxAndLabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  margin-left: 0.75em;
  input {
    color: ${(props) =>
      props.disabled ? props.theme.disabledText : 'inherit'};
    margin-top: 4px;
  }
`
function StudioRoutinesCheckboxes({
  allRoutines,
  studioName,
  studioId,
  dancerId,
}) {
  const { hiddenIds, toggleId } = useDisplayControls()

  const studioRoutines = allRoutines.filter(
    (routine) => routine.studio && routine.studio.id === studioId
  )

  const disabled = hiddenIds.includes(studioId) || hiddenIds.includes(dancerId)

  return (
    <>
      <StudioHeading disabled={disabled}>{studioName}</StudioHeading>
      <Checkboxes>
        {studioRoutines.map((routine) => (
          <CheckboxAndLabelContainer key={routine.id}>
            <input
              disabled={disabled}
              checked={!hiddenIds.includes(routine.id)}
              type='checkbox'
              id={routine.name}
              name={routine.name}
              value={routine.name}
              onChange={() => toggleId(routine.id)}
            />
            <CheckboxLabel disabled={disabled} htmlFor={routine.name}>
              {routine.name}
            </CheckboxLabel>
          </CheckboxAndLabelContainer>
        ))}
      </Checkboxes>
    </>
  )
}

export default StudioRoutinesCheckboxes
export { CheckboxLabel, Checkboxes, StudioHeading }
