import React from "react";
import DancernotesInfo from "../../components/DancernotesInfo";
import SubNavMainLayout from "../../components/SubNavMainLayout";
import AccountSubNav from "../../components/Parent/AccountSubNav";
const supportPage = () => {
  return (
    <>
      <AccountSubNav />
      <SubNavMainLayout mobileHeader={"Account"} page="My Profile">
        <DancernotesInfo />
      </SubNavMainLayout>
    </>
  );
};

export default supportPage;
