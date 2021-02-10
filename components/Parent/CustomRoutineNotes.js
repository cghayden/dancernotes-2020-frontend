import { useState } from 'react'
import UpdateCustomRoutineNotes from './UpdateCustomRoutineNotes'
import { Dt, Dd, Notes } from '../styles/CardBodyStyles'

export default function CustomRoutineNotes({ addNote, dance }) {
  const [editNotes, toggleEditNotes] = useState(false)

  return (
    <>
      <Notes>
        <Dt>Notes:</Dt>
        <Dd>{dance.notes ? dance.notes : `None`}</Dd>
      </Notes>
      {!editNotes && (
        <button
          className='btn-action-primary-outline btn-small'
          onClick={() => toggleEditNotes(true)}
        >
          Add / Edit Notes
        </button>
      )}
      {editNotes && (
        <UpdateCustomRoutineNotes
          existingNote={dance.notes}
          danceId={dance.id}
          toggleEditNotes={toggleEditNotes}
        />
      )}
    </>
  )
}
