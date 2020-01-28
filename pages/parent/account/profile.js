import { useQuery } from "@apollo/react-hooks";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";

import SubNavMainLayout from "../../../components/SubNavMainLayout";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import MyProfile from "../../../components/Parent/MyProfile";

const ProfilePage = () => {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  return (
    <>
      <AccountSubNav dancers={parentUser.dancers} />
      <SubNavMainLayout page={"My Account"} pageAction={"Edit button"}>
        <MyProfile user={parentUser} />
      </SubNavMainLayout>
    </>
  );
};

export default ProfilePage;
