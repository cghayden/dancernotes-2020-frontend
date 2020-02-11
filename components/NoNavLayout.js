import React, { Fragment } from "react";
import MobileStatusBar from "./Parent/MobileStatusBar";
import MobileNav from "./Parent/MobileNav";
import DesktopNav from "./Parent/DesktopNav";
import ContentHeader from "./ContentHeader";

//action is a component that triggers an pageAction for the page, i.e add a dancer, or create a new dance
const NoNavLayout = ({
  children,
  page = "",
  mobileHeader = "",
  pageAction = null
}) => {
  return (
    <Fragment>
      <MobileStatusBar mobileHeader={mobileHeader} pageAction={pageAction} />
      <MobileNav />
      <DesktopNav />
      <MainStyle>
        <ContentHeader page={page} pageAction={pageAction} />
        {children}
      </MainStyle>
    </Fragment>
  );
};

export default NoNavLayout;
