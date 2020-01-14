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
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  align-items: center;
  @media (min-width: ${props => props.theme.largeScreen}) {
    margin-top: ${props => props.theme.navHeight};
    margin-left: ${props => props.theme.sidebarWidth};
  }
`;

//action is a component that triggers an action for the page, i.e add a dancer, or create a new dance
const SubNavMainLayout = ({ children, page = "", action = null }) => {
  return (
    <Fragment>
      <MobileStatusBar page={page} action={action} />
      <MobileNav />
      <DesktopNav />
      <MainStyle>
        <ContentHeader page={page} action={action} />
        {children}
      </MainStyle>
    </Fragment>
  );
};

export default SubNavMainLayout;
