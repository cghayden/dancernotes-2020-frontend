import MobileStatusBar from "../../components/Parent/MobileStatusBar";
import MobileNav from "../../components/Parent/MobileNav";
import ContentLayout from "../../components/ContentLayout";
import DesktopNav from "../../components/Parent/DesktopNav";
import NotesSubNav from "../../components/Parent/NotesSubNav";
import ContentHeader from "../../components/ContentHeader";
import CreateCustomRoutineForm from "../../components/Parent/CreateCustomRoutineForm";

function makeupPage() {
  return (
    <>
      <MobileStatusBar page={"Hair Styles"} />
      <MobileNav />
      <DesktopNav />
      <ContentLayout>
        <NotesSubNav />
        <ContentHeader page={"Create Your own Routine"} />
        <main>
          <CreateCustomRoutineForm />
        </main>
      </ContentLayout>
    </>
  );
}

export default makeupPage;
