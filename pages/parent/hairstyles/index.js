import { useQuery } from '@apollo/react-hooks'
import { HAIRSTYLES_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import HairStylesCards from '../../../components/Parent/HairStylesCards'

export default function hairStylesIndex() {
  const { data, loading, error } = useQuery(HAIRSTYLES_QUERY)
  console.log('data', data)

  const parentHairstyles = data ? data.parentHairstyles : []

  return (
    <NewParentLayout
      error={error}
      loading={loading}
      page={'Hairstyles'}
      createLink={`/parent/hairstyles/createHairstyle`}
    >
      {!error && !loading && <HairStylesCards hairstyles={parentHairstyles} />}
    </NewParentLayout>
  )
}
