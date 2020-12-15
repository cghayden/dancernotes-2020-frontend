import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import DanceClasses from '../../../components/Studio/DanceClasses'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'

export default function classesIndex() {
  //   const { showControlPanel, toggleControlPanel } = useDisplayControls()
  const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY)
  console.log('data', data)

  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Classes'}
      createLink={`/studio/classes/createClass`}
    >
      {data && (
        <DanceClasses allStudioDanceClasses={data.allStudioDanceClasses} />
      )}
    </NewStudioLayout>
  )
}
