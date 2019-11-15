import Link from "next/link";
import ParentLayout from "../../components/Parent/ParentLayout";
import Router from "next/router";
import CreateCustomRoutineForm from "../../components/Parent/CreateCustomRoutineForm";

function createCustomRoutinePage() {
  const cancelButton = <button onClick={() => Router.back()}>Back</button>;
  return (
    <ParentLayout page={"Create Your own Routine"} action={cancelButton}>
      <CreateCustomRoutineForm />
    </ParentLayout>
  );
}

export default createCustomRoutinePage;
