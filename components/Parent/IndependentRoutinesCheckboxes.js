import React from "react";
import styled from "styled-components";

import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";
import { CheckboxLabel, Checkboxes } from "./StudioRoutinesCheckboxes";

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
          <div>
            <h4>Independent</h4>
            <Checkboxes>
              {routines.map(routine => (
                <div key={routine.id}>
                  <input
                    disabled={
                      hiddenIndependents.includes(dancerId) ||
                      hiddenIndependents.includes("all") ||
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
                      hiddenIndependents.includes(dancerId) ||
                      hiddenIndependents.includes("all") ||
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

export default IndependentRoutinesCheckboxes;
