import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

import ParentLayout from "../../../components/Parent/ParentLayout";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import UpdateCustomRoutine from "../../../components/Parent/UpdateCustomRoutine";
import BackButton from "../../../components/BackButton";
import { CUSTOM_ROUTINE_QUERY } from "../../../components/Parent/Queries";
import Error from "../../../components/Error";

const updateDancePage = () => {
  const router = useRouter();
  const { danceId } = router.query;
  const { data, loading, error } = useQuery(CUSTOM_ROUTINE_QUERY, {
    variables: { id: danceId }
  });
  //get Dance
  //render form with prefilled values from dance
  // on change, set to state
  // on submit, updateCustomRoutine with state
  return (
    <ParentLayout
      page={"Update Your Routine"}
      action={<BackButton text={"Cancel"} />}
      subnav={<NotesSubNav />}
    >
      {loading && <div>5, 6, 7, 8 ...</div>}
      {error && <Error error={error} />}
      {data && <UpdateCustomRoutine dance={data.customRoutine} />}
    </ParentLayout>
  );
};

export default updateDancePage;
