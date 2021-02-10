import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'

import { DELETE_CLOUDINARY_ASSET } from '../Mutations'
import { ALL_Rs } from './Queries'

const DELETE_CUSTOM_ROUTINE = gql`
  mutation DELETE_CUSTOM_ROUTINE($id: ID!, $musicId: String) {
    deleteCustomRoutine(id: $id, musicId: $musicId) {
      message
    }
  }
`

function DeleteCustomRoutineButton({ id, musicId }) {
  const [deleteCustomRoutine, { loading, error }] = useMutation(
    DELETE_CUSTOM_ROUTINE,
    {
      variables: { id, musicId },
      refetchQueries: [{ query: ALL_Rs }],
      awaitRefetchQueries: true,
      onCompleted: () => Router.push('/parent/routines'),
    }
  )
  return (
    <button
      type='button'
      className='btn-danger'
      disabled={loading}
      onClick={async () => {
        if (confirm('Are you sure you want to delete this Class?')) {
          await deleteCustomRoutine()
        }
      }}
    >
      Delet{loading ? `ing...` : `e`}
    </button>
  )
}

export default DeleteCustomRoutineButton
