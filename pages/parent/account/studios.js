import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { RegistrationContext } from "../../../components/Parent/RegistrationContext";
import SubNavMainLayout from "../../../components/SubNavMainLayout";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import { STUDIOS_AND_DANCERS } from "../../../components/Parent/Queries";
import Card from "../../../components/styles/Card";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import ParentUser from "../../../components/Parent/ParentUserQuery";

function MyStudiosPage() {
  const BrowsingContext = useContext(RegistrationContext);
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer;

  const { data, loading, error } = useQuery(STUDIOS_AND_DANCERS);
  const studios = data && data.parentUser.studios;
  console.log("studios:", studios);

  if (loading || error)
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout mobileHeader={"Account"} page="My Studios">
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    );

  if (studios.length < 1) {
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout mobileHeader={"Account"} page={"My Studios"}>
          <Card>
            <p>
              You're dancers are not enrolled at or subscribed to any studios.
            </p>
          </Card>
        </SubNavMainLayout>
      </>
    );
  }
  return (
    <>
      <AccountSubNav />
      <SubNavMainLayout mobileHeader={"Account"} page={"My Studios"}>
        {studios.map(studio => (
          <Card key={studio.id}>
            <h2>{studio.studioName}</h2>
            <Link href={`/parent/account/browseStudio?studioId=${studio.id}`}>
              <button
                className="btn-action-primary"
                onClick={() => setBrowsingDancer(data.parentUser.dancers[0].id)}
              >
                Browse Classes at {studio.studioName}
              </button>
            </Link>
          </Card>
        ))}
      </SubNavMainLayout>
    </>
  );
}

export default MyStudiosPage;
