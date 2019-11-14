import React from "react";
import { ParentDisplayConsumer } from "../ParentDisplayProvider";

function OffScreenControlsToggler({ text }) {
  return (
    <ParentDisplayConsumer>
      {({ toggleControlPanel }) => {
        return (
          <button
            onClick={() => {
              toggleControlPanel();
            }}
          >
            {text}
          </button>
        );
      }}
    </ParentDisplayConsumer>
  );
}

export default OffScreenControlsToggler;
