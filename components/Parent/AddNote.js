import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { ALL_Rs } from './Queries'
import Form from '../styles/Form'

const AddNoteForm = styled(Form)`
  grid-column: 1/-1;
  textarea {
    margin-top: 1rem;

    width: 100%;
  }
`
const ADD_NOTE_MUTATION = gql`
  mutation ADD_NOTE_MUTATION($danceId: ID!, $note: String!) {
    addNote(danceId: $danceId, note: $note) {
      id
      note
    }
  }
`

function DanceCardFooter({ danceId, toggleAddNote }) {
  // const [showInput, toggleShowInput] = useState(false);
  const [note, setNote] = useState('')

  const [addNote, { loading, error }] = useMutation(ADD_NOTE_MUTATION, {
    variables: { danceId, note },
    refetchQueries: [{ query: ALL_Rs }],
  })

  // function updateNotes(cache, payload) {
  //   const newNote = payload.data.addNote;
  //   const data = cache.readQuery({ query: ALL_Rs });
  //   for (const dance of data.allRs) {
  //     if (dance.id === this.props.danceId) {
  //       dance.parentsNotes.push(newNote.note);
  //     }
  //   }
  //   cache.writeQuery({ query: ALL_Rs, data });
  // };

  return (
    <AddNoteForm
      method='post'
      onSubmit={async (e) => {
        e.preventDefault()
        await addNote()
        toggleAddNote(false)
      }}
    >
      <label className='visuallyHidden' htmlFor='note'>
        New Note:
      </label>
      <textarea
        id='note'
        type='text'
        name='note'
        rows='3'
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className='form-footer'>
        <button className='btn-action-primary' type='submit'>
          Save
        </button>
        <button
          type='button'
          className='btn-action-secondary'
          onClick={() => toggleAddNote(false)}
        >
          Cancel
        </button>
      </div>
    </AddNoteForm>
  )
}

export default DanceCardFooter
