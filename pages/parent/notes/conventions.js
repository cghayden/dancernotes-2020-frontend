import ParentLayout from "../../../components/Parent/ParentLayout";
import NotesSubNav from "../../../components/Parent/NotesSubNav";

function conventionsPage() {
  return (
    <ParentLayout page={"Conventions"} subnav={<NotesSubNav />}>
      <p>Coming Soon!</p>
    </ParentLayout>
  );
}

export default conventionsPage;
