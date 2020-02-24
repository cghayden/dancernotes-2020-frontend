import React from "react";
import StudioAccountSubNav from "../../components/Studio/StudioAccountSubNav";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import { useStudio } from "../../components/Studio/useStudio";

function AccountPage() {
  const studio = useStudio();
  if (!studio) {
    return (
      <>
        <SubNavMainLayout mobileHeader="Account" page={"Account"}>
          Loading...
        </SubNavMainLayout>
      </>
    );
  }
  return (
    <>
      <SubNavMainLayout mobileHeader="Account" page={"Account"}>
        <p>{studio.studioName}</p>
        <p>{studio.email}</p>
      </SubNavMainLayout>
    </>
  );
}

export default AccountPage;
