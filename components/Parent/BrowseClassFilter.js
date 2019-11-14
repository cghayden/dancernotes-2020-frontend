import React from "react";
import styled from "styled-components";
import CategoryFilter from "./CategoryFilter";
import Card from "../styles/Card";
import { ControlPanelStyles } from "../styles/ControlPanelStyles";

const FilterPanelStyles = styled(ControlPanelStyles)`
  justify-items: start;
  padding: 0.5rem;
  grid-gap: 0;
  display: block;
`;

const FilterPanelHeader = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  justify-content: space-evenly;
  padding: 0 1rem;
`;

const CloseFilterPanel = styled.button`
  display: inline-block;
  margin-left: auto;
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const ActiveFilters = styled.div`
  grid-column: 1/-1;
  display: grid;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.25rem 0;

    li {
      padding: 0.25rem 0.5rem;
      margin: 0rem 0.5rem;
      background: ${props => props.theme.indigo7};
      color: ${props => props.theme.gray0};
      border-radius: 5px;
    }
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const CheckboxArea = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
  justify-content: center;
  @media (min-width: ${props => props.theme.largeScreen}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
  }
`;

const CheckboxAreaHeader = styled.div`
  grid-column: 1/-1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  h3 {
    font-size: 1.25rem;
  }
  button {
    background-color: ${props => props.theme.red5};
    color: ${props => props.theme.red0};
    margin: 0;
  }
`;

const BrowseClassFilter = ({
  studio,
  filter,
  setFilter,
  open,
  closeControls,
}) => {
  const filterOptions = ["style", "level", "division", "day"];
  const days = ["Mon.", "Tue.", "Wed.", "Thur.", "Fri", "Sat.", "Sun."];
  const activeFilters = [].concat.apply([], Object.values(filter));
  const clearFilter = () => {
    setFilter({});
  };
  return (
    <FilterPanelStyles showControlPanel={open}>
      <FilterPanelHeader>
        <CloseFilterPanel onClick={closeControls}>Close</CloseFilterPanel>
      </FilterPanelHeader>

      <CheckboxArea>
        <CheckboxAreaHeader>
          <h3>Filter By:</h3>
          {/* show clear button if there are active filters*/}
          {Object.keys(filter).length > 0 && (
            <button onClick={clearFilter}>Clear All</button>
          )}
        </CheckboxAreaHeader>
        <ActiveFilters>
          {/*display a list of the active filters */}
          {Object.keys(filter).length > 0 && (
            <ul>
              {activeFilters.map(choice => (
                <li key={choice}>{choice}</li>
              ))}
            </ul>
          )}
        </ActiveFilters>
        {filterOptions.map(filterCategory => {
          const pluralCategory = filterCategory.concat("s");
          return (
            <CategoryFilter
              key={filterCategory}
              setFilter={setFilter}
              filter={filter}
              category={filterCategory}
              choices={filterCategory === "day" ? days : studio[pluralCategory]}
            />
          );
        })}
      </CheckboxArea>
    </FilterPanelStyles>
  );
};

export default BrowseClassFilter;
export { ActiveFilters };
