import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { RegistrationContext } from "../../../components/Parent/RegistrationContext";
import SubNavMainLayout from "../../../components/SubNavMainLayout";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import { STUDIOS_AND_DANCERS } from "../../../components/Parent/Queries";
import Card from "../../../components/styles/Card";
import Error from "../../../components/Error";
import ParentUser from "../../../components/Parent/ParentUserQuery";

function MyStudiosPage() {
  const BrowsingContext = useContext(RegistrationContext);
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer;

  const { data, loading, error } = useQuery(STUDIOS_AND_DANCERS);
  console.log("data:", data);
  const studios = data && data.parentUser.studios;
  if (loading) return <p>5, 6, 7, 8...</p>;
  if (error) return <Error error={error} />;
  if (studios.length < 1) {
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout page={"My Studios"}>
          <p>
            You are not connected to any studios. When you Register your dancers
            at a studio recieve approval to subscrine to a studios information,
            the studio will apear here.
          </p>
        </SubNavMainLayout>
      </>
    );
  }
  return (
    <>
      <AccountSubNav />
      <SubNavMainLayout page={"My Studios"}>
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
