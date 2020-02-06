import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import Router from "next/router";
import CreateEventForm from "../../components/Studio/CreateEventForm";
import StudioAccountSubNav from "../../components/Studio/StudioAccountSubNav";
const CancelButton = (
  <button
    type="button"
    onClick={() =>
      Router.push({
        pathname: "/studio/events"
      })
    }
  >
    Cancel
  </button>
);

const CreateEventPage = () => {
  return (
    <>
      <StudioAccountSubNav />
      <SubNavMainLayout
        mobileHeader="Create an Event"
        page={"Add an Event"}
        pageAction={CancelButton}
      >
        <CreateEventForm />
      </SubNavMainLayout>
    </>
  );
};
export default CreateEventPage;
