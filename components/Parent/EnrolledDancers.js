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
  width: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)};
  height: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)};
  filter: ${(props) => (props.isDancerHidden ? `opacity(.4)` : `none`)};
  border-radius: 25px;
  margin: 0 0.25rem;
  object-fit: cover;
`

const Initial = styled.div`
  width: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)};
  height: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)};
  border-radius: 25px;
  margin: 0 0.25rem;
  display: grid;
  place-items: center;
  font-size: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)};
  background-color: ${(props) =>
    props.isDancerHidden ? props.theme.gray2 : props.theme.green7};
  color: ${(props) =>
    props.isDancerHidden ? props.theme.gray4 : props.theme.green0};
  p {
    font-size: 0.9em;
  }
`

export default function EnrolledDancers({ dancers, hiddenIds }) {
  return (
    <EnrolledDiv>
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
            <Initial
              key={dancer.id}
              isDancerHidden={hiddenIds.includes(dancer.id)}
            >
              <p>{dancer.firstName[0]}</p>
            </Initial>
          )
        }
      })}
    </EnrolledDiv>
  )
}
