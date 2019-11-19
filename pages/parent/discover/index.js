import ParentLayout from "../../../components/Parent/ParentLayout";
import Card from "../../../components/styles/Card";
function discoverPage() {
  return (
    <ParentLayout page={"Discover"}>
      <Card>
        <p>Coming Soon!</p>
        <button>Find a studio!</button>
        <button>Find a convention!</button>
        <button>Find a retailer!</button>
        <button>Watch a performance!</button>
      </Card>
    </ParentLayout>
  );
}

export default discoverPage;
