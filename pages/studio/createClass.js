import React from "react";
import CreateDanceClassForm from "../../components/Studio/CreateDanceClassForm";
import StudioLayout from "../../components/Studio/StudioLayout";

import { useStudio } from "../../components/Studio/useStudio";

// query studio for categories, makeupsets and dancers and pass to createclassform

const DanceClassesPage = () => {
  const studio = useStudio();

  return (
    <StudioLayout page="Create a New Class">
      <CreateDanceClassForm studio={studio} />
    </StudioLayout>
  );
};

export default DanceClassesPage;
