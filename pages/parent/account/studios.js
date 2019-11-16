import ParentLayout from "../../../components/Parent/ParentLayout";

import AccountSubNav from "../../../components/Parent/AccountSubNav";
import MyStudios from "../../../components/Parent/MyStudios";

function MyStudiosPage() {
  return (
    <ParentLayout page={"My Studios"} subnav={<AccountSubNav />}>
      <MyStudios />
    </ParentLayout>
  );
}

export default MyStudiosPage;
