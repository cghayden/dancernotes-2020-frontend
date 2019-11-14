import { useQuery } from "@apollo/react-hooks";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";

import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import MobileNav from "../../../components/Parent/MobileNav";
import ContentLayout from "../../../components/ContentLayout";
import DesktopNav from "../../../components/Parent/DesktopNav";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import ContentHeader from "../../../components/ContentHeader";
import HairStylesCards from "../../../components/Parent/HairStylesCards";

function makeupPage() {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};
  return (
    <>
      <MobileStatusBar page={"Hair Styles"} />
      <MobileNav />
      <DesktopNav />
      <ContentLayout>
        <NotesSubNav dancers={loading ? [] : parentUser.dancers} />
        <ContentHeader page={"Hair Styles"} />
        <main>
          <HairStylesCards />
        </main>
      </ContentLayout>
    </>
  );
}

export default makeupPage;
