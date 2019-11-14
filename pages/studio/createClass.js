import React from "react";
import CreateDanceClassForm from "../../components/Studio/CreateDanceClassForm";
import StudioDesktopNav from "../../components/Studio/StudioDesktopNav";
import StudioMobileStatusBar from "../../components/Studio/StudioMobileStatusBar";
import StudioMobileNav from "../../components/Studio/StudioMobileNav";
import ContentLayout from "../../components/ContentLayout";
import ContentHeader from "../../components/ContentHeader";
import StudioLayout from "../../components/Studio/StudioLayout";

const DanceClassesPage = () => {
  return (
    <StudioLayout page="Create a New Class">
      <main>
        <ContentHeader page={"Create a Class"} />
        <CreateDanceClassForm />
      </main>
    </StudioLayout>
  );
};

export default DanceClassesPage;
