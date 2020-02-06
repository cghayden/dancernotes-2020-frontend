import { useQuery } from "@apollo/react-hooks";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import Link from "next/link";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Card from "../../components/styles/Card";
import { STUDIO_USER_QUERY } from "../../components/Studio/useStudio";

function StudioHome() {
  const { data, error, loading } = useQuery(STUDIO_USER_QUERY);
  if (loading || error) {
    return (
      <SubNavMainLayout mobileHeader="Home" page="Home">
        {loading && <Loading />}
        {error && <Error error={error} />}
      </SubNavMainLayout>
    );
  }
  return (
    <SubNavMainLayout mobileHeader="Home" page="Home">
      <Card>
        <p>Welcome to dancernotes!</p>

        {/* <p>Add dances to your account to create your class schedule.</p> */}
        {data.myStudio.danceClasses.length < 1 && (
          <>
            To begin, configure your class categories that you will use to
            create and describe your dance classes.
            <Link href="configureClassCategories">
              <a></a>
            </Link>
          </>
        )}
      </Card>
    </SubNavMainLayout>
  );
}

export default StudioHome;
