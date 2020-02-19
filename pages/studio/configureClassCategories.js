import NoNavLayout from "../../components/Studio/NoNavLayout";
import EditClassCategories from "../../components/Studio/EditClassCategories";

function configureClassCategoriesPage() {
  return (
    <>
      <NoNavLayout
        mobileHeader="Configure Class Option"
        page="Configure class options"
      >
        <EditClassCategories />
      </NoNavLayout>
    </>
  );
}

export default configureClassCategoriesPage;
