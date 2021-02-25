import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import DeleteNote from './DeleteNote'
import Error from '../Error'
import { SINGLE_ROUTINE_QUERY } from './Queries'
import Form from '../styles/Form'
const EditNoteInput = styled(Form)`
  textarea {
    width: 100%;
  }
`

const UPDATE_PARENT_NOTE = gql`
  mutation UPDATE_PARENT_NOTE($noteId: ID!, $note: String!) {
    updateParentNote(noteId: $noteId, note: $note) {
      id
      note
    }
  }
`

function UpdateParentNote({ danceId, existingNote, toggleEditNotes }) {
  const [note, setNote] = useState('')
  // console.log("existingNote:", existingNote);

  const [updateParentNote, { loading, error }] = useMutation(
    UPDATE_PARENT_NOTE,
    {
      variables: {
        noteId: existingNote.id,
        note,
      },
      // refetchQueries: [
      //   { query: SINGLE_ROUTINE_QUERY, variables: { id: danceId } },
      // ],
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  // save all at once
  return (
    <EditNoteInput
      method='post'
      onSubmit={async (e) => {
        e.preventDefault()
        await updateParentNote()
        toggleEditNotes(false)
      }}
    >
      <label className='visuallyHidden' htmlFor='note'>
        My Notes:
      </label>
      <textarea
        id='note'
        type='text'
        name='note'
        rows='3'
        defaultValue={existingNote.note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className='form-footer'>
        {note && (
          <button type='submit' className='btn-action-primary btn-small'>
            Save
          </button>
        )}
        <DeleteNote
          noteId={existingNote.id}
          toggleEditNotes={toggleEditNotes}
          danceId={danceId}
        />

        <button
          type='button'
          className='btn-action-secondary-outline btn-small'
          onClick={() => toggleEditNotes(false)}
        >
          Cancel
        </button>
      </div>
    </EditNoteInput>
  )
}

export default UpdateParentNote
// export { PARENT_NOTES_QUERY };
