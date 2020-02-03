import React from "react";

const NotesDiv = () => {
  return (
    <>
      <Dd>
        <Dt>{!dance.custom && `Studio`} Notes:</Dt>{" "}
        <Dd>{dance.notes ? dance.notes : `N/A`}</Dd>
      </Dd>
      {!dance.parentsNotes && !addNote && (
        <button
          className="btn-action-primary-outline"
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
        <Notes>
          <Dt>My Notes:</Dt>
          <AddNote toggleAddNote={toggleAddNote} danceId={dance.id} />
        </Notes>
      )}
    </>
  );
};

export default NotesDiv;
