import React, { useState } from "react";
import styled from "styled-components";
import AddNote from "./AddNote";
import UpdateParentNotes from "./UpdateParentNotes";

const DanceCardBodyStyles = styled.div`
  padding-bottom: 1rem;
  li {
    padding: 0.25rem;
  }
`;

const NoteItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 0.25rem;
`;

// const NoteLabel = styled.dt``;
const NoteContent = styled.dd`
  margin: 0;
  padding-left: 0 0.5rem;
  text-align: left;
`;

function DanceCardBody({ dance }) {
  console.log("dance:", dance);
  const [addNote, toggleAddNote] = useState(false);
  const [editNotes, toggleEditNotes] = useState(false);

  return (
    <DanceCardBodyStyles>
      <dl>
        <NoteItem>
          <dt>Shoes:</dt> <NoteContent>{dance.shoes}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Tights:</dt> <NoteContent>{dance.tights}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Studio Notes:</dt> <NoteContent>{dance.notes}</NoteContent>
        </NoteItem>

        {!dance.parentsNotes && !addNote && (
          <button onClick={() => toggleAddNote(true)}>+ Note</button>
        )}

        {dance.parentsNotes && (
          <NoteItem>
            <dt>My Notes:</dt>
            {!editNotes && <NoteContent>{dance.parentsNotes.note}</NoteContent>}
          </NoteItem>
        )}
        {dance.parentsNotes && !editNotes && (
          <button onClick={() => toggleEditNotes(true)}>Add/Edit Notes</button>
        )}
        {editNotes && (
          <UpdateParentNotes
            existingNote={dance.parentsNotes}
            danceId={dance.id}
            toggleEditNotes={toggleEditNotes}
          />
        )}
        {addNote && (
          <NoteItem>
            <dt>My Notes:</dt>
            <AddNote toggleAddNote={toggleAddNote} danceId={dance.id} />
          </NoteItem>
        )}
      </dl>
    </DanceCardBodyStyles>
  );
}

export default DanceCardBody;
