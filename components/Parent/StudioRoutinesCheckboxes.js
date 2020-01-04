import React from "react";
import styled from "styled-components";
import { ParentDisplayConsumer } from "../ParentDisplayProvider";

// container for StudioLabel and the checkboxed dances of the studio
const StudioCheckboxes = styled.div`
  margin-bottom: 1rem;
`;
//studio Name styles
const StudioLabel = styled.label`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
`;
// styles for checkbox and label of each dance for the studio
const Checkboxes = styled.div`
  padding-left: 1rem;
  input,
  label {
    color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
    margin-bottom: 0.5rem;
  }
`;

function StudioRoutinesCheckboxes({
  allRoutines,
  studioName,
  studioId,
  dancerId
}) {
  const studioRoutines = allRoutines.filter(
    routine => routine.studio && routine.studio.id === studioId
  );

  return (
    <ParentDisplayConsumer>
      {({
        hiddenDances,
        hiddenDancers,
        toggleDance,
        hiddenStudios,
        toggleStudio
      }) => {
        const disabled =
          hiddenStudios.includes(studioId) || hiddenDancers.includes(dancerId);
        return (
          <StudioCheckboxes disabled={hiddenDancers.includes(dancerId)}>
            <input
              disabled={hiddenDancers.includes(dancerId)}
              checked={!hiddenStudios.includes(studioId)}
              onChange={() => toggleStudio(studioId, hiddenStudios)}
              type="checkbox"
              id={studioName}
              name={studioName}
              value={studioName}
            />
            <StudioLabel htmlFor={studioName}>{studioName}</StudioLabel>
            <Checkboxes disabled={disabled}>
              {studioRoutines.map(routine => (
                <div key={routine.id}>
                  <input
                    disabled={disabled}
                    checked={!hiddenDances.includes(routine.id)}
                    type="checkbox"
                    id={routine.name}
                    name={routine.name}
                    value={routine.name}
                    onChange={() => toggleDance(routine.id, hiddenDances)}
                  />
                  <label htmlFor={routine.name}>{routine.name}</label>
                </div>
              ))}
            </Checkboxes>
          </StudioCheckboxes>
        );
      }}
    </ParentDisplayConsumer>
  );
}

export default StudioRoutinesCheckboxes;
export { StudioCheckboxes, StudioLabel, Checkboxes };
