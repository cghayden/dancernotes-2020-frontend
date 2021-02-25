import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'

import { ALL_DANCE_CLASSES_QUERY } from './Studio/Queries'

const DELETE_DANCECLASS_MUTATION = gql`
  mutation DELETE_DANCECLASS_MUTATION($id: ID!) {
    deleteDanceClass(id: $id) {
      message
    }
  }
`

function DeleteDanceButton({ id, children }) {
  const [deleteDanceClass, { loading, error }] = useMutation(
    DELETE_DANCECLASS_MUTATION,
    {
      variables: { id },
      refetchQueries: [{ query: ALL_DANCE_CLASSES_QUERY }],
      awaitRefetchQueries: true,
      onCompleted: () => Router.push('/studio/classes'),
    }
  )
  return (
    <button
      type='button'
      className='btn-danger'
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this Class?')) {
          //mutation is a Promise, so we can catch it
          deleteDanceClass()
        }
      }}
    >
      Delet{loading ? `ing...` : `e`}
    </button>
  )
}

export default DeleteDanceButton
