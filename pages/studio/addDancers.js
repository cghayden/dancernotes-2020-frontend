import AddDancers from "../../components/Studio/AddDancers";
import StudioDesktopNav from "../../components/Studio/StudioDesktopNav";
import StudioMobileStatusBar from "../../components/Studio/StudioMobileStatusBar";
import StudioMobileNav from "../../components/Studio/StudioMobileNav";
import ContentLayout from "../../components/ContentLayout";
import ContentHeader from "../../components/ContentHeader";

const AddDancersPage = props => (
  <div>
    <StudioDesktopNav />
    <StudioMobileStatusBar />
    <StudioMobileNav />
    <ContentLayout>
      <ContentHeader page={"Add Dancers to Class"} />{" "}
      <main>
        <AddDancers id={props.query.id} />
      </main>
    </ContentLayout>
  </div>
);
export default AddDancersPage;
