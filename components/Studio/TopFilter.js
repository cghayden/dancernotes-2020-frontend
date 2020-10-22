import styled from "styled-components";
import CategoryFilter from "../Parent/CategoryFilter";

const FilterPanelStyles = styled.div`
  padding: 1rem 1rem 100px 1rem;
  transform: ${(props) =>
    props.showControlPanel ? "translateX(0%)" : "translateX(150%)"};
  transition: all 0.4s;
  position: fixed;
  top: ${(props) => props.theme.mobileStatusBarHeight};
  margin-top: 5px;
  left: 3vw;
  width: 94vw;
  height: 75vh;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.hoveringDropdownShadow},
    ${(props) => props.theme.perimeterShadow};
  background-color: ${(props) => props.theme.gray0};
  z-index: 130;
  overflow-y: scroll;
  display: flex;
  align-items: center;

  /* buttons on large screen to trigger dropdown of hidden checkboxes */
  a,
  button {
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    position: sticky;
    border-bottom: 1px solid ${(props) => props.theme.gray3};
    padding: 1rem 1rem 1rem 1rem;
    top: 0;
    left: auto;
    height: ${(props) => props.theme.topFilterHeight};
    background-color: ${(props) => props.theme.background};
    width: 100%;
    transform: translateX(0%);
    border-radius: 0;
    box-shadow: none;
    display: flex;
    justify-content: space-evenly;
    margin-top: 0;
    overflow-y: visible;
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`;

const FilterPanelHeader = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  justify-content: space-evenly;
  padding: 0 1rem;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`;

const CloseFilterPanel = styled.button`
  display: inline-block;
  margin-left: auto;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
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
      margin: 0.25rem 0.5rem;
      background: ${(props) => props.theme.indigo7};
      color: ${(props) => props.theme.gray0};
      border-radius: 5px;
    }
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`;

const CheckboxArea = styled.div`
  padding: 1rem 0;
  display: flex;
  /* grid-row-gap: 0.5rem; */
  /* grid-template-columns: repeat(auto-fit, minmax(100px, 150px)); */
  justify-content: center;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
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
    background-color: ${(props) => props.theme.red5};
    color: ${(props) => props.theme.red0};
    margin: 0;
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`;

const NewClassFilter = ({ studio, filter, setFilter, open, closeControls }) => {
  const filterOptions = ["style", "competitiveLevel", "ageDivision", "day"];
  const days = ["Mon.", "Tue.", "Wed.", "Thur.", "Fri", "Sat.", "Sun."];
  const activeFilters = [].concat.apply([], Object.values(filter));
  const clearFilter = () => {
    setFilter({});
  };
  return (
    <FilterPanelStyles showControlPanel={open}>
      {/* <FilterPanelHeader> */}
      {/* <h2>Filters</h2> */}
      {/* <CloseFilterPanel onClick={closeControls}>Close</CloseFilterPanel> */}
      {/* <CheckboxAreaHeader>
        {Object.keys(filter).length > 0 && (
          <button onClick={clearFilter}>Clear All</button>
        )}
      </CheckboxAreaHeader> */}
      {/* </FilterPanelHeader> */}
      {/* <ActiveFilters>
        {Object.keys(filter).length > 0 && (
          <ul>
            {activeFilters.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        )}
      </ActiveFilters> */}
      {/* <CheckboxArea> */}
      {filterOptions.map((filterCategory) => {
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
      {/* </CheckboxArea> */}
    </FilterPanelStyles>
  );
};

export default NewClassFilter;
export { ActiveFilters };
