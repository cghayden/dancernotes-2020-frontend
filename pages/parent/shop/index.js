import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import MobileNav from "../../../components/Parent/MobileNav";
import ContentLayout from "../../../components/ContentLayout";
import DesktopNav from "../../../components/Parent/DesktopNav";

function shopPage() {
  return (
    <>
      <MobileStatusBar page={"Shop"} />
      <MobileNav />
      <DesktopNav />
      <ContentLayout>
        <main>
          <p>links to local or saved retailers?</p>
          <p>ads from retailers tailored to apparel needs</p>
        </main>
      </ContentLayout>
    </>
  );
}

export default shopPage;
