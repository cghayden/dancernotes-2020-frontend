import StudioMobileStatusBar from "./StudioMobileStatusBar";
import StudioDesktopNav from "./StudioDesktopNav";
import StudioMobileNav from "./StudioMobileNav";
import ContentHeader from "../ContentHeader";
//action is a component that triggers an pageAction for the page, i.e add a dancer, or create a new dance
const NoNavLayout = ({
  children,
  page = "",
  mobileHeader = "",
  pageAction = null
}) => {
  return (
    <>
      <StudioMobileStatusBar
        mobileHeader={mobileHeader}
        pageAction={pageAction}
      />
      <StudioMobileNav />
      <StudioDesktopNav />
      <main>
        <ContentHeader page={page} pageAction={pageAction} />
        {children}
      </main>
    </>
  );
};

export default NoNavLayout;
