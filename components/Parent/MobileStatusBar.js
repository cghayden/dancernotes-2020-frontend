import React from "react";
import styled from "styled-components";

const MobileStatusBarStyles = styled.div`
  height: ${props => props.theme.mobileStatusBarHeight};
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.gray0};
  display: flex;
  z-index: 1000;
  place-items: center;
  justify-content: space-between;
  padding-left: 1rem;

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
function MobileStatusBar({ mobileHeader, pageAction }) {
  return (
    <MobileStatusBarStyles>
      <Title>{mobileHeader}</Title>
      <PageAction>{pageAction}</PageAction>
    </MobileStatusBarStyles>
  );
}

export default MobileStatusBar;
