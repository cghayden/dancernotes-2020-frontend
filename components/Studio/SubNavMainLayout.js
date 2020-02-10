import React, { Fragment } from "react";
import StudioMobileStatusBar from "./StudioMobileStatusBar";
import StudioDesktopNav from "./StudioDesktopNav";
import StudioMobileNav from "./StudioMobileNav";
import ContentHeader from "../ContentHeader";
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

//action is a component that triggers an pageAction for the page, i.e add a dancer, or create a new dance
const SubNavMainLayout = ({
  children,
  mobileHeader = "",
  page = "",
  pageAction = null
}) => {
  return (
    <Fragment>
      <StudioMobileStatusBar
        mobileHeader={mobileHeader}
        page={page}
        pageAction={pageAction}
      />
      <StudioMobileNav />
      <StudioDesktopNav />
      <MainStyle>
        <ContentHeader mobile page={page} pageAction={pageAction} />
        {children}
      </MainStyle>
    </Fragment>
  );
};

export default SubNavMainLayout;
