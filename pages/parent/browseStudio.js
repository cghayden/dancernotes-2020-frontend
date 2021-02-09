import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import BrowseStudioClasses from '../../components/Parent/BrowseStudioClasses'

// import { useDisplayControls } from '../../../components/Parent/ParentDisplayProvider'
import NewBrowseStudioLayout from '../../components/Parent/NewBrowseStudioLayout'

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

  const router = useRouter()
  const { data: studioData, loading: loading, error: error } = useQuery(
    BROWSE_STUDIO_CLASSES_QUERY,
    {
      variables: { id: router.query.studioId },
    }
  )
  const studio = studioData ? studioData.studio : {}

  return (
    <NewBrowseStudioLayout
      error={error}
      loading={loading}
      page={`Classes at ${studio.studioName}`}
      studio={studio}
    >
      {!error && !loading && (
        <>
          <BrowseStudioClasses
            // classFilter={classFilter}
            studio={studio}
            // toggleControls={toggleControlPanel}
          />
        </>
      )}
    </NewBrowseStudioLayout>
  )
}

export default BrowseStudioPage
export { BROWSE_STUDIO_CLASSES_QUERY }
