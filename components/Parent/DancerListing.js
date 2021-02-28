import Link from 'next/link'
import styled from 'styled-components'
import DancerCardHeader from '../DancerCardHeader'
import Card from '../styles/Card'

const ListingCard = styled(Card)`
  padding: 0.5rem;
  a {
    width: 100%;
  }
`
const edgeParents = [
  'kj@edgestudioofdance.com',
  'sljoyce1027@verizon.net',
  'elenathach@gmail.com',
  'ella@ella.com',
  'q@q.com',
  'z@z.com',
  't@t.com',
  'cghayden@gmail.com',
  'sarah.hayden27@gmail.com',
  'yengbutler@gmail.com',
  'jopetrunyak@yahoo.com',
  'karajdm@yahoo.com',
  'kelli474@msn.com',
  'lilianthana4@yahoo.com',
  'lisabraude@gmail.com',
  'vieira2177@gmail.com',
  'lorironkin@yahoo.com',
  'marcycarty@gmail.com',
  'michaelaellensilva@gmail.com',
  'mullinfam2061@gmail.com',
  'blackcoffee141@msn.com',
  'roudlylaroche@live.com',
  'taradelamere@gmail.com',
  'elcorredor@hotmail.com',
  'adelaidehayden@gmail.com',
  'hondacoupe2004@yahoo.com',
  'svetlana.leeds83@gmail.com',
  'shalinijay@gmail.com',
  'tamaraimcgowan@yahoo.com',
]

const NoRoutinesOptions = styled.div`
  p {
    font-size: 14px;
  }
  button,
  a {
    font-size: 14px;
    width: 125px;
    margin: 0.5rem;
  }
`
function DancerListing({ dancer }) {
  // const initials = dancer.firstName.slice(0, 2)
  const directEdgeId =
    process.env.NODE_ENV === 'development'
      ? `ck72koohr0t0r0b901ih2sx2t`
      : `ck6bbkozd000f0745ahefjkcq`

  return (
    <ListingCard>
      <Link href={`/parent/dancers/${dancer.id}`}>
        <a>
          <DancerCardHeader dancer={dancer} />
        </a>
      </Link>
      {!dancer.danceClasses.length && (
        <NoRoutinesOptions>
          <p>
            {dancer.firstName} is not in any classes. Follow the link below to
            find a studio
          </p>
          <Link href='/parent/studios/search'>
            <a className='btn-action-primary'>Find a Studio</a>
          </Link>
        </NoRoutinesOptions>
      )}
      {!dancer.danceClasses.length &&
        edgeParents.includes(dancer.parent.email) && (
          <>
            <Link href={`/parent/browseStudio/?studioId=${directEdgeId}`}>
              <a style={{ color: 'blue' }}>
                Take me to the routines in Corey's Edge Notes
              </a>
            </Link>
          </>
        )}
    </ListingCard>
  )
}

export default DancerListing

// const AvatarInitials = styled.div`
//   position: absolute;
//   transform: translateY(-50%);
//   top: 50%;
//   background: ${(props) => props.theme.gray4};
//   border-radius: 50%;
//   left: 0.5em;
//   font-size: 2em;
//   width: 1.5em;
//   height: 1.5em;
//   display: grid;
//   place-items: center;
//   color: white;
//   img {
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     object-fit: cover;
//     margin: 0;
//   }
// `
