import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import DeleteNote from "./DeleteNote";
import Error from "../Error";
import { ALL_Rs } from "./Queries";
import Form from "../styles/Form";
const EditNoteInput = styled(Form)`
  textarea {
    width: 100%;
  }
`;

// const PARENT_NOTES_QUERY = gql`
//   query PARENT_NOTES_QUERY($danceId: ID!) {
//     parentNotes(danceId: $danceId) {
//       note
//       id
//     }
//   }
// `;
const UPDATE_PARENT_NOTE = gql`
  mutation UPDATE_PARENT_NOTE($noteId: ID!, $note: String!) {
    updateParentNote(noteId: $noteId, note: $note) {
      id
      note
    }
  }
`;

function UpdateParentNote({ danceId, existingNote, toggleEditNotes }) {
  const [note, setNote] = useState("");
  // const { data, loading, error } = useQuery(PARENT_NOTES_QUERY, {
  //   variables: { danceId }
  // });

  // const existingNote = data ? data.parentNotes : {};
  // console.log("existingNote:", existingNote);

  const [updateParentNote, { loading, error }] = useMutation(
    UPDATE_PARENT_NOTE,
    {
      variables: {
        noteId: existingNote.id,
        note
      },
      refetchQueries: [{ query: ALL_Rs }]
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  // save all at once
  return (
    <EditNoteInput
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await updateParentNote();
        toggleEditNotes(false);
      }}
    >
      <label className="visuallyHidden" htmlFor="note">
        My Notes:
      </label>
      <textarea
        id="note"
        type="text"
        name="note"
        rows="3"
        defaultValue={existingNote.note}
        onChange={e => setNote(e.target.value)}
      />
      <div className="form-footer">
        {note && (
          <button type="submit" className="btn-action-primary">
            Save
          </button>
        )}
        <DeleteNote
          noteId={existingNote.id}
          danceId={danceId}
          toggleEditNotes={toggleEditNotes}
          // refetchQuery={PARENT_NOTES_QUERY}
        />

        <button
          type="button"
          className="btn-action-secondary-outline"
          onClick={() => toggleEditNotes(false)}
        >
          Cancel
        </button>
      </div>
    </EditNoteInput>
  );
}

export default UpdateParentNote;
// export { PARENT_NOTES_QUERY };
