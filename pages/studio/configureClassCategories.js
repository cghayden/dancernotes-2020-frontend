import EditClassCategories from '../../components/Studio/EditClassCategories'
import NoFilterLayout from '../../components/Studio/NoFilterLayout'

function configureClassCategoriesPage() {
  return (
    <NoFilterLayout page={'Configure Class Categories'}>
      <EditClassCategories />
    </NoFilterLayout>
  )
}

export default configureClassCategoriesPage
