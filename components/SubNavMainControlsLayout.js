import React, { Fragment } from "react";
import MobileStatusBar from "./Parent/MobileStatusBar";
import MobileNav from "./Parent/MobileNav";
import DesktopNav from "./Parent/DesktopNav";
// import ContentLayout from "../ContentLayout";
import ContentHeader from "./ContentHeader";
import styled from "styled-components";

const MainStyle = styled.main`
  margin-top: ${props => props.theme.mobileMainTop};
  padding-top: 1rem;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${props => props.theme.largeScreen}) {
    margin-top: ${props => props.theme.navHeight};
    /* left margin to give room for subnav */
    margin-left: ${props => props.theme.sidebarWidth};
    /* right margin to give room for control panel */
    margin-right: ${props => props.theme.controlPanelWidth};
  }
`;

//This component sets the layout when there is a control panel for the page. The control panel is offscreen on mobile, and the text for the button that toggles the offscreen panel must be passed as 'offscreenToggler' prop (Sting) from the page that needs it.  offscreenToggler must then be passed to MobileStatusBar

// ContentHeader recieves mobile prop to signal that it must remain on the page in the mobile layout.
// this is necessary because the pageAction needs to be displayed in the main content area because the offscreen toggler is occupying the place of the action button in the mobileNav.
const SubNavMainLayout = ({
  offscreenToggler = null,
  children,
  page = "",
  mobileHeader = "",
  pageAction = null
}) => {
  return (
    <Fragment>
      <MobileStatusBar
        offscreenToggler={offscreenToggler}
        mobileHeader={mobileHeader}
        pageAction={pageAction}
      />
      <MobileNav />
      <DesktopNav />
      <MainStyle>
        <ContentHeader mobile page={page} pageAction={pageAction} />
        {children}
      </MainStyle>
    </Fragment>
  );
};

export default SubNavMainLayout;
