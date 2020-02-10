import SubNavMainLayout from "../../components/SubNavMainLayout";
import { useQuery } from "@apollo/react-hooks";
import CreateCustomRoutineForm from "../../components/Parent/CreateCustomRoutineForm";
import { STUDIOS_AND_DANCERS } from "../../components/Parent/Queries";
import Error from "../../components/Error";
import BackButton from "../../components/BackButton";
import NotesSubNav from "../../components/Parent/NotesSubNav";
import Loading from "../../components/Loading";
function createCustomRoutinePage() {
  const { data: parent, loading, error } = useQuery(STUDIOS_AND_DANCERS);
  if (loading || error)
    return (
      <>
        <NotesSubNav />
        <SubNavMainLayout
          page={"Create Your own Routine"}
          pageAction={<BackButton text={"Cancel"} />}
          mobileHeader="Notes"
        >
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    );

  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout
        page={"Create Your own Routine"}
        pageAction={<BackButton text={"Cancel"} />}
        mobileHeader="Notes"
      >
        <CreateCustomRoutineForm parent={parent.parentUser} />
      </SubNavMainLayout>
    </>
  );
}

export default createCustomRoutinePage;
