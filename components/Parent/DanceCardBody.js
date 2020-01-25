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
  display: flex;
  padding: 0.25rem 0;
`;

const Dt = styled.dt`
  font-weight: bold;
`;
const Dd = styled.dd`
  margin-left: 1rem;
  text-align: left;
`;
const Notes = styled.div`
  text-align: left;
  padding: 0.25rem 0;
`;
function DanceCardBody({ dance }) {
  const [addNote, toggleAddNote] = useState(false);
  const [editNotes, toggleEditNotes] = useState(false);

  return (
    <DanceCardBodyStyles>
      <dl>
        <NoteItem>
          <Dt>Shoes:</Dt> <Dd>{dance.shoes}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Tights:</Dt> <Dd>{dance.tights}</Dd>
        </NoteItem>
        <Notes>
          <Dt>Studio Notes:</Dt> <Dd>{dance.notes ? dance.notes : `N/A`}</Dd>
        </Notes>
        {!dance.parentsNotes && !addNote && (
          <button
            className="btn-action-secondary"
            onClick={() => toggleAddNote(true)}
          >
            + Note
          </button>
        )}
        {dance.parentsNotes && (
          <Notes>
            <Dt>My Notes:</Dt>
            {!editNotes && <Dd>{dance.parentsNotes.note}</Dd>}
          </Notes>
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
            <Dt>My Notes:</Dt>
            <AddNote toggleAddNote={toggleAddNote} danceId={dance.id} />
          </NoteItem>
        )}
      </dl>
      {dance.parentsNotes && !editNotes && (
        <button
          className="btn-action-secondary"
          onClick={() => toggleEditNotes(true)}
        >
          Add/Edit Notes
        </button>
      )}
    </DanceCardBodyStyles>
  );
}

export default DanceCardBody;
