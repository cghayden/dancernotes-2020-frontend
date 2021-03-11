import Card from '../styles/Card'

function HairStyleCard(props) {
  const { hairStyle } = props
  return (
    <div>
      <div>
        <h3>{hairStyle.name}</h3>
      </div>

      {hairStyle.image ? (
        <div>
          <img
            className='img-large'
            src={hairStyle.image}
            alt={`Image of hair style called ${hairStyle.name}`}
          />
          <figcaption>{hairStyle.description}</figcaption>
        </div>
      ) : (
        <div className='card__section'>
          <p>{hairStyle.description}</p>
        </div>
      )}
      <div className='card__section'>
        {hairStyle.link && (
          <a
            className='btn-action-primary'
            href={hairStyle.link}
            target='_blank'
          >
            Watch an Intructional Video
          </a>
        )}
      </div>
    </div>
  )
}

export default HairStyleCard
