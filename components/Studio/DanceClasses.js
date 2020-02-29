import React from "react";

import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import { useQuery } from "@apollo/react-hooks";
import StudioDanceCard from "./StudioDanceCard";
import Error from "../Error";
import Loading from "../Loading";
import styled from "styled-components";
import { ActiveFilters } from "./ClassFilter";

const FiltersDisplay = styled.div`
  text-align: left;
  display: flex;
`;

const LargeScreenActiveFilters = styled(ActiveFilters)`
  h2 {
    font-size: 1rem;
  }
  margin-bottom: 0.5rem;
  @media (min-width: ${props => props.theme.largeScreen}) {
    h2 {
      font-size: 1.25rem;
    }
    display: block;
  }
`;

const DanceClasses = ({ classFilter, studio }) => {
  const { data, loading, error } = useQuery(ALL_DANCE_CLASSES_QUERY);
  const allStudioDanceClasses = data ? data.allStudioDanceClasses : [];
  function compareDanceToFilter(danceClass, filter) {
    let pass = true;
    const filterCategories = Object.keys(filter);
    filterCategories.forEach(category => {
      if (!filter[category].includes(danceClass[category])) {
        pass = false;
      }
    });
    return pass;
  }

  const filteredClasses = allStudioDanceClasses.filter(danceClass =>
    compareDanceToFilter(danceClass, classFilter)
  );
  const activeFilters = [].concat.apply([], Object.values(classFilter));

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <LargeScreenActiveFilters>
        {/*display a list of the active filters */}
        {Object.keys(classFilter).length > 0 && (
          <>
            <FiltersDisplay>
              <h2>Active Filters:</h2>
              <ul>
                {activeFilters.map(choice => (
                  <li key={choice}>{choice}</li>
                ))}
              </ul>
            </FiltersDisplay>
          </>
        )}
      </LargeScreenActiveFilters>
      {filteredClasses.map(dance => (
        <StudioDanceCard key={dance.id} dance={dance} />
      ))}
    </>
  );
};
export default DanceClasses;
