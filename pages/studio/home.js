import { useQuery } from "@apollo/react-hooks";
import NoNavLayout from "../../components/Studio/NoNavLayout";
import Link from "next/link";
import styled from "styled-components";

import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Card from "../../components/styles/Card";
import { STUDIO_USER_QUERY } from "../../components/Studio/useStudio";
import RequestsNavLink from "../../components/Studio/RequestsNavLink";

const MobileDashboardLinks = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 400px;
  a {
    padding: 1rem 1rem;
    display: grid;
    place-items: center;
  }
`;
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
  if (!data.myStudio.danceClasses.length) {
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
                  <a className="btn-action-primary">
                    Configure Class Categories
                  </a>
                </Link>
              </div>
            </>
          )}
        </Card>
      </NoNavLayout>
    );
  }
  return (
    <NoNavLayout mobileHeader="Home" page="Home">
      <h2>Studio Dashboard</h2>
      <MobileDashboardLinks>
        <RequestsNavLink />
        <Link activeClassName="active" href="/studio/classes">
          <a className="btn-action-primary">Classes</a>
        </Link>
        <Link activeClassName="active" href="/studio/dancers">
          <a className="btn-action-primary">Dancers</a>
        </Link>
        <Link activeClassName="active" href="/studio/makeup">
          <a className="btn-action-primary">Makeup</a>
        </Link>
        <Link activeClassName="active" href="/studio/hairstyles">
          <a className="btn-action-primary">Hairstyles</a>
        </Link>
        <Link activeClassName="active" href="/studio/events">
          <a className="btn-action-primary">Events</a>
        </Link>
        <Link activeClassName="active" href="/studio/account">
          <a className="btn-action-primary">Account</a>
        </Link>
      </MobileDashboardLinks>
    </NoNavLayout>
  );
}

export default StudioHome;
