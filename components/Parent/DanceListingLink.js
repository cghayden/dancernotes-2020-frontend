import styled from 'styled-components';
import EnrolledDancers from './EnrolledDancers';
import { useDisplayControls } from './ParentDisplayProvider';

const HeaderStyle = styled.div`
  width: 100%;
  max-width: 500px;
  display: grid;
  grid-template-columns: 33% 1fr 64px;
  align-items: center;
  ul {
    display: flex;
    li {
      padding: 0 5px;
    }
  }
`;
const DanceCardTitle = styled.div`
  font-size: 0.875rem;
  grid-column: 1 / -1;
  grid-row: 1;
  p {
    text-transform: none;
  }
  p:first-child {
    font-weight: 600;
    font-size: larger;
  }
  p:nth-child(2) {
    font-style: italic;
    color: ${(props) => props.theme.gray7};
    margin: 0.25em 0;
  }
  p:last-child {
    color: ${(props) => props.theme.gray7};
    font-size: 1em;
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    font-size: 1rem;
  }
`;

const DanceCardTime = styled.div`
  font-size: 0.75rem;
  grid-column: 3/-1;
  grid-row: 1;
  color: ${(props) => (props.comp ? props.theme.dutchRed : 'inherit')};
  p {
    margin: 2px 0;
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`;
const DanceCardEntryInfo = styled.div`
  color: red;
  font-size: 0.825rem;
  grid-column: 1/2;
  grid-row: 1;

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`;

function formatTime(timeString) {
  const array = timeString.split(':');
  let hours = parseInt(array[0]);
  if (hours == 12) {
    return hours + ':' + array[1] + ' pm';
  }
  if (hours > 12) {
    hours -= 12;
    return hours + ':' + array[1] + ' pm';
  } else {
    return timeString + ' am';
  }
}

const DanceListingLink = ({ dance }) => {
  const { competitionMode, hiddenIds } = useDisplayControls();
  return (
    <HeaderStyle>
      <EnrolledDancers hiddenIds={hiddenIds} dancers={dance.dancers} />
      <DanceCardTitle>
        <p>{dance.name}</p>
        {/* <p>{dance.studio?.studioName}</p> */}
        <p>{dance.performanceName}</p>
      </DanceCardTitle>
      {!competitionMode ? (
        <DanceCardTime>
          <p>{dance.day}</p>
          {dance.startTime && <p>{formatTime(dance.startTime)}</p>}
        </DanceCardTime>
      ) : (
        <DanceCardTime comp={competitionMode}>
          <p>{dance.entryNumber}</p>
          <p>{dance.entryDay}</p>
          <p>{dance.entryTime && formatTime(dance.entryTime)}</p>
        </DanceCardTime>
      )}
    </HeaderStyle>
  );
};

export default DanceListingLink;
