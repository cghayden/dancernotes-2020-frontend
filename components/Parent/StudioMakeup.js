import Card from '../styles/NewCard'
import { NoteItem, Dt, Dd, Notes } from '../styles/NewCardBodyStyles'

const StudioMakeup = ({ studio }) => {
  if (!studio.makeupSets.length) {
    return (
      <Card>
        <h2>Makeup Sets for {studio.studioName}</h2>
        <div>
          <p>None</p>
        </div>
      </Card>
    )
  }
  return (
    <>
      <h2>Makeup Sets for {studio.studioName}</h2>
      <Card>
        {studio.makeupSets.map((makeupSet) => (
          <div key={makeupSet.id}>
            <h3>{makeupSet.name}</h3>
            <dl>
              <NoteItem>
                <Dt>Lipstick:</Dt> <Dd>{makeupSet.lipstick}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Shadow:</Dt> <Dd>{makeupSet.eyeShadow}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Lids:</Dt> <Dd>{makeupSet.eyeLids}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Crease:</Dt> <Dd>{makeupSet.eyeCrease}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Liner:</Dt> <Dd>{makeupSet.eyeLiner}</Dd>
              </NoteItem>
              <Notes>
                <Dt>Eyelashes:</Dt> <Dd>{makeupSet.eyelashes}</Dd>
              </Notes>
              {makeupSet.eyeNotes && (
                <NoteItem>
                  <Dt>Eyelashes:</Dt> <Dd>{makeupSet.eyeNotes}</Dd>
                </NoteItem>
              )}
              <NoteItem>
                <Dt>Foundation:</Dt> <Dd>{makeupSet.foundation}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Powder:</Dt> <Dd>{makeupSet.powder}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Blush:</Dt> <Dd>{makeupSet.blush}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Bronzer:</Dt> <Dd>{makeupSet.bronzer}</Dd>
              </NoteItem>
              <Notes>
                <Dt>Notes:</Dt> <Dd>{makeupSet.notes}</Dd>
              </Notes>
            </dl>
          </div>
        ))}
      </Card>
    </>
  )
}

export default StudioMakeup
