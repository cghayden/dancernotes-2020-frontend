import React, { Component } from "react";
import styled from "styled-components";
// import { HiddenDanceContext } from "./HiddenDanceContext";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";

const StudioCheckboxes = styled.div`
  .label_Studio {
    font-size: 1.25rem;
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

const IndependentRoutinesCheckboxes = ({ routines, dancerId }) => {
  return (
    <ParentDisplayConsumer>
      {({
        hiddenDances,
        hiddenDancers,
        hiddenStudios,
        hiddenIndependents,
        toggleDance,
        toggleStudio,
        toggleIndependent,
      }) => {
        return (
          <StudioCheckboxes disabled={hiddenDancers.includes(dancerId)}>
            <input
              disabled={hiddenDancers.includes(dancerId)}
              checked={!hiddenIndependents.includes(dancerId)}
              onChange={() => {
                toggleStudio("independent", hiddenStudios);
                toggleIndependent(dancerId, hiddenIndependents);
              }}
              type="checkbox"
              id={"independent"}
              name={"independent"}
              value={"independent"}
            />
            <label className="label_Studio" htmlFor={"independent"}>
              Others:
            </label>
            <CheckboxDiv
              disabled={
                hiddenIndependents.includes(dancerId) ||
                hiddenDancers.includes(dancerId)
              }
            >
              {routines.map(routine => (
                <div key={routine.id}>
                  <input
                    disabled={
                      hiddenIndependents.includes(dancerId) ||
                      hiddenDancers.includes(dancerId)
                    }
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

export default IndependentRoutinesCheckboxes;
