import StudioUserQuery from "../../components/Studio/StudioUserQuery";
import StudioLayout from "../../components/Studio/StudioLayout";

class StudioHome extends React.Component {
  render() {
    return (
      <StudioUserQuery>
        {({ data: { myStudio } = {}, loading, error }) => {
          if (loading) return <p>5,6,7,8 ...</p>;
          return (
            <StudioLayout page="Home">
              <main>
                <p>Welcome to dancernotes!</p>
                <p>Add dances to your account to create your class schedule.</p>
                <p>list of links to possible actions?</p>
              </main>
            </StudioLayout>
          );
        }}
      </StudioUserQuery>
    );
  }
}

export default StudioHome;
