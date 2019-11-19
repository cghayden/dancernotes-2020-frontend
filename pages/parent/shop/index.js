import ParentLayout from "../../../components/Parent/ParentLayout";
import Card from "../../../components/styles/Card";

function shopPage() {
  return (
    <ParentLayout page={"Shop"}>
      <Card>
        <div className="card__header">
          <h2>Coming Soon!</h2>
        </div>

        <div className="card__section">
          <p>Preferred, saved, and other local retailers.</p>
        </div>
      </Card>
    </ParentLayout>
  );
}

export default shopPage;
