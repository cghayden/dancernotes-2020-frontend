import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import DanceClasses from '../../../components/Studio/DanceClasses'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { useDisplayControls } from '../../../components/Parent/ParentDisplayProvider'

export default function classesIndex() {
  //   const { showControlPanel, toggleControlPanel } = useDisplayControls()
  const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY)

  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Classes'}
      createLink={`/studio/dancers/createDancer`}
    >
      {data && (
        <DanceClasses allStudioDanceClasses={data.allStudioDanceClasses} />
      )}
    </NewStudioLayout>
  )
}
