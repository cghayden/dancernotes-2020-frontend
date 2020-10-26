import React from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const ActiveFilters = styled(motion.div)`
  display: flex;
  ul {
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;

    li {
      padding: 0.25rem 1rem;
      margin: 0.25rem 0.5rem;
      background: ${(props) => props.theme.indigo7};
      color: ${(props) => props.theme.gray0};
      border-radius: 5px;
      span {
        margin-right: 1rem;
      }
      button {
        padding: 0;
        margin: 0;
      }
    }
  }
  /* @media (min-width: ${(props) => props.theme.largeScreen}) {
    display: block;
  } */
`;

const DancesSelectionWindow = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: minmax(4rem, auto) 1fr;
`;

const DancesHeading = styled.div`
  place-self: center;
  h2 {
    font-size: 1.5rem;
  }
`;

const DanceClasses = ({ classFilter, setFilter }) => {
  console.log("classFilter:", classFilter);
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

  function removeChoiceFromFilter(category, selection) {
    // const selections = [...classFilter[category]];
    const newClassFilter = { ...classFilter };
    function removeFromArray(array, item) {
      const index = array.indexOf(item);
      array.splice(index, 1);
      return array;
    }
    removeFromArray(newClassFilter[category], selection);
    if (newClassFilter[category].length === 0) {
      delete newClassFilter[category];
    }
    setFilter(newClassFilter);
  }

  return (
    <DancesSelectionWindow>
      <DancesHeading>
        <AnimatePresence exitBeforeEnter>
          {Object.keys(classFilter).length === 0 ? (
            <motion.div
              key={"heading"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2>All Classes</h2>
            </motion.div>
          ) : (
            <ActiveFilters
              key={"lists"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ul>
                <AnimatePresence>
                  {classFilter.competitiveLevel?.map((selection) => (
                    <motion.li
                      key={selection}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>{selection}</span>
                      <button
                        onClick={() =>
                          removeChoiceFromFilter("competitiveLevel", selection)
                        }
                      >
                        X
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <ul>
                <AnimatePresence>
                  {classFilter.ageDivision?.map((selection) => (
                    <motion.li
                      key={selection}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>{selection}</span>
                      <button
                        onClick={() =>
                          removeChoiceFromFilter("ageDivision", selection)
                        }
                      >
                        X
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <ul>
                <AnimatePresence>
                  {classFilter.style?.map((selection) => (
                    <motion.li
                      key={selection}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>{selection}</span>
                      <button
                        onClick={() =>
                          removeChoiceFromFilter("style", selection)
                        }
                      >
                        X
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <ul>
                <AnimatePresence>
                  {classFilter.day?.map((selection) => (
                    <motion.li
                      key={selection}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>{selection}</span>
                      <button
                        onClick={() => removeChoiceFromFilter("day", selection)}
                      >
                        X
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </ActiveFilters>
          )}
        </AnimatePresence>
      </DancesHeading>

      <SelectedDances>
        {filteredClasses.map((dance) => (
          <StudioDanceCard key={dance.id} dance={dance} />
        ))}
      </SelectedDances>
    </DancesSelectionWindow>
  );
};
export default DanceClasses;
