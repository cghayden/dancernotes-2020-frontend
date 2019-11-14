import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import MobileNav from "../../../components/Parent/MobileNav";
import ContentLayout from "../../../components/ContentLayout";
import DesktopNav from "../../../components/Parent/DesktopNav";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import ContentHeader from "../../../components/ContentHeader";
import MyStudios from "../../../components/Parent/MyStudios";

function MyStudiosPage() {
  return (
    <>
      <MobileStatusBar page={"Account > My Studios"} />
      <DesktopNav />
      <ContentLayout>
        <AccountSubNav />
        <ContentHeader page={"My Studios"} />
        <main>
          <MyStudios />
        </main>
      </ContentLayout>
      <MobileNav />
    </>
  );
}

export default MyStudiosPage;

{
  /* <MobileNav options={pageNavLinks} /> */
}
