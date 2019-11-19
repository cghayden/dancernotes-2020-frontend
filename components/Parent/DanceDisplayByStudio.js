import React from "react";
import styled from "styled-components";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";

// container for StudioLabel and the dances of rthe studio
const StudioCheckboxes = styled.div`
  justify-self: center;
  margin: 1rem 0;
`;

//bold the studio Name
const StudioLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
`;
// checkbox and label of each dance for the studio
const DancesOfStudio = styled.div`
  padding-left: 1rem;
  label {
    color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
  }
`;

//each checkbox item including studio and dances
const CheckboxItem = styled.div`
  padding-bottom: 0.5rem;
`;

const DanceDisplayByStudio = ({
  allRoutines,
  studioName,
  studioId,
  dancerId
}) => {
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
            <CheckboxItem>
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
            </CheckboxItem>
            <DancesOfStudio disabled={disabled}>
              {studioRoutines.map(routine => (
                <CheckboxItem key={routine.id}>
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
                </CheckboxItem>
              ))}
            </DancesOfStudio>
          </StudioCheckboxes>
        );
      }}
    </ParentDisplayConsumer>
  );
};

export default DanceDisplayByStudio;
