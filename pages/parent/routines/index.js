import { useQuery } from '@apollo/react-hooks'
import { ALL_Rs } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'

export default function routinesIndex() {
  const { data, loading, error } = useQuery(ALL_Rs)
  console.log(' routines page data', data)
  return (
    <NewParentLayout
      error={error}
      loading={loading}
      page={'Routines'}
      createLink={`/parent/routines/createRoutine`}
    >
      {data && <div>Routines List Here</div>}
    </NewParentLayout>
  )
}
