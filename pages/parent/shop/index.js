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
          <h2>Capezio</h2>
        </div>
        <div className="card__section">
          <p>
            President's Day Sale - 30% Your entire prurchase + free shipping
          </p>
          <p>Use Code: PRES30</p>
          <a href="https://www.capezio.com/?test-birthdate=@BIRTHDATE@&dm_i=4ZOM,9KOC,2ZTJPC,10188,1">
            Visit Capezio
          </a>
        </div>
      </Card>
    </NoNavLayout>
  );
}

export default shopPage;
