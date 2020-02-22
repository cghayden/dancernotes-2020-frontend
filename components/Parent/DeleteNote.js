import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_Rs } from "./Queries";
// import { PARENT_NOTES_QUERY } from "./UpdateParentNotes";

const DELETE_PARENT_NOTE = gql`
  mutation DELETE_PARENT_NOTE($noteId: ID!) {
    deleteParentNote(noteId: $noteId) {
      id
      note
    }
  }
`;

function DeleteNote({ noteId, toggleEditNotes }) {
  const [deleteParentNote, { error, loading }] = useMutation(
    DELETE_PARENT_NOTE,
    {
      variables: { noteId },
      refetchQueries: [{ query: ALL_Rs }],
      awaitRefetchQueries: true
    }
  );
  return (
    <button
      type="button"
      className="btn-danger-outline btn-small"
      onClick={async () => {
        await deleteParentNote();
        toggleEditNotes(false);
      }}
    >
      Delete
    </button>
  );
}

export default DeleteNote;
