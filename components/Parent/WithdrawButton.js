import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { DANCER_QUERY } from './Queries'
import { BROWSE_STUDIO_CLASSES_QUERY } from '../../pages/parent/browseStudio'

const WITHDRAW_FROM_CLASS = gql`
  mutation WITHDRAW_FROM_CLASS($dancerId: ID!, $danceClassId: ID!) {
    withdrawFromClass(dancerId: $dancerId, danceClassId: $danceClassId) {
      message
    }
  }
`

function WithdrawButton({ dancerId, danceClassId, studioId }) {
  const [withdrawFromClass, { error, loading }] = useMutation(
    WITHDRAW_FROM_CLASS,
    {
      variables: { dancerId, danceClassId },
      refetchQueries: [
        { query: DANCER_QUERY, variables: { id: dancerId } },
        { query: BROWSE_STUDIO_CLASSES_QUERY, variables: { id: studioId } },
      ],
    }
  )
  return (
    <button
      disabled={loading}
      className='btn-danger-textOnly btn-small '
      onClick={async () => {
        if (
          confirm(
            'Are you sure you want to withdraw from this class?  The studio will be notified and you will lose access to the notes for this class'
          )
        ) {
          await withdrawFromClass()
        }
      }}
    >
      {`Withdraw${loading ? 'ing...' : ''}`}
    </button>
  )
}
export default WithdrawButton
