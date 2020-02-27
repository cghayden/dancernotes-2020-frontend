import React from "react";
import styled from "styled-components";

import { useDisplayControls } from "../../components/ParentDisplayProvider";
import {
  CheckboxLabel,
  Checkboxes,
  StudioHeading
} from "./StudioRoutinesCheckboxes";

function IndependentRoutinesCheckboxes({ routines, dancerId }) {
  const { hiddenIds, toggleId } = useDisplayControls();
  return (
    <div>
      <StudioHeading
        disabled={hiddenIds.includes(dancerId) || hiddenIds.includes("all")}
      >
        Independent
      </StudioHeading>
      <Checkboxes>
        {routines.map(routine => (
          <div key={routine.id}>
            <input
              disabled={
                hiddenIds.includes(dancerId) || hiddenIds.includes("all")
              }
              checked={!hiddenIds.includes(routine.id)}
              type="checkbox"
              id={routine.name}
              name={routine.name}
              value={routine.name}
              onChange={() => toggleId(routine.id)}
            />
            <CheckboxLabel
              disabled={
                hiddenIds.includes(dancerId) || hiddenIds.includes("all")
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
}

export default IndependentRoutinesCheckboxes;
