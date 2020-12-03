import NoFilterLayout from '../../../components/Studio/NoFilterLayout'
import CreateMakeupForm from '../../../components/Studio/CreateMakeupForm'

const CreateHairStylePage = () => {
  return (
    <NoFilterLayout page={'Makeup'} selection={'Create a Makeup Set'}>
      <CreateMakeupForm />
    </NoFilterLayout>
  )
}
export default CreateHairStylePage
