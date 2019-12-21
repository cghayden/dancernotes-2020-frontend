import React, { Fragment } from "react";
import StudioMobileStatusBar from "./StudioMobileStatusBar";
import StudioDesktopNav from "./StudioDesktopNav";
import StudioMobileNav from "./StudioMobileNav";
import ContentLayout from "../ContentLayout";
import ContentHeader from "../ContentHeader";

const StudioLayout = ({
  children,
  page = "",
  action = <div />,
  subnav = <div />,
  controls = null
}) => {
  return (
    <Fragment>
      <StudioMobileStatusBar page={page} action={action} />
      <StudioMobileNav />
      <StudioDesktopNav />
      <ContentLayout>
        {subnav}
        <main>
          <ContentHeader page={page} action={action} />
          {children}
        </main>
        {controls}
      </ContentLayout>
    </Fragment>
  );
};

export default StudioLayout;
