import React from "react";
import styled from "styled-components";

const StudioMobileStatusBarStyles = styled.div`
  height: ${props => props.theme.mobileStatusBarHeight};
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.gray0};
  display: grid;
  z-index: 100;
  grid-template-columns: repeat(auto-fit, minmax(50vw, 1fr));
  place-items: center;

  h1 {
    position: absolute;
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const Title = styled.h1`
  // font-size: 2rem;
`;
const Actions = styled.div`
  margin-left: auto;
`;
function StudioMobileStatusBar(props) {
  return (
    <StudioMobileStatusBarStyles>
      <Title>{props.page}</Title>
      <Actions>{props.children}</Actions>
    </StudioMobileStatusBarStyles>
  );
}

export default StudioMobileStatusBar;
