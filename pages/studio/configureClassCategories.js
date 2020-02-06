import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import ClassesSubNav from "../../components/Studio/ClassesSubNav";
import EditClassCategories from "../../components/Studio/EditClassCategories";

function configureClassCategoriesPage() {
  return (
    <>
      <ClassesSubNav />
      <SubNavMainLayout
        mobileHeader="Configure Class Option"
        page="Configure class options"
      >
        <EditClassCategories />
      </SubNavMainLayout>
    </>
  );
}

export default configureClassCategoriesPage;
