import Link from 'next/link'
import styled from 'styled-components'
import Card from '../styles/Card'

const HairImage = styled.div`
  text-align: center;
  img {
    width: 90%;
    height: 90%;
    max-width: 300px;
    max-height: 300px;
  }
`

function HairStyleCard({ hairStyle }) {
  return (
    <Card>
      <div className='card__header'>
        <h3>{hairStyle.name}</h3>
        <Link href={`/studio/updateHair/${hairStyle.id}`}>Edit</Link>
      </div>
      {hairStyle.image && (
        <HairImage>
          <img
            src={hairStyle.image}
            alt={`Image of hair style called ${hairStyle.name}`}
          />
        </HairImage>
      )}
      <div className='card__section'>
        <h4>Description: </h4>
        <p>{hairStyle.description}</p>
      </div>
      <div className='card_section'>
        {hairStyle.link && (
          <h4>
            <a href={hairStyle.link} target='_blank'>
              Watch an Intructional Video
            </a>
          </h4>
        )}
      </div>
    </Card>
  )
}

export default HairStyleCard
