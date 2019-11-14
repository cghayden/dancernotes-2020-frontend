import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { STUDIO_ALL_DANCERS_QUERY } from "./Queries";
import StudioDancerCard from "./StudioDancerCard";
import Error from "../Error";

const EnrolledDancers = () => {
  const { data, loading, error } = useQuery(STUDIO_ALL_DANCERS_QUERY);
  const studioDancers = data ? data.studioDancers : {};
  if (loading) return <p>5,6,7,8 ...</p>;
  if (error) return <Error error={error} />;
  return (
    <>
      {studioDancers.map(dancer => (
        <StudioDancerCard key={dancer.id} dancer={dancer} />
      ))}
    </>
  );
};
export default EnrolledDancers;
