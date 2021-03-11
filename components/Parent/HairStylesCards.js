import HairStyleCard from './HairStyleCard'
import Card from '../styles/Card'

export default function HairStylesCards({ hairstyles }) {
  return (
    <>
      {hairstyles.map((studio) => (
        <Card>
          <div>
            <h2>Studio: {studio.studioName}</h2>
          </div>
          {studio.hairStyles.length ? (
            <>
              <div>
                {studio.hairStyles.map((style) => (
                  <HairStyleCard hairStyle={style} key={style.id} />
                ))}
              </div>
            </>
          ) : (
            <p>{studio.studioName} has no Hair Styles to view.</p>
          )}
        </Card>
      ))}
    </>
  )
}
