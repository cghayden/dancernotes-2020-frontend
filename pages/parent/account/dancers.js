import { useQuery } from "@apollo/react-hooks";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import SubNavMainLayout from "../../../components/SubNavMainLayout";
import Dancers from "../../../components/Parent/Dancers";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";
import Link from "next/link";
function DancersPage() {
  //todo - query only the dancers of the parent
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  if (loading) return "5, 6, 7, 8...";
  if (error) return `Error! ${error.message}`;

  const AddDancerButton = (
    <Link href="addDancer">
      <a>Add a Dancer</a>
    </Link>
  );
  const hasDancers = parentUser.dancers.length > 0;
  return (
    <>
      <AccountSubNav dancers={parentUser.dancers} />
      <SubNavMainLayout pageAction={AddDancerButton} page="My Dancers">
        <Dancers hasDancers={hasDancers} dancers={parentUser.dancers} />
      </SubNavMainLayout>
    </>
  );
}

export default DancersPage;
