import Requests from "../../components/Studio/Requests";
import ContentHeader from "../../components/ContentHeader";
import StudioLayout from "../../components/Studio/StudioLayout";

const RequestsPage = () => (
  <StudioLayout page="requests">
    <ContentHeader page={"Requests"} />
    <main>
      <Requests />
    </main>
  </StudioLayout>
);

export default RequestsPage;
