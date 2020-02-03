import NoNavLayout from "../../../components/NoNavLayout";
import Card from "../../../components/styles/Card";

function shopPage() {
  return (
    <NoNavLayout mobileHeader="Shop" page={"Shop"}>
      <Card>
        <div className="card__header">
          <h2>Coming Soon!</h2>
        </div>

        <div className="card__section">
          <p>Preferred, saved, and other local retailers.</p>
        </div>
      </Card>
    </NoNavLayout>
  );
}

export default shopPage;
