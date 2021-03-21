import styled from 'styled-components';

const EnrolledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  grid-row: 1;
  grid-column: 1;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  width: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  height: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  filter: ${(props) => (props.isDancerHidden ? `opacity(.4)` : `none`)};
  /* width: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)};
  height: ${(props) => (props.isDancerHidden ? `1.2em` : `1.4em`)}; */
  border-radius: 25px;
  margin: 0 0.25rem;
  object-fit: cover;
`;

const Initial = styled.div`
  /* width: 40px;
  height: 40px; */
  width: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  height: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  border-radius: 25px;
  margin: 0 0.25rem;
  display: grid;
  place-items: center;
  font-size: ${(props) => (props.isDancerHidden ? `1.4em` : `1.6em`)};
  background-color: slateblue;
  /* background-color: ${(props) =>
    props.isDancerHidden ? props.theme.gray2 : props.theme.green7}; */
  color: #ddedf2;
  /* color: ${(props) =>
    props.isDancerHidden ? props.theme.gray4 : props.theme.green0}; */
`;

export default function EnrolledDancers({ dancers, hiddenIds = [] }) {
  return (
    <EnrolledDiv>
      {dancers.map((dancer) => {
        if (dancer.avatar) {
          return (
            <Avatar
              isDancerHidden={hiddenIds.includes(dancer.id)}
              key={dancer.id}
              src={dancer.avatar}
              alt={dancer.firstName}
            />
          );
        } else {
          return (
            <Initial
              key={dancer.id}
              isDancerHidden={hiddenIds.includes(dancer.id)}
            >
              <p>{dancer.firstName[0]}</p>
            </Initial>
          );
        }
      })}
    </EnrolledDiv>
  );
}
