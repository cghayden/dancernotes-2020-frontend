import ParentLayout from "../../components/Parent/ParentLayout";
import { useQuery } from "@apollo/react-hooks";
import CreateCustomRoutineForm from "../../components/Parent/CreateCustomRoutineForm";
import { STUDIOS_AND_DANCERS } from "../../components/Parent/Queries";
import Error from "../../components/Error";
import BackButton from "../../components/BackButton";
function createCustomRoutinePage() {
  const { data: parent, loading, error } = useQuery(STUDIOS_AND_DANCERS);
  if (loading) return "loading";
  if (error) return <Error error={error} />;

  return (
    <ParentLayout
      page={"Create Your own Routine"}
      action={<BackButton text={"Cancel"} />}
    >
      <CreateCustomRoutineForm parent={parent.parentUser} />
    </ParentLayout>
  );
}

export default createCustomRoutinePage;
