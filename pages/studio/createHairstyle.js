import NoNavLayout from "../../components/Studio/NoNavLayout";
import CreateHairstyleForm from "../../components/Studio/CreateHairstyleForm";
import Router from "next/router";

const CancelButton = (
  <button
    type="button"
    onClick={() =>
      Router.push({
        pathname: "/studio/hairstyles"
      })
    }
  >
    Cancel
  </button>
);

const CreateHairstylePage = () => {
  return (
    <NoNavLayout
      mobileHeader="Create a Hairstyle"
      page={"Add a Hairstyle"}
      pageAction={CancelButton}
    >
      <CreateHairstyleForm />
    </NoNavLayout>
  );
};
export default CreateHairstylePage;
