import NoNavLayout from "../../components/Studio/NoNavLayout";
import CreateHairStyleForm from "../../components/Studio/CreateHairStyleForm";
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
      <CreateHairStyleForm />
    </NoNavLayout>
  );
};
export default CreateHairstylePage;
