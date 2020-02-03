import Requests from "../../components/Studio/Requests";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";

const RequestsPage = () => (
  <SubNavMainLayout mobileHeader="Requests" page="requests">
    <Requests />
  </SubNavMainLayout>
);

export default RequestsPage;
