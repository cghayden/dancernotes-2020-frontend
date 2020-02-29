import { useState } from "react";
import Link from "next/link";
import SubNavMainControlsLayout from "../../components/Studio/SubNavMainControlsLayout";
import ClassesSubNav from "../../components/Studio/ClassesSubNav";
import DanceClasses from "../../components/Studio/DanceClasses";
import ClassFilter from "../../components/Studio/ClassFilter";
import { useStudio } from "../../components/Studio/useStudio";
import { useDisplayControls } from "../../components/Parent/ParentDisplayProvider";

const AddClassButton = (
  <Link href="createClass">
    <a>Add a Class</a>
  </Link>
);

function DanceClassesPage() {
  const [classFilter, setFilter] = useState({});
  const { showControlPanel, toggleControlPanel } = useDisplayControls();
  const studio = useStudio();
  if (!studio)
    return (
      <>
        <ClassesSubNav />
        <SubNavMainControlsLayout
          page="Classes"
          mobileHeader="Classes"
          pageAction={AddClassButton}
        >
          <p>loading...</p>
        </SubNavMainControlsLayout>
      </>
    );
  return (
    <>
      <ClassesSubNav />
      <SubNavMainControlsLayout
        page="Classes"
        mobileHeader="Classes"
        pageAction={AddClassButton}
        offscreenToggler="Filter"
      >
        <DanceClasses
          classFilter={classFilter}
          studio={studio}
          toggleControls={toggleControlPanel}
        />
        <ClassFilter
          studio={studio}
          filter={classFilter}
          setFilter={setFilter}
          open={showControlPanel}
          closeControls={toggleControlPanel}
        />
      </SubNavMainControlsLayout>
    </>
  );
}
export default DanceClassesPage;
