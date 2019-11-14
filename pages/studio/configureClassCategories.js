import EditClassCategories from "../../components/Studio/EditClassCategories";
import StudioLayout from "../../components/Studio/StudioLayout";
import ContentHeader from "../../components/ContentHeader";

function configureClassCategoriesPage(props) {
  return (
    <StudioLayout>
      <main>
        <ContentHeader page={"Configure your class options"} />
        <EditClassCategories />
      </main>
    </StudioLayout>
  );
}

export default configureClassCategoriesPage;
