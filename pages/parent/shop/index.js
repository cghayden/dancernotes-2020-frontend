import NoNavLayout from "../../../components/NoNavLayout";
import Card from "../../../components/styles/Card";

function shopPage() {
  return (
    <NoNavLayout mobileHeader="Shop" page={"Shop"}>
      <Card>
        <div className="card__header">
          <h2>Dancer's Edge</h2>
        </div>
        <p>306 Winthrop St Unit 3</p> <p>Taunton, MA 02780 </p>
        <p>(508) 822-0011</p>
      </Card>
      <Card>
        <div className="card__header">
          <h2>Julia's Alterations</h2>
        </div>
        <div className="card__section">
          <p>25 Wyman St.</p> <p>Stoughton, MA 02072</p>
          <p>(781) 297-9900</p>
        </div>
      </Card>
    </NoNavLayout>
  );
}

export default shopPage;
