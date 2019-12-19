import React from "react";
import CreateDanceClassForm from "../../components/Studio/CreateDanceClassForm";
import StudioDesktopNav from "../../components/Studio/StudioDesktopNav";
import StudioMobileStatusBar from "../../components/Studio/StudioMobileStatusBar";
import StudioMobileNav from "../../components/Studio/StudioMobileNav";
import ContentLayout from "../../components/ContentLayout";
import ContentHeader from "../../components/ContentHeader";
import StudioLayout from "../../components/Studio/StudioLayout";

import { useStudio } from "../../components/Studio/useStudio";

// query studio for categories, makeupsets and dancers and pass to createclassform

const DanceClassesPage = () => {
  const studio = useStudio();

  return (
    <StudioLayout page="Create a New Class">
      <main>
        <ContentHeader page={"Create a Class"} />
        <CreateDanceClassForm studio={studio} />
      </main>
    </StudioLayout>
  );
};

export default DanceClassesPage;
