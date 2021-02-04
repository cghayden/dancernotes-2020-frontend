import SubNavMainLayout from "../../../components/SubNavMainLayout";
import { PARENTS_MAKEUP_QUERY } from "../../../components/Parent/Queries";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import { useQuery } from "@apollo/react-hooks";
import MakeupContent from "../../../components/Parent/MakeupContent";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

function makeupPage() {
  const { data, loading, error } = useQuery(PARENTS_MAKEUP_QUERY);
  if (error) {
    console.log("error:", error);
  }

  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout mobileHeader={"Notes"} page={"Makeup"}>
        {loading && <Loading />}
        {error && <Error error={error} />}
        {data && <MakeupContent studios={data.parentMakeup.studios} />}
      </SubNavMainLayout>
    </>
  );
}

export default makeupPage;
