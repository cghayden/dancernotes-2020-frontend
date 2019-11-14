import React from "react";
import StudioMobileStatusBar from "./StudioMobileStatusBar";
import StudioDesktopNav from "./StudioDesktopNav";
import StudioMobileNav from "./StudioMobileNav";
import ContentLayout from "../ContentLayout";

const StudioLayout = ({ children, page }) => {
  return (
    <div>
      <StudioMobileStatusBar page={page} />
      <StudioDesktopNav />
      <StudioMobileNav />
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
};

export default StudioLayout;
