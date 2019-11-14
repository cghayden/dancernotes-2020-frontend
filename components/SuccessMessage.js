import React from "react";
import styled from "styled-components";

const StyledSuccessMessage = styled.div`
  position: absolute;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  top: 50px;
  bottom: 50px;
  left: 50px;
  right: 50px;
  p {
    font-size: 3rem;
    color: white;
  }
  button {
    background: ${props => props.theme.teal5};
  }
`;

function SuccessMessage({ closeFunc }) {
  return (
    <StyledSuccessMessage>
      <p>Success! You created a dance</p>
      <button onClick={closeFunc}>Dismiss</button>
    </StyledSuccessMessage>
  );
}

export default SuccessMessage;
