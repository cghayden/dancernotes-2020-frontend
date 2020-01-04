import React from "react";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";
import {
  StudioCheckboxes,
  StudioLabel,
  Checkboxes
} from "./StudioRoutinesCheckboxes";

function IndependentRoutinesCheckboxes({ routines, dancerId }) {
  return (
    <ParentDisplayConsumer>
      {({
        hiddenDances,
        hiddenDancers,
        hiddenStudios,
        hiddenIndependents,
        toggleDance,
        toggleStudio,
        toggleIndependent
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
            <StudioLabel htmlFor={"independent"}>Others:</StudioLabel>
            <Checkboxes
            // disabled={
            //   hiddenIndependents.includes(dancerId) ||
            //   hiddenDancers.includes(dancerId)
            // }
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
            </Checkboxes>
          </StudioCheckboxes>
        );
      }}
    </ParentDisplayConsumer>
  );
}

export default IndependentRoutinesCheckboxes;
