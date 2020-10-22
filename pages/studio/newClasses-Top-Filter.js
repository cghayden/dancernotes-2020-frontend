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
import TopFilter from "../../components/Studio/TopFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";

export default function newClassesPage() {
  // const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY);
  const [classFilter, setFilter] = useState({});
  const { showControlPanel, toggleControlPanel } = useDisplayControls();
  const studio = useStudio();
  return (
    <NewStudioLayout>
      {studio && (
        <div className="selectionWindow">
          <TopFilter
            studio={studio}
            filter={classFilter}
            setFilter={setFilter}
            open={showControlPanel}
            closeControls={toggleControlPanel}
          />
          <DanceClasses
            classFilter={classFilter}
            toggleControls={toggleControlPanel}
          />
        </div>
      )}
    </NewStudioLayout>
  );
}

const SelectionWindow = styled.div`
  /* padding: 2rem; */
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  /* display: grid; */
  /* justify-items: center; */
`;
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
