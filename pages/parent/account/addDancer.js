import CreateDancerForm from "../../../components/Parent/CreateDancerForm";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import SubNavMainLayout from "../../../components/SubNavMainLayout";

function AddDancerPage() {
  return (
    <>
      <AccountSubNav />
      <SubNavMainLayout page="Add a Dancer">
        <CreateDancerForm />
      </SubNavMainLayout>
    </>
  );
}

export default AddDancerPage;
