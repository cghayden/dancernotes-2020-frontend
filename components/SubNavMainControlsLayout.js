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

//action is a component that triggers an pageAction for the page, i.e add a dancer, or create a new dance
const SubNavMainLayout = ({ children, page = "", pageAction = null }) => {
  return (
    <Fragment>
      <MobileStatusBar page={page} pageAction={pageAction} />
      <MobileNav />
      <DesktopNav />
      <MainStyle>
        <ContentHeader page={page} pageAction={pageAction} />
        {children}
      </MainStyle>
    </Fragment>
  );
};

export default SubNavMainLayout;
