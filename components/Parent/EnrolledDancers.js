import styled from 'styled-components'

const EnrolledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  grid-row: 1;
  grid-column: 1;
`
const Avatar = styled.img`
  width: 1.4em;
  height: 1.4em;
  border-radius: 25px;
  margin: 0 0.25rem;
  object-fit: cover;

  /* @media (min-width: ${(props) => props.theme.largeScreen}) {
    width: 42px;
    height: 42px;
  } */
`

const InactiveAvatar = styled(Avatar)`
  width: 1.5em;
  height: 1.5em;
  filter: grayscale(80%);
  border: 2px solid ${(props) => props.theme.gray3};
  /* @media (min-width: ${(props) => props.theme.largeScreen}) {
    width: 38px;
    height: 38px;
  } */
`

const Initial = styled.div`
  width: 1.4em;
  height: 1.4em;
  border-radius: 25px;
  margin: 0 0.25rem;
  display: grid;
  place-items: center;
  font-size: 1.4em;
  color: ${(props) => props.theme.indigo0};
  background-color: ${(props) => props.theme.indigo9};
  p {
    font-size: 0.9em;
  }
  /* @media (min-width: ${(props) => props.theme.largeScreen}) {
    width: 42px;
    height: 42px;
  } */
`

export default function EnrolledDancers({ dancers }) {
  return (
    <EnrolledDiv>
      <>
        {dancers.map((dancer) => {
          if (dancer.avatar) {
            return (
              <Avatar
                key={dancer.id}
                src={dancer.avatar}
                alt={dancer.firstName}
              />
            )
          } else {
            return (
              <Initial key={dancer.id}>
                <p>{dancer.firstName[0]}</p>
              </Initial>
            )
          }
        })}
      </>
    </EnrolledDiv>
  )
}
