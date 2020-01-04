import React, { Fragment } from "react";
import MobileStatusBar from "./MobileStatusBar";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import ContentLayout from "../ContentLayout";
import ContentHeader from "../ContentHeader";
import styled from "styled-components";

const SubNavMainLayout = styled.main`
  margin-top: 9rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  align-items: center;
  @media (min-width: ${props => props.theme.largeScreen}) {
    margin-top: ${props => props.theme.navHeight};
  }
`;

//action is a component that triggers an action for the page, i.e add a dancer, or create a new dance
const ParentLayout = ({ children, page = "", action = null }) => {
  return (
    <Fragment>
      <MobileStatusBar page={page} action={action} />
      <MobileNav />
      <DesktopNav />
      <SubNavMainLayout>
        <ContentHeader page={page} action={action} />
        {children}
      </SubNavMainLayout>
    </Fragment>
  );
};

export default ParentLayout;
