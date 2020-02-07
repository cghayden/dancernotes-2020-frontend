import NoNavLayout from "../../components/Studio/NoNavLayout";
import Router from "next/router";
import CreateMakeupForm from "../../components/Studio/CreateMakeupForm";

const CancelButton = (
  <button
    type="button"
    onClick={() =>
      Router.push({
        pathname: "/studio/makeup"
      })
    }
  >
    Cancel
  </button>
);

const CreateMakeupPage = () => {
  return (
    <NoNavLayout
      mobileHeader="Create a Makeup Set"
      page={"Add Makeup"}
      pageAction={CancelButton}
    >
      <CreateMakeupForm />
    </NoNavLayout>
  );
};
export default CreateMakeupPage;
