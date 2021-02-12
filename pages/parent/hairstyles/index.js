import { useQuery } from '@apollo/react-hooks'
import { HAIRSTYLES_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import HairStylesCards from '../../../components/Parent/HairStylesCards'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

export default function hairStylesIndex() {
  const { data, loading, error } = useQuery(HAIRSTYLES_QUERY)

  const parentHairstyles = data ? data.parentHairstyles : []
  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Hairstyles'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }
  return (
    <NewParentLayout
      page={'Hairstyles'}
      createLink={`/parent/hairstyles/createHairstyle`}
    >
      <HairStylesCards hairstyles={parentHairstyles} />
    </NewParentLayout>
  )
}
