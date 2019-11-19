import ParentLayout from "../../../components/Parent/ParentLayout";

import NotesSubNav from "../../../components/Parent/NotesSubNav";
import MakeupContent from "../../../components/Parent/MakeupContent";
function makeupPage() {
  return (
    <ParentLayout page={"Makeup"} subnav={<NotesSubNav />}>
      <MakeupContent />
    </ParentLayout>
  );
}

export default makeupPage;
