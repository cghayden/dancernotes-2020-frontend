import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import CreateDanceClassForm from '../../../components/Studio/CreateDanceClassForm'
import { useStudio } from '../../../components/Studio/useStudio'

// query studio for categories, makeupsets and dancers and pass to createclassform

const DanceClassesPage = () => {
  const studio = useStudio()

  return (
    <NewStudioLayout page={'Create a Class'}>
      {studio && <CreateDanceClassForm studio={studio} />}
    </NewStudioLayout>
  )
}

export default DanceClassesPage
