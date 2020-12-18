import styled from 'styled-components'
import { useDisplayControls } from './ParentDisplayProvider'

const ActiveDancerButton = styled.button`
  justify-self: center;
  background: transparent;
  color: ${(props) => props.theme.indigo9};
  margin: 0.5rem 0;
  padding: 0;
  border-radius: 50%;
  border: none;
  /* :active {
    transform: translate3d(5px, 5px, 0);
  } */
  :hover {
    background: inherit;
    color: ${(props) => props.theme.indigo8};
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    font-size: 1.4rem;
  }
`
const InActiveDancerButton = styled.button`
  justify-self: center;
  color: ${(props) => props.theme.gray4};
  padding: 0;
  border-radius: 50%;
  border: none;
  /* :active {
    transform: translate3d(5px, 5px, 0);
  } */
  :hover {
    background: inherit;
    color: ${(props) => props.theme.indigo8};
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    filter: grayscale(85%);
    object-fit: cover;
  }
  span {
    font-size: 1.3rem;
  }
`

function DancerToggler({ dancer }) {
  const { hiddenIds, toggleId } = useDisplayControls()

  if (hiddenIds.includes(dancer.id)) {
    return (
      <InActiveDancerButton
        onClick={() => {
          toggleId(dancer.id)
        }}
      >
        {dancer.avatar ? (
          <img src={dancer.avatar} alt={dancer.firstName} />
        ) : (
          <span>{dancer.firstName}</span>
        )}
      </InActiveDancerButton>
    )
  }
  return (
    <ActiveDancerButton
      onClick={() => {
        toggleId(dancer.id)
      }}
    >
      {dancer.avatar ? (
        <img src={dancer.avatar} alt={dancer.firstName} />
      ) : (
        <span>{dancer.firstName}</span>
      )}
    </ActiveDancerButton>
  )
}

export default DancerToggler
