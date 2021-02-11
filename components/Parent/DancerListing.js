import Link from 'next/link'
import styled from 'styled-components'
import Card from '../styles/Card'

const ListingCard = styled(Card)`
  position: relative;
  font-size: 1rem;
  display: flex;
  margin: 1rem 0;
  box-shadow: ${(props) => props.theme.dropShadow1};
  background: ${(props) => props.theme.gray0};
  padding: 0.5rem;
  a {
    width: 100%;
  }
`

const AvatarInitials = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  background: ${(props) => props.theme.gray4};
  border-radius: 50%;
  left: 0.5em;
  font-size: 2em;
  width: 2em;
  height: 2em;
  display: grid;
  place-items: center;
  color: white;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
  }
`

function DancerListing({ dancer }) {
  const initials = dancer.firstName.slice(0, 2)

  return (
    <ListingCard>
      <Link href={`/parent/dancers/${dancer.id}`}>
        <a>
          <AvatarInitials>
            {dancer.avatar ? (
              <img src={dancer.avatar} alt={`image of ${dancer.firstName}`} />
            ) : (
              <span>{initials}</span>
            )}
          </AvatarInitials>
          <div>
            <h2>{dancer.firstName}</h2>
          </div>
        </a>
      </Link>
    </ListingCard>
  )
}

export default DancerListing
