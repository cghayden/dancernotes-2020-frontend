import AddNote from './AddNote'
import UpdateParentNotes from './UpdateParentNotes'
import { Dt, Dd, Notes } from '../styles/CardBodyStyles'

const NotesDiv = ({
  addNote,
  toggleAddNote,
  editNotes,
  toggleEditNotes,
  dance,
}) => {
  return (
    <>
      <Notes>
        <Dt>{!dance.custom && `Studio`} Notes:</Dt>
        <Dd>{dance.notes ? dance.notes : `N/A`}</Dd>
      </Notes>
      {!dance.parentsNotes && !addNote && (
        <button
          className='btn-action-primary-outline'
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

      {dance.parentsNotes && editNotes && (
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
      <div className='card__section'>
        {dance.parentsNotes && !editNotes && (
          <button
            className='btn-action-primary-outline btn-small'
            onClick={() => toggleEditNotes(true)}
          >
            Add/Edit Notes
          </button>
        )}
      </div>
    </>
  )
}

export default NotesDiv
