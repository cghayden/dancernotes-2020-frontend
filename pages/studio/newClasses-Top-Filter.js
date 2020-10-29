import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import DanceClasses from "../../components/Studio/DanceClasses";
import HeaderFilter from "../../components/Studio/HeaderFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";

const DancesSelectionWindow = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: minmax(4rem, auto) 1fr;
  position: relative;
`;

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~;
export default function newClassesPage() {
  // const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY);
  const [classFilter, setFilter] = useState({});
  const { showControlPanel, toggleControlPanel } = useDisplayControls();
  const studio = useStudio();
  return (
    <NewStudioLayout>
      <DancesSelectionWindow>
        {studio && (
          <HeaderFilter
            studio={studio}
            classFilter={classFilter}
            setFilter={setFilter}
            open={showControlPanel}
            closeControls={toggleControlPanel}
          />
        )}
        <DanceClasses
          classFilter={classFilter}
          toggleControls={toggleControlPanel}
        />
      </DancesSelectionWindow>
    </NewStudioLayout>
  );
}
