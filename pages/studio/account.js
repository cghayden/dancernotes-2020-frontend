import React from "react";
import StudioAccountSubNav from "../../components/Studio/StudioAccountSubNav";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";

function AccountPage() {
  return (
    <>
      <StudioAccountSubNav />
      <SubNavMainLayout mobileHeader="Account" page={"Account"}>
        <p>Account Info...</p>
      </SubNavMainLayout>
    </>
  );
}

export default AccountPage;
