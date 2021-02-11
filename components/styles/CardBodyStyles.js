import styled from 'styled-components'

const NoteItem = styled.div`
  display: flex;
  padding: 0.25rem 0;
`
const Dt = styled.dt`
  font-weight: bold;
`
const Dd = styled.dd`
  margin-left: 1rem;
  text-align: left;
  white-space: pre-wrap;
`
const Notes = styled.div`
  text-align: left;
  padding: 0.25rem 0;
`
export { NoteItem, Dt, Dd, Notes }
