// import Link from 'next/link'
import StudioMakeup from './StudioMakeup'

function MakeupContent({ studios }) {
  if (studios.length > 0) {
    return (
      <>
        {studios.map((studio) => (
          <StudioMakeup studio={studio} key={studio.id} />
        ))}
      </>
    )
  }

  return (
    <div>
      <p>
        You are not linked to any studios, or your studios do not have any
        makeup sets to display.
      </p>
      {/* <p>Would you like to add your own makeup set?</p>
      <p>
        <Link href={`/parent/makeup/createMakeupSet`}>
          <a>Yes</a>
        </Link>
      </p> */}
    </div>
  )
}

export default MakeupContent
