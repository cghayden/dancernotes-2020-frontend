import React from "react";
import { useRouter } from "next/router";
import ParentLayout from "../../../components/Parent/ParentLayout";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import UpdateCustomRoutine from "../../../components/Parent/UpdateCustomRoutine";

const updateDancePage = () => {
  const router = useRouter();
  const { danceId } = router.query;
  //get Dance
  //render form with prefilled values from dance
  // on change, set to state
  // on sibmit, updateCustomRoutine with state
  return (
    <ParentLayout page={"Update Your Routine"} subnav={<NotesSubNav />}>
      <UpdateCustomRoutine danceId={danceId} />
    </ParentLayout>
  );
};

export default updateDancePage;
