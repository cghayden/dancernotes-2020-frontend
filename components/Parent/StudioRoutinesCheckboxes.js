import React from "react";
import styled from "styled-components";
import { ParentDisplayConsumer } from "../ParentDisplayProvider";

// styles for checkbox and label of each dance for the studio
const Checkboxes = styled.div`
  padding-left: 1rem;
  input {
    color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
    margin-bottom: 0.5rem;
  }
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
        return (
          <div>
            <h4>{studioName}</h4>
            <Checkboxes>
              {studioRoutines.map(routine => (
                <div key={routine.id}>
                  <input
                    disabled={
                      hiddenStudios.includes(studioId) ||
                      hiddenDancers.includes(dancerId)
                    }
                    checked={!hiddenDances.includes(routine.id)}
                    type="checkbox"
                    id={routine.name}
                    name={routine.name}
                    value={routine.name}
                    onChange={() => toggleDance(routine.id, hiddenDances)}
                  />
                  <CheckboxLabel
                    disabled={
                      hiddenStudios.includes(studioId) ||
                      hiddenDancers.includes(dancerId)
                    }
                    htmlFor={routine.name}
                  >
                    {routine.name}
                  </CheckboxLabel>
                </div>
              ))}
            </Checkboxes>
          </div>
        );
      }}
    </ParentDisplayConsumer>
  );
}

export default StudioRoutinesCheckboxes;
export { CheckboxLabel, Checkboxes };
