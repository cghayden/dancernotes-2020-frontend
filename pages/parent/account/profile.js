import { useQuery } from "@apollo/react-hooks";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import SubNavMainLayout from "../../../components/SubNavMainLayout";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import MyProfile from "../../../components/Parent/MyProfile";

const ProfilePage = () => {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  if (loading || error)
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout mobileHeader={"Account"} page="My Profile">
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    );

  return (
    <>
      <AccountSubNav dancers={parentUser.dancers} />
      <SubNavMainLayout
        mobileHeader="Account"
        page="My Account"
        // pageAction={"Edit button"}
      >
        <MyProfile user={parentUser} />
      </SubNavMainLayout>
    </>
  );
};

export default ProfilePage;
