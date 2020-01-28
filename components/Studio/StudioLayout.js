import React, { Fragment } from "react";
import StudioMobileStatusBar from "./StudioMobileStatusBar";
import StudioDesktopNav from "./StudioDesktopNav";
import StudioMobileNav from "./StudioMobileNav";
import ContentLayout from "../ContentLayout";
import ContentHeader from "../ContentHeader";
import styled from "styled-components";

const MainContentWrapper = styled.div`
  padding-bottom: 200px;
  width: 100%;
`;

const StudioLayout = ({
  children,
  page = "",
  pageAction = <div />,
  subnav = <div />,
  controls = null
}) => {
  return (
    <Fragment>
      <StudioMobileStatusBar page={page} pageAction={pageAction} />
      <StudioMobileNav />
      <StudioDesktopNav />
      <ContentLayout>
        {subnav}
        <main>
          <ContentHeader page={page} pageAction={pageAction} />
          <MainContentWrapper>{children}</MainContentWrapper>
        </main>
        {controls}
      </ContentLayout>
    </Fragment>
  );
};

export default StudioLayout;
