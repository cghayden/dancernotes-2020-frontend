import React from "react";

import ContentHeader from "../../components/ContentHeader";
import StudioLayout from "../../components/Studio/StudioLayout";

function AccountPage() {
  return (
    <StudioLayout>
      <main>
        <ContentHeader page={"Account"} />
        <p>Account Info...</p>
      </main>
    </StudioLayout>
  );
}

export default AccountPage;
