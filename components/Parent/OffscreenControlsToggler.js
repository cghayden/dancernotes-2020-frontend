import React from "react";
import { ParentDisplayConsumer } from "../ParentDisplayProvider";
import styled from "styled-components";

const OffScreenTogglerButton = styled.button`
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

function OffScreenControlsToggler({ text }) {
  return (
    <ParentDisplayConsumer>
      {({ toggleControlPanel }) => {
        return (
          <OffScreenTogglerButton
            onClick={() => {
              toggleControlPanel();
            }}
          >
            {text}
          </OffScreenTogglerButton>
        );
      }}
    </ParentDisplayConsumer>
  );
}

export default OffScreenControlsToggler;
