import { useQuery } from "@apollo/react-hooks";
import { PARENTS_EVENTS_QUERY } from "../../../components/Parent/Queries";
import ParentLayout from "../../../components/Parent/ParentLayout";
import NotesSubNav from "../../../components/Parent/NotesSubNav";

function RecitalPage() {
  return (
    <ParentLayout page={"Recital"} subnav={<NotesSubNav />}>
      <p>Coming Soon!</p>
    </ParentLayout>
  );
}

export default RehearsalsPage;
