import SubNavMainLayout from "../../../components/SubNavMainLayout";

import NotesSubNav from "../../../components/Parent/NotesSubNav";
import HairStylesCards from "../../../components/Parent/HairStylesCards";

function makeupPage() {
  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout mobileHeader={"Notes"} page={"Hair Styles"}>
        <HairStylesCards />
      </SubNavMainLayout>
    </>
  );
}

export default makeupPage;
