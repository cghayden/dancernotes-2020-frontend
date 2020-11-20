import CreateDanceClassForm from '../../../components/Studio/CreateDanceClassForm'
import NoNavLayout from '../../../components/Studio/NoNavLayout'
import { useStudio } from '../../../components/Studio/useStudio'

// query studio for categories, makeupsets and dancers and pass to createclassform

const DanceClassesPage = () => {
  const studio = useStudio()

  return (
    <>
      <NoNavLayout
        mobileHeader='Create a Dance Class'
        page='Create a New Class'
      >
        <CreateDanceClassForm studio={studio} />
      </NoNavLayout>
    </>
  )
}

export default DanceClassesPage
