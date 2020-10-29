import React from "react";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import { useQuery } from "@apollo/react-hooks";
import StudioDanceCard from "./StudioDanceCard";
import Error from "../Error";
import Loading from "../Loading";
import styled from "styled-components";
// import { ActiveFilters } from "./ClassFilter";

const SelectedDances = styled.div`
  padding-top: 1rem;
`;

const DanceClasses = ({ classFilter }) => {
  const { data, loading, error } = useQuery(ALL_DANCE_CLASSES_QUERY);
  const allStudioDanceClasses = data ? data.allStudioDanceClasses : [];
  function compareDanceToFilter(danceClass, filter) {
    let pass = true;
    const filterCategories = Object.keys(filter);
    filterCategories.forEach((category) => {
      if (!filter[category].includes(danceClass[category])) {
        pass = false;
      }
    });
    return pass;
  }

  const filteredClasses = allStudioDanceClasses.filter((danceClass) =>
    compareDanceToFilter(danceClass, classFilter)
  );
  // const activeFilters = [].concat.apply([], Object.values(classFilter));

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <SelectedDances>
      {filteredClasses.map((dance) => (
        <StudioDanceCard key={dance.id} dance={dance} />
      ))}
    </SelectedDances>
  );
};
export default DanceClasses;
