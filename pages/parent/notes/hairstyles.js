import ParentLayout from "../../../components/Parent/ParentLayout";

import NotesSubNav from "../../../components/Parent/NotesSubNav";
import HairStylesCards from "../../../components/Parent/HairStylesCards";

function makeupPage() {
  return (
    <ParentLayout page={"Hair Styles"} subnav={<NotesSubNav />}>
      <HairStylesCards />
    </ParentLayout>
  );
}

export default makeupPage;
