import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { SINGLE_ROUTINE_QUERY } from './Queries'

const DELETE_PARENT_NOTE = gql`
  mutation DELETE_PARENT_NOTE($noteId: ID!) {
    deleteParentNote(noteId: $noteId) {
      id
      note
    }
  }
`

function DeleteNote({ noteId, toggleEditNotes, danceId }) {
  const [deleteParentNote, { error, loading }] = useMutation(
    DELETE_PARENT_NOTE,
    {
      variables: { noteId },
      refetchQueries: [
        { query: SINGLE_ROUTINE_QUERY, variables: { id: danceId } },
      ],
      awaitRefetchQueries: true,
    }
  )
  return (
    <button
      type='button'
      className='btn-danger-outline btn-small'
      onClick={async () => {
        await deleteParentNote()
        toggleEditNotes(false)
      }}
    >
      Delete
    </button>
  )
}

export default DeleteNote
