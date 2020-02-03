import NoNavLayout from "../../../components/NoNavLayout";
import Card from "../../../components/styles/Card";
function discoverPage() {
  return (
    <NoNavLayout mobileHeader="Discover" page={"Discover"}>
      <Card>
        <p>Coming Soon!</p>
        <button>Find a studio!</button>
        <button>Find a convention!</button>
        <button>Find a retailer!</button>
        <button>Watch a performance!</button>
      </Card>
    </NoNavLayout>
  );
}

export default discoverPage;
