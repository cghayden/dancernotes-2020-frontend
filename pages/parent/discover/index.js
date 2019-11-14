import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import MobileNav from "../../../components/Parent/MobileNav";
import ContentLayout from "../../../components/ContentLayout";
import DesktopNav from "../../../components/Parent/DesktopNav";
import ContentHeader from "../../../components/ContentHeader";

function discoverPage() {
  return (
    <>
      <MobileStatusBar page={"Discover"} />
      <MobileNav />
      <DesktopNav />
      <ContentLayout>
        <ContentHeader page={"Discover"} />
        <main>
          <button>Find a studio!</button>
          <button>Find a convention!</button>
          <button>Find a retailer!</button>
        </main>
      </ContentLayout>
    </>
  );
}

export default discoverPage;
