import Link from 'next/link'
import styled from 'styled-components'
import { InitialStyle, AvatarStyle } from './AvatarStyle'

const DancerCardHeaderStyles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  align-items: center;
  img,
  div {
    grid-row: 1;
    grid-column: 1;
  }
  h2 {
    /* font-size: 1.75rem; */
    grid-column: 1/-1;
    grid-row: 1;
  }
  a {
    grid-row: 1;
    grid-column: 3/-1;
  }
`
function DancerCardHeader({ dancer, showEditLink = false }) {
  return (
    <DancerCardHeaderStyles>
      {dancer.avatar ? (
        <AvatarStyle src={dancer.avatar} alt={dancer.firstName} />
      ) : (
        <InitialStyle>
          <p>{dancer.firstName[0]}</p>
        </InitialStyle>
      )}
      <h2>{dancer.firstName}</h2>
      {showEditLink && (
        <Link href={`/parent/updateDancer/${dancer.id}`}>
          <a className='btn-action-primary-textOnly'>Edit</a>
        </Link>
      )}
    </DancerCardHeaderStyles>
  )
}

export default DancerCardHeader
