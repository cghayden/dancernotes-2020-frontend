import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { PARENT_USER_QUERY } from '../Queries'

const REQUEST_STUDIO_ACCESS = gql`
  mutation REQUEST_STUDIO_ACCESS(
    $studioId: ID!
    $accessRequests: [ID!]!
    $parentEmail: String!
  ) {
    requestStudioAccess(
      studioId: $studioId
      accessRequests: $accessRequests
      parentEmail: $parentEmail
    ) {
      id
      accessRequests
    }
  }
`

function RequestAccessButton({ accessRequests, studioId, parentEmail }) {
  const [requestStudioAccess, { data, error, loading }] = useMutation(
    REQUEST_STUDIO_ACCESS,
    {
      refetchQueries: [{ query: PARENT_USER_QUERY }],
      onCompleted: (data) => console.log('data:', data),
    }
  )
  return (
    <button
      disabled={loading}
      className='btn-action-primary'
      onClick={async () => {
        const newAccessRequests = [...accessRequests, studioId]
        await requestStudioAccess({
          variables: {
            accessRequests: newAccessRequests,
            studioId,
            parentEmail,
          },
        })
      }}
    >
      {`Request${loading ? 'ing...' : ''} Notes`}
    </button>
  )
}
export default RequestAccessButton
