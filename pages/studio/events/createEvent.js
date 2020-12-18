import NoFilterLayout from '../../../components/Studio/NoFilterLayout'
import CreateEventForm from '../../../components/Studio/CreateEventForm'

const CreateEventPage = () => {
  return (
    <NoFilterLayout page={'Events'} selection={'Create an Event'}>
      <CreateEventForm />
    </NoFilterLayout>
  )
}
export default CreateEventPage
