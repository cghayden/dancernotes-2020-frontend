import { useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import SubNavMainLayout from "../../../components/SubNavMainLayout";
import Dancers from "../../../components/Parent/Dancers";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";
import Link from "next/link";
function DancersPage() {
  //todo - query only the dancers of the parent
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};
  const hasDancers = parentUser.dancers && parentUser.dancers.length > 0;

  const AddDancerButton = (
    <Link href="addDancer">
      <a className="btn-action-primary-textOnly">Add a Dancer</a>
    </Link>
  );

  if (loading || error)
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout
          mobileHeader={"Account"}
          pageAction={AddDancerButton}
          page="My Dancers"
        >
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    );

  if (!hasDancers) {
    Router.push({
      pathname: "/parent/account/addDancer",
      query: {
        hasDancers: false
      }
    });
  }
  return (
    <>
      <AccountSubNav dancers={parentUser.dancers} />
      <SubNavMainLayout
        mobileHeader={"Account"}
        pageAction={AddDancerButton}
        page="My Dancers"
      >
        <Dancers hasDancers={hasDancers} dancers={parentUser.dancers} />
      </SubNavMainLayout>
    </>
  );
}

export default DancersPage;
