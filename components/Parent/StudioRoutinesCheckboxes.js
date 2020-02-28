import React from "react";
import styled from "styled-components";
import { useDisplayControls } from "./ParentDisplayProvider";

// styles for checkbox and label of each dance for the studio
const Checkboxes = styled.div`
  padding-left: 1rem;
  input {
    color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
    margin-bottom: 0.5rem;
  }
`;
const StudioHeading = styled.h4`
  color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
`;
const CheckboxLabel = styled.label`
  color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
  margin-bottom: 0.5rem;
`;
function StudioRoutinesCheckboxes({
  allRoutines,
  studioName,
  studioId,
  dancerId
}) {
  const { hiddenIds, toggleId } = useDisplayControls();

  const studioRoutines = allRoutines.filter(
    routine => routine.studio && routine.studio.id === studioId
  );

  const disabled = hiddenIds.includes(studioId) || hiddenIds.includes(dancerId);

  return (
    <div>
      <StudioHeading disabled={disabled}>{studioName}</StudioHeading>
      <Checkboxes>
        {studioRoutines.map(routine => (
          <div key={routine.id}>
            <input
              disabled={disabled}
              checked={!hiddenIds.includes(routine.id)}
              type="checkbox"
              id={routine.name}
              name={routine.name}
              value={routine.name}
              onChange={() => toggleId(routine.id)}
            />
            <CheckboxLabel disabled={disabled} htmlFor={routine.name}>
              {routine.name}
            </CheckboxLabel>
          </div>
        ))}
      </Checkboxes>
    </div>
  );
}

export default StudioRoutinesCheckboxes;
export { CheckboxLabel, Checkboxes, StudioHeading };
