import React from "react";

import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import { useQuery } from "@apollo/react-hooks";
import StudioDanceCard from "./StudioDanceCard";
import Error from "../Error";
import Loading from "../Loading";

const DanceClasses = () => {
  const { data, loading, error } = useQuery(ALL_DANCE_CLASSES_QUERY);
  const allStudioDanceClasses = data ? data.allStudioDanceClasses : {};
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      {allStudioDanceClasses.map(dance => (
        <StudioDanceCard key={dance.id} dance={dance} />
      ))}
    </>
  );
};
export default DanceClasses;
