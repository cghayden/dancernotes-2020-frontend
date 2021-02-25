import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const PARENT_NOTES_QUERY = gql`
  query PARENT_NOTES_QUERY($danceId: ID!) {
    parentNotes(danceId: $danceId) {
      note
      id
    }
  }
`

export default function ParentNotes({ danceId }) {
  const { data, error, loading } = useQuery(PARENT_NOTES_QUERY, {
    variables: { danceId },
  })
  return (
    <>
      <h5>My Notes</h5>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading your notes.</p>}
      {data?.parentNotes &&
        parentNotes.map((note) => <p key={note.id}>{note.note}</p>)}
    </>
  )
}
