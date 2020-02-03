import StudioUserQuery from "../../components/Studio/StudioUserQuery";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
class StudioHome extends React.Component {
  render() {
    return (
      <StudioUserQuery>
        {({ data: { myStudio } = {}, loading, error }) => {
          if (loading || error)
            return (
              <SubNavMainLayout mobileHeader="Home" page="Home">
                {loading && <Loading />}
                {error && <Error error={error} />}
              </SubNavMainLayout>
            );

          return (
            <SubNavMainLayout mobileHeader="Home" page="Home">
              <main>
                <p>Welcome to dancernotes!</p>
                <p>Add dances to your account to create your class schedule.</p>
                <p>list of links to possible actions?</p>
              </main>
            </SubNavMainLayout>
          );
        }}
      </StudioUserQuery>
    );
  }
}

export default StudioHome;
