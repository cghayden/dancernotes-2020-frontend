import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import NoNavLayout from "../../../components/Studio/NoNavLayout";
import UpdateDanceClass from "../../../components/Studio/UpdateDanceClass";

import { useStudio } from "../../../components/Studio/useStudio";

const SINGLE_DANCE_QUERY = gql`
  query SINGLE_DANCE_QUERY($id: ID!) {
    danceClass(where: { id: $id }) {
      id
      name
      style
      competitiveLevel
      ageDivision
      day
      startTime
      endTime
      shoes
      tights
      notes
      music
      musicId
      performanceName
      size
    }
  }
`;

const updateStudioClassDancePage = () => {
  const router = useRouter();
  const { classId } = router.query;
  //get Dance
  const { data, loading, error } = useQuery(SINGLE_DANCE_QUERY, {
    variables: { id: classId }
  });
  const studio = useStudio();

  if (!studio || loading || error) {
    return (
      <NoNavLayout page={"Update Your Routine"}>
        {loading && <Loading />}
        {error && <Error error={error} />}
      </NoNavLayout>
    );
  }

  return (
    <NoNavLayout mobileHeader="Update Dance Class" page={"Update Your Routine"}>
      <UpdateDanceClass studio={studio} danceClass={data.danceClass} />
    </NoNavLayout>
  );
};

export default updateStudioClassDancePage;
