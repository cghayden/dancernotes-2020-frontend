import CreateDancerForm from "../../../components/Parent/CreateDancerForm";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import SubNavMainLayout from "../../../components/SubNavMainLayout";

function AddDancerPage() {
  return (
    <>
      <AccountSubNav />
      <SubNavMainLayout page="My Dancers">
        <CreateDancerForm />
      </SubNavMainLayout>
    </>
  );
}

export default AddDancerPage;
