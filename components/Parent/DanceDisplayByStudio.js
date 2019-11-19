import React from "react";
import styled from "styled-components";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";

const StudioCheckboxes = styled.div`
  justify-self: center;
  .label_Studio {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
  }
  margin-bottom: 1rem;
`;

const CheckboxDiv = styled.div`
  padding-left: 1rem;
  label {
    color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
  }
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
            <input
              disabled={hiddenDancers.includes(dancerId)}
              checked={!hiddenStudios.includes(studioId)}
              onChange={() => toggleStudio(studioId, hiddenStudios)}
              type="checkbox"
              id={studioName}
              name={studioName}
              value={studioName}
            />
            <label className="label_Studio" htmlFor={studioName}>
              {studioName}
            </label>
            <CheckboxDiv disabled={disabled}>
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
            </CheckboxDiv>
          </StudioCheckboxes>
        );
      }}
    </ParentDisplayConsumer>
  );
};

export default DanceDisplayByStudio;
