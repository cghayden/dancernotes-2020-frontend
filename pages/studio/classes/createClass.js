import NoFilterLayout from '../../../components/Studio/NoFilterLayout'
import CreateDanceClassForm from '../../../components/Studio/CreateDanceClassForm'
import { useStudio } from '../../../components/Studio/useStudio'

// query studio for categories, makeupsets and dancers and pass to createclassform

const DanceClassesPage = () => {
  const studio = useStudio()

  return (
    <NoFilterLayout page={'Classes'} selection={'Create a Class'}>
      {studio && <CreateDanceClassForm studio={studio} />}
    </NoFilterLayout>
  )
}

export default DanceClassesPage
