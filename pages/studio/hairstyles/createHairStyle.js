import NoFilterLayout from '../../../components/Studio/NoFilterLayout'
import CreateHairStyleForm from '../../../components/Studio/CreateHairStyleForm'

const CreateHairStylePage = () => {
  return (
    <NoFilterLayout page={'HairStyles'} selection={'Create a Hair Style'}>
      <CreateHairStyleForm />
    </NoFilterLayout>
  )
}
export default CreateHairStylePage
