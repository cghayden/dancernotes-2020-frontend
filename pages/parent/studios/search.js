import { useQuery } from '@apollo/client'
import { STUDIOS_AND_DANCERS } from '../../../components/Parent/Queries'
import Card from '../../../components/styles/Card'
import SearchForStudio from '../../../components/Parent/SearchForStudio'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

export default function searchStudioPage() {
  const { data, loading, error } = useQuery(STUDIOS_AND_DANCERS)
  if (error || loading) {
    return (
      <ParentNoFilterLayout>
        <Error error={error} />
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }

  return (
    <ParentNoFilterLayout page={'Search Studios'}>
      <Card>
        <h2>Search for a Studio</h2>
        <SearchForStudio
          dancerId={
            data.parentUser.dancers ? data.parentUser.dancers[0].id : 'null'
          }
        />
      </Card>
    </ParentNoFilterLayout>
  )
}
