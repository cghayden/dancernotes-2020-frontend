import styled from 'styled-components'

const NoteItem = styled.div`
  text-align: left;
  padding: 0.25rem 0;
  background: white;
  border-radius: 5px;
  padding: 5px;
  margin: 8px 0;
`
const Dt = styled.dt`
  font-weight: bold;
  padding: 4px;
`
const Dd = styled.dd`
  margin-left: 1rem;
  text-align: left;
  white-space: pre-wrap;
`
const Notes = styled.div`
  text-align: left;
  padding: 0.25rem 0;
  background: white;
  border-radius: 5px;
  padding: 5px;
  margin: 8px 0;
`
export { NoteItem, Dt, Dd, Notes }
