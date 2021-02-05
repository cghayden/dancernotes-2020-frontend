import styled from 'styled-components'
import Link from 'next/link'

const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 33% 1fr 50px;
  align-items: center;
  ul {
    display: flex;
    li {
      padding: 0 5px;
    }
  }
`
const DanceCardTitle = styled.div`
  font-size: 0.875rem;
  grid-column: 1 / -1;
  grid-row: 1;
  p:first-child {
    font-weight: 600;
    font-size: larger;
  }
  p:last-child {
    font-style: italic;
    color: ${(props) => props.theme.gray7};
    margin: 0.25em 0;
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    font-size: 1rem;
  }
`

const DanceCardTime = styled.div`
  font-size: 0.675rem;
  grid-column: 3/-1;
  grid-row: 1;

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`
const DanceCardEntryInfo = styled.div`
  color: red;
  font-size: 0.825rem;
  grid-column: 1/2;
  grid-row: 1;

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`

const DanceCardHeader = ({ dance }) => {
  return (
    <HeaderStyle>
      <DanceCardEntryInfo>
        <p>{dance.entryNumber}</p>
        <p>{dance.entryDay}</p>
        <p>{dance.entryTime}</p>
      </DanceCardEntryInfo>
      <DanceCardTitle>
        <p>{dance.name}</p>
        <p>{dance.performanceName}</p>
      </DanceCardTitle>
      <DanceCardTime>
        <p>{dance.day}</p>
        <p>{dance.startTime}</p>
      </DanceCardTime>
    </HeaderStyle>
  )
}

export default DanceCardHeader
