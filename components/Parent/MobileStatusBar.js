import React from "react";
import styled from "styled-components";
import OffScreenControlsToggler from "../Parent/OffscreenControlsToggler";

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

// This component can display one action in the right hand corner.  If there is an offscreen control panel for the page, that toggler is what is displayed.  The toggler is triggered if the text of the toggler is passed down via a String prop from the page component through SubNavMainControls.
//if it does not receive offscreenToggler prop, it will display the page action prop that comes in from page > layout component.
function MobileStatusBar({
  mobileHeader,
  offscreenToggler = null,
  pageAction = null
}) {
  return (
    <MobileStatusBarStyles>
      <Title>{mobileHeader}</Title>
      {offscreenToggler && (
        <PageAction>
          <OffScreenControlsToggler text={offscreenToggler} />
        </PageAction>
      )}
      {!offscreenToggler && pageAction && <PageAction>{pageAction}</PageAction>}
    </MobileStatusBarStyles>
  );
}

export default MobileStatusBar;
