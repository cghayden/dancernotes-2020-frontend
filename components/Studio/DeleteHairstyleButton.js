import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { HAIRSTYLES_QUERY } from './Queries'

const DELETE_HAIRSTYLE_MUTATION = gql`
  mutation DELETE_HAIRSTYLE_MUTATION($id: ID!) {
    deleteHairStyle(id: $id) {
      message
    }
  }
`

function DeleteHairStyleButton({ id }) {
  const [deleteHairStyle, { data, error, loading }] = useMutation(
    DELETE_HAIRSTYLE_MUTATION,
    {
      variables: { id },
      refetchQueries: [{ query: HAIRSTYLES_QUERY }],
      awaitRefetchQueries: true,
    }
  )
  return (
    <button
      type='button'
      className='btn-danger'
      onClick={() => {
        if (confirm('Are you sure you want to delete this Hair Style?')) {
          deleteHairStyle().catch((err) => alert(err.message))
        }
      }}
    >
      Delete
    </button>
  )
}

export default DeleteHairStyleButton
