import { useState } from 'react'
import NotesDiv from './NotesDiv'
import CustomRoutineNotes from './CustomRoutineNotes'
import { NoteItem, Dt, Dd } from '../styles/CardBodyStyles'
import styled from 'styled-components'

const DanceCardBodyStyles = styled.div`
  /* background: ${(props) => props.theme.gray2}; */
`

function DanceCardBody({ dance }) {
  const [addNote, toggleAddNote] = useState(false)
  const [editNotes, toggleEditNotes] = useState(false)

  return (
    <DanceCardBodyStyles>
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
    </DanceCardBodyStyles>
  )
}

export default DanceCardBody
