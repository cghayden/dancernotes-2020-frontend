import NoNavMainLayout from "../../components/Studio/NoNavLayout";
import EnrolledDancers from "../../components/Studio/EnrolledDancers";

function EnrolledDancersPage() {
  return (
    <NoNavMainLayout mobileHeader="Dancers" page={"Enrolled Dancers"}>
      <EnrolledDancers />
    </NoNavMainLayout>
  );
}

export default EnrolledDancersPage;
