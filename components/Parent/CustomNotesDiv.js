import React, { useState } from 'react'
import AddNote from './AddNote'
import UpdateCustomRoutineNotes from './UpdateCustomRoutineNotes'

import { Dt, Dd, Notes } from './DanceCardBody'
const CustomNotesDiv = ({ addNote, dance }) => {
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

export default CustomNotesDiv
