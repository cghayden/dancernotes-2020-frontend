import React from "react";
import styled from "styled-components";

const StudioMobileStatusBarStyles = styled.div`
  height: ${props => props.theme.mobileStatusBarHeight};
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.gray0};
  display: flex;
  z-index: 1000;
  padding-left: 1rem;
  place-items: center;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const PageAction = styled.div`
  margin-left: auto;
`;

function StudioMobileStatusBar({ mobileHeader, pageAction }) {
  return (
    <StudioMobileStatusBarStyles>
      <Title>{mobileHeader}</Title>
      <PageAction>{pageAction}</PageAction>
    </StudioMobileStatusBarStyles>
  );
}

export default StudioMobileStatusBar;
