import { useState } from "react";
import styled from "styled-components";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import DanceClasses from "../../components/Studio/DanceClasses";
import NewClassFilter from "../../components/Studio/NewClassFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";
import DancesActiveFilterHeading from "./DancesActiveFilterHeading";
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from "../../components/Studio/NewStudioNav";
import PlusSvg from "../../components/PlusSvg";

// --------------- Styles ------------------------------

const DancesSelectionWindow = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: minmax(4rem, auto) 1fr;
  position: relative;
  grid-column: 3/11;
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

          <ul>
            <button
              className={choice === "all" ? `activeStudioNav` : null}
              onClick={() => {
                setCreateNew(false);
                setChoice("all");
              }}
            >
              All Classes
            </button>
            {studio?.danceClasses && (
              <>
                {studio.danceClasses.map((danceClass) => (
                  <button
                    className={
                      choice === danceClass.id ? `activeStudioNav` : null
                    }
                    key={danceClass.id}
                    onClick={() => {
                      setCreateNew(false);
                      setChoice({ ...danceClass });
                    }}
                  >
                    {danceClass.name}
                  </button>
                ))}
              </>
            )}
          </ul>
        </NavSection>
      </SubNav>
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
