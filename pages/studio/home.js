import { useQuery } from "@apollo/react-hooks";
import NoNavLayout from "../../components/Studio/NoNavLayout";
import Link from "next/link";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Card from "../../components/styles/Card";
import { STUDIO_USER_QUERY } from "../../components/Studio/useStudio";

function StudioHome() {
  const { data, error, loading } = useQuery(STUDIO_USER_QUERY);
  if (loading || error) {
    return (
      <NoNavLayout mobileHeader="Home" page="Home">
        {loading && <Loading />}
        {error && <Error error={error} />}
      </NoNavLayout>
    );
  }
  return (
    <NoNavLayout mobileHeader="Home" page="Home">
      <Card>
        <p>Welcome to dancernotes!</p>

        {data.myStudio.danceClasses.length < 1 && (
          <>
            <div className="card__section">
              To begin, configure your class categories that you will use to
              create and describe your dance classes.
            </div>
            <div className="card__section">
              <Link href="configureClassCategories">
                <a className="btn-action-primary">Configure Class Categories</a>
              </Link>
            </div>
          </>
        )}
      </Card>
    </NoNavLayout>
  );
}

export default StudioHome;
