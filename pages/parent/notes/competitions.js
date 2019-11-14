import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import MobileNav from "../../../components/Parent/MobileNav";
import ContentLayout from "../../../components/ContentLayout";
import DesktopNav from "../../../components/Parent/DesktopNav";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import ContentHeader from "../../../components/ContentHeader";
import Competitions from "../../../components/Parent/Competitions";
import { useQuery } from "@apollo/react-hooks";
import { PARENTS_EVENTS_QUERY } from "../../../components/Parent/Queries";

function CompetitionsPage() {
  // const { data, loading, error } = useQuery(PARENTS_EVENTS_QUERY);
  // const parentUser = data ? data.parentUser : null;
  // const events = [];
  // parentUser &&
  //   parentUser.dancers.forEach(dancer =>
  //     dancer.studios.forEach(studio => events.push(studio.events)),
  //   );
  // const flatEvents = events.flat();
  // console.log("flatEvents:", flatEvents);

  return (
    <>
      <MobileStatusBar page={"Competitions"} />
      <MobileNav />
      <DesktopNav />
      <ContentLayout>
        <NotesSubNav />
        <main>
          <ContentHeader page={"Competitions"} />
          <Competitions />
        </main>
      </ContentLayout>
    </>
  );
}

export default CompetitionsPage;
