import SubNavMainLayout from "../../../components/SubNavMainLayout";

import NotesSubNav from "../../../components/Parent/NotesSubNav";
import MakeupContent from "../../../components/Parent/MakeupContent";
function makeupPage() {
  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout page={"Makeup"}>
        <MakeupContent />
      </SubNavMainLayout>
    </>
  );
}

export default makeupPage;
