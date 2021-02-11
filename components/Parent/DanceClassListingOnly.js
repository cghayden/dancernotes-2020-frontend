import styled from 'styled-components'

const ClassListing = styled.div`
  background: ${(props) => props.theme.gray0};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.dropShadowPizzazz};
  display: grid;
  grid-template-columns: 50% 50%;
  place-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
`
const DanceClassName = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.gray9};
`
const DanceClassTime = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`
function DanceClassListingOnly({ dance }) {
  return (
    <ClassListing>
      <div>
        <DanceClassName>{dance.name}</DanceClassName>
        <p>
          <span>{dance.competitiveLevel}</span>
          {'  '}
          <span>{dance.ageDivision}</span>
          {'  '}
          <span>{dance.style}</span>
        </p>
      </div>
      <DanceClassTime>
        {dance.day && <p>{dance.day}</p>}
        <p>
          {dance.startTime && <span>{dance.startTime}</span>}
          {dance.endTime && <span>{` - ${dance.endTime}`}</span>}
        </p>
      </DanceClassTime>
    </ClassListing>
  )
}

export default DanceClassListingOnly
