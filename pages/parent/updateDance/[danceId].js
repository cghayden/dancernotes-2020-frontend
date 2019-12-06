import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";

const updateDancePage = () => {
  const router = useRouter();
  const { danceId } = router.query;
  //get Dance
  //render form with prefilled values from dance
  // on change, set to state
  // on sibmit, updateCustomRoutine with state
  return <div>update Dance {danceId}</div>;
};

export default updateDancePage;
