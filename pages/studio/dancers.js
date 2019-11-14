import StudioLayout from "../../components/Studio/StudioLayout";
import ContentHeader from "../../components/ContentHeader";
import EnrolledDancers from "../../components/Studio/EnrolledDancers";

function EnrolledDancersPage() {
  return (
    <StudioLayout>
      <main>
        <ContentHeader page={"Enrolled Dancers"} />
        <EnrolledDancers />
      </main>
    </StudioLayout>
  );
}

export default EnrolledDancersPage;
