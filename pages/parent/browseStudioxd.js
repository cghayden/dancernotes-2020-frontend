import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import NoDancersBrowseStudio from '../../components/Parent/NoDancersBrowseStudio'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import NewBrowseStudioLayout from '../../components/Parent/NewBrowseStudioLayout'
import ParentNoFilterLayout from '../../components/Parent/ParentNoFilterLayout'

const BROWSE_STUDIO_CLASSES_QUERY = gql`
  query BROWSE_STUDIO_CLASSES_QUERY($id: ID!) {
    studio(id: $id) {
      id
      studioName
      competitiveLevels
      styles
      ageDivisions
      danceClasses {
        id
        name
        day
        startTime
        endTime
        style
        competitiveLevel
        ageDivision
        size
        dancers {
          firstName
          id
        }
      }
    }
  }
`

const BrowseStudioPageNoDancers = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(BROWSE_STUDIO_CLASSES_QUERY, {
    variables: { id: router.query.studioId },
  })

  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Studios'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }

  return (
    <NewBrowseStudioLayout
      page='Studios'
      selection={`${data.studio.studioName}`}
      studio={data.studio}
    >
      <NoDancersBrowseStudio studio={data.studio} />
    </NewBrowseStudioLayout>
  )
}

export default BrowseStudioPageNoDancers
