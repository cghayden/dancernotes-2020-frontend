import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

const PARENT_EVENTS_QUERY = gql`
  query {
    customEvents {
      id
      name
      type
      beginDate
      endDate
      location
      address1
      address2
      city
      state
      zip
      url
      notes
      studio {
        id
        studioName
      }
      dancerIds
    }
  }
`

function useParentEvents() {
  const { data, error, loading } = useQuery(PARENT_EVENTS_QUERY)
  if (loading) return
  if (error) return { status: 'error', error }
  if (data) {
    console.log('data:', data)
    return data.customEvents
    // return data.customEvents;}
  }
  return null
}

export { useParentEvents }
