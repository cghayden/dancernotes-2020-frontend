import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import BrowseStudioClasses from '../../components/Parent/BrowseStudioClasses'

import NewBrowseStudioLayout from '../../components/Parent/NewBrowseStudioLayout'
import { RegistrationContext } from '../../components/Parent/RegistrationContext'
import NoDancersBrowseStudio from '../../components/Parent/NoDancersBrowseStudio'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
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

const BrowseStudioPage = () => {
  // const [classFilter, setFilter] = useState({})
  // const { showControlPanel, toggleControlPanel } = useDisplayControls()
  const { browsingDancerId, setBrowsingDancer } = useContext(
    RegistrationContext
  )

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
  //if the parent has no dancers, there will be no dancer id.  They can see the studios offereings, but there is no student to register or query to seee if they are registered for any of the classes at that studio, so a whole new component os made that is query free, and just lists the studios classes
  if (data && !browsingDancerId) {
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
  // parent has at least one dancer - that dancer is set as the browsing dancer when linking to this page
  return (
    <NewBrowseStudioLayout
      page='Studios'
      selection={`${data.studio.studioName}`}
      studio={data.studio}
    >
      <BrowseStudioClasses
        // classFilter={classFilter}
        studio={data.studio}
        // toggleControls={toggleControlPanel}
      />
    </NewBrowseStudioLayout>
  )
}

export default BrowseStudioPage
export { BROWSE_STUDIO_CLASSES_QUERY }

// to clear all browsing dancer cookies when routing from page?
// useEffect(() => {
//   const handleRouteChange = () => {
//     setBrowsingDancer(null)
//   }

//   router.events.on('routeChangeComplete', handleRouteChange)

//   return () => {
//     router.events.off('routeChangeComplete', handleRouteChange)
//   }
// }, [])
