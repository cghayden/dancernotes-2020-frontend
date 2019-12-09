import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import StudioLayout from "../../../components/Studio/StudioLayout";
import UpdateDanceClass from "../../../components/Studio/UpdateDanceClass";

const SINGLE_DANCE_QUERY = gql`
  query SINGLE_DANCE_QUERY($id: ID!) {
    danceClass(where: { id: $id }) {
      id
      name
      style
      level
      division
      day
      startTime
      endTime
      shoes
      tights
      notes
      music
      performanceName
      makeupSet {
        name
      }
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
  // console.log("data:", data);
  if (loading) {
    return (
      <StudioLayout page={"Update Your Routine"}>
        {loading && <p>Loading...</p>}
      </StudioLayout>
    );
  }

  if (error) {
    return (
      <StudioLayout page={"Update Your Routine"}>
        <Error error={error} />
      </StudioLayout>
    );
  }

  return (
    <StudioLayout page={"Update Your Routine"}>
      <UpdateDanceClass danceClass={data.danceClass} />
    </StudioLayout>
  );
};

export default updateStudioClassDancePage;
