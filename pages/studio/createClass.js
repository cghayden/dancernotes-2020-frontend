import React from "react";
import CreateDanceClassForm from "../../components/Studio/CreateDanceClassForm";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import ClassesSubNav from "../../components/Studio/ClassesSubNav";
import { useStudio } from "../../components/Studio/useStudio";

// query studio for categories, makeupsets and dancers and pass to createclassform

const DanceClassesPage = () => {
  const studio = useStudio();

  return (
    <>
      <ClassesSubNav />
      <SubNavMainLayout
        mobileHeader="Create a Dance Class"
        page="Create a New Class"
      >
        <CreateDanceClassForm studio={studio} />
      </SubNavMainLayout>
    </>
  );
};

export default DanceClassesPage;
