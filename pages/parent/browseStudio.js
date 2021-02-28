import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import BrowseStudioClasses from '../../components/Parent/BrowseStudioClasses'
import NewBrowseStudioLayout from '../../components/Parent/NewBrowseStudioLayout'
import { useRegistrationContext } from '../../components/Parent/RegistrationContext'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import ParentNoFilterLayout from '../../components/Parent/ParentNoFilterLayout'
import { useEffect } from 'react'
import { DANCER_QUERY } from '../../components/Parent/Queries'

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

const BrowseStudioPage = () => {
  useEffect(() => {
    const id = Cookies.get('browsingDancerId')
    console.log('useEffect running', id)
    setBrowsingDancer(id)
  })

  const { browsingDancerId, setBrowsingDancer } = useRegistrationContext()
  console.log('browsingDancerId', browsingDancerId)

  const router = useRouter()
  const { data, loading, error } = useQuery(BROWSE_STUDIO_CLASSES_QUERY, {
    variables: { id: router.query.studioId },
  })
  const {
    data: dancerData,
    loading: loadingDancer,
    error: errorLoadingDancer,
  } = useQuery(DANCER_QUERY, {
    variables: { id: browsingDancerId },
  })
  console.log('dancer data:', dancerData)

  if (error || errorLoadingDancer || loading || loadingDancer) {
    return (
      <ParentNoFilterLayout page={'Studios'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }

  // parent has at least one dancer - that dancer is set as the browsing dancer when linking to this page
  if (!dancerData) {
    return (
      <ParentNoFilterLayout page={'Studios'}>
        <div>Loading Dancer...</div>
      </ParentNoFilterLayout>
    )
  }
  console.log('theres a dancer')
  return (
    <NewBrowseStudioLayout
      page='Studios'
      selection={`${data.studio.studioName}`}
      studio={data.studio}
    >
      {dancerData && (
        <BrowseStudioClasses dancer={dancerData.dancer} studio={data.studio} />
      )}
    </NewBrowseStudioLayout>
  )
}

export default BrowseStudioPage
export { BROWSE_STUDIO_CLASSES_QUERY }
