import { useState } from "react";
import styled from "styled-components";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import DanceClasses from "../../components/Studio/DanceClasses";
import NewClassFilter from "../../components/Studio/NewClassFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";
import DancesActiveFilterHeading from "./DancesActiveFilterHeading";

// --------------- Styles ------------------------------

const DancesSelectionWindow = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: minmax(4rem, auto) 1fr;
  position: relative;
  grid-column: 1/10;
`;

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~

export default function newClassesPage() {
  const [classFilter, setFilter] = useState({});
  const { showControlPanel, toggleControlPanel } = useDisplayControls();
  const studio = useStudio();
  return (
    <NewStudioLayout>
      <DancesSelectionWindow>
        <DancesActiveFilterHeading
          classFilter={classFilter}
          setFilter={setFilter}
        />
        <DanceClasses
          classFilter={classFilter}
          toggleControls={toggleControlPanel}
        />
      </DancesSelectionWindow>
      {studio && (
        <NewClassFilter
          studio={studio}
          classFilter={classFilter}
          setFilter={setFilter}
          open={showControlPanel}
          closeControls={toggleControlPanel}
        />
      )}
    </NewStudioLayout>
  );
}
