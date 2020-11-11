import { useState } from "react";
import styled from "styled-components";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import DanceClasses from "../../components/Studio/DanceClasses";
import NewClassFilter from "../../components/Studio/NewClassFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";
import DancesActiveFilterHeading from "./DancesActiveFilterHeading";
import {
  NavSection,
  NavSectionHeading,
  SubNav,
} from "../../components/Studio/NewStudioNav";
import PlusSvg from "../../components/PlusSvg";

// --------------- Styles ------------------------------

const DancesSelectionWindow = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: minmax(4rem, auto) 1fr;
  position: relative;
  grid-column: 5/-1;
`;

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~

export default function newClassesPage() {
  const [classFilter, setFilter] = useState({});
  const [choice, setChoice] = useState("all");
  const [createNew, setCreateNew] = useState(false);
  const { showControlPanel, toggleControlPanel } = useDisplayControls();
  const studio = useStudio();
  return (
    <NewStudioLayout>
      <SubNav>
        <NavSection>
          <NavSectionHeading>
            <h2>Dance Classes</h2>
            <button
              onClick={() => {
                setChoice(null);
                setCreateNew(true);
              }}
            >
              <PlusSvg />
            </button>
          </NavSectionHeading>
          {studio && (
            <NewClassFilter
              studio={studio}
              classFilter={classFilter}
              setFilter={setFilter}
              open={showControlPanel}
              closeControls={toggleControlPanel}
            />
          )}
        </NavSection>
      </SubNav>
      <div className="scrollingWindow">
        <DancesActiveFilterHeading
          classFilter={classFilter}
          setFilter={setFilter}
        />
        <DanceClasses
          classFilter={classFilter}
          toggleControls={toggleControlPanel}
        />
      </div>
    </NewStudioLayout>
  );
}
