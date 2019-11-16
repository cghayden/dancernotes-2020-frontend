import React, { Fragment } from "react";
import MobileStatusBar from "./MobileStatusBar";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import ContentLayout from "../ContentLayout";
import ContentHeader from "../ContentHeader";

//action is a component that triggers an action for the page, i.e add a dancer, or create a new dance
const ParentLayout = ({
  children,
  page = "",
  action = <div />,
  subnav = <div />,
  controls = <div />
}) => {
  return (
    <Fragment>
      <MobileStatusBar page={page} action={action} />
      <MobileNav />
      <DesktopNav />
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

export default ParentLayout;
