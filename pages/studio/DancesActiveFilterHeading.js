import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";

const DancesHeading = styled.div`
  background-color: ${(props) => props.theme.gray1};
  position: sticky;
  top: 0px;
  left: 0;
  display: grid;
  place-items: center;
  h2 {
    font-size: 1.5rem;
  }
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
  .clearButton {
    position: absolute;
    left: 10px;
    top: 0;
    height: 100%;
    padding: 0;
    margin: 0;
    color: ${(props) => props.theme.red5};
  }
  /* @media (min-width: ${(props) => props.theme.largeScreen}) {
    display: block;
  } */
`;

export default function DancesActiveFilterHeading({ classFilter, setFilter }) {
  function removeChoiceFromFilter(category, selection) {
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

  const clearFilter = () => {
    setFilter({});
  };
  return (
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
            <AnimateSharedLayout>
              <motion.button
                className="clearButton"
                key={"clear"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={clearFilter}
              >
                Clear All
              </motion.button>
              <motion.ul layout>
                <AnimatePresence>
                  {classFilter.competitiveLevel?.map((selection) => (
                    <motion.li
                      layout
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
              </motion.ul>
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
            </AnimateSharedLayout>
          </ActiveFilters>
        )}
      </AnimatePresence>
    </DancesHeading>
  );
}
