import { useState } from 'react'
import NotesDiv from './NotesDiv'
import CustomRoutineNotes from './CustomRoutineNotes'
import { NoteItem, Dt, Dd } from '../styles/CardBodyStyles'

function DanceCardBody({ dance }) {
  const [addNote, toggleAddNote] = useState(false)
  const [editNotes, toggleEditNotes] = useState(false)

  return (
    <div>
      <dl>
        <NoteItem>
          <Dt>Shoes:</Dt> <Dd>{dance.shoes}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Tights:</Dt> <Dd>{dance.tights}</Dd>
        </NoteItem>

        {!dance.custom ? (
          <NotesDiv
            addNote={addNote}
            toggleAddNote={toggleAddNote}
            editNotes={editNotes}
            toggleEditNotes={toggleEditNotes}
            dance={dance}
          />
        ) : (
          <CustomRoutineNotes dance={dance} />
        )}
      </dl>
    </div>
  )
}

export default DanceCardBody
