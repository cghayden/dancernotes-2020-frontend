import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import UpdateCustomRoutine from "../../../components/Parent/UpdateCustomRoutine";
import BackButton from "../../../components/BackButton";
import {
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS
} from "../../../components/Parent/Queries";
import Error from "../../../components/Error";
import SubNavMainLayout from "../../../components/SubNavMainLayout";

const updateDancePage = () => {
  const {
    data: parent,
    loading: loadingParent,
    error: errorLoadingParent
  } = useQuery(STUDIOS_AND_DANCERS);

  const router = useRouter();
  const { danceId } = router.query;
  const {
    data: routine,
    loading: loadingRoutine,
    error: errorloadingRoutine
  } = useQuery(CUSTOM_ROUTINE_QUERY, {
    variables: { id: danceId }
  });

  if (loadingParent || loadingRoutine) {
    return (
      <SubNavMainLayout page={"Update Your Routine"}>
        <p>Loading...</p>
      </SubNavMainLayout>
    );
  }

  if (errorLoadingParent || errorloadingRoutine) {
    return (
      <SubNavMainLayout page={"Update Your Routine"}>
        <Error error={error} />
      </SubNavMainLayout>
    );
  }

  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout
        page={"Update Your Routine"}
        action={<BackButton text={"Cancel"} />}
      >
        <UpdateCustomRoutine
          dance={routine.customRoutine}
          parent={parent.parentUser}
        />
      </SubNavMainLayout>
    </>
  );
};

export default updateDancePage;
