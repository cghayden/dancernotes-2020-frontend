import { useState } from 'react'
import { useMutation } from '@apollo/client'
// import gql from "graphql-tag";
import styled from 'styled-components'
// import Error from "../Error";
import { ALL_Rs } from './Queries'
import { UPDATE_CUSTOM_ROUTINE } from './UpdateCustomRoutine'
import Form from '../styles/Form'
const EditNoteInput = styled(Form)`
  textarea {
    width: 100%;
  }
`

const UpdateCustomRoutineNotes = ({
  existingNote,
  danceId,
  toggleEditNotes,
}) => {
  const [notes, setNotes] = useState()
  const [updateCustomRoutine, { loading, error }] = useMutation(
    UPDATE_CUSTOM_ROUTINE,
    {
      variables: {
        id: danceId,
        notes,
      },
      refetchQueries: [{ query: ALL_Rs }],
    }
  )
  return (
    <EditNoteInput
      method='post'
      onSubmit={async (e) => {
        e.preventDefault()
        await updateCustomRoutine()
        toggleEditNotes(false)
      }}
    >
      <label className='visuallyHidden' htmlFor='note'>
        My Notes:
      </label>
      <textarea
        id='notes'
        type='text'
        name='notes'
        rows='3'
        defaultValue={existingNote}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className='form-footer'>
        {notes && (
          <button type='submit' className='btn-action-primary'>
            Save
          </button>
        )}

        <button
          type='button'
          className='btn-action-secondary btn-small'
          onClick={() => toggleEditNotes(false)}
        >
          Cancel
        </button>
      </div>
    </EditNoteInput>
  )
}

export default UpdateCustomRoutineNotes
