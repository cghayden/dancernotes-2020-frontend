import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import NewNavSidebarContainer from "../../components/styles/NewNavSidebarContainer";
import NavSection from "../../components/styles/NavSection";
// import SelectionWindow from "../../components/styles/SelectionWindow";
// import Dancer from "../../components/Studio/Dancer";
import { ALL_DANCE_CLASSES_QUERY } from "../../components/Studio/Queries";
import DanceClasses from "../../components/Studio/DanceClasses";
import NewClassFilter from "../../components/Studio/NewClassFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";

export default function newClassesPage() {
  const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY);
  const [choice, setChoice] = useState();
  const [classFilter, setFilter] = useState({});
  const { showControlPanel, toggleControlPanel } = useDisplayControls();
  const studio = useStudio();
  if (data) {
    return (
      <NewStudioLayout>
        {/* <NewNavSidebarContainer> */}
        {/* <NavSection> */}
        <NewClassFilter
          studio={studio}
          classFilter={classFilter}
          setFilter={setFilter}
          open={showControlPanel}
          closeControls={toggleControlPanel}
        />
        {/* </NavSection> */}
        {/* </NewNavSidebarContainer> */}

        <DanceClasses
          classFilter={classFilter}
          setFilter={setFilter}
          toggleControls={toggleControlPanel}
        />
      </NewStudioLayout>
    );
  }
  return null;
}

{
  /* <ul>
              {data.allStudioDanceClasses.map((danceClass) => (
                <button
                  className={choice === danceClass.id ? `activeStudioNav` : null}
                  key={danceClass.id}
                  onClick={() => setChoice(danceClass.id)}
                >
                  {danceClass.name}
                </button>
              ))}
            </ul> */
}
