import { useQuery } from '@apollo/client'
import { STUDIO_CARD_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import StudioCard from '../../../components/Parent/StudioCard'
import Card from '../../../components/styles/Card'
import { useToggle } from '../../../utilities/useToggle'
import NewSearchForStudio from '../../../components/Parent/NewSearchForStudio'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import Link from 'next/link'
import NoDancersSearchStudio from '../../../components/Parent/NoDancersSearchStudio'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

export default function studiosIndex() {
  const { isToggled, toggle } = useToggle(false)
  const { data, loading, error } = useQuery(STUDIO_CARD_QUERY)

  // const studios = data ? data.parentUser.studios : []
  // const dancers = data ? data.parentUser.dancers : []
  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Studios'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }
  if (data && data.parentUser.dancers.length < 1) {
    return (
      <ParentNoFilterLayout page='Studios'>
        <Card>
          <div>
            <p>You currently have no dancers.</p>
            <p>You can:</p>
          </div>
          <div className='card__section'>
            <button className='btn-action-primary' onClick={toggle}>
              Search for a studio to browse classes.
            </button>
            {isToggled && <NoDancersSearchStudio />}
            <p>- OR -</p>
            <Link href='/parent/dancers/addDancer'>
              <a className='btn-action-primary'>Add a Dancer to your Account</a>
            </Link>
          </div>
        </Card>
      </ParentNoFilterLayout>
    )
  }

  if (data && data.parentUser.studios.length < 1) {
    return (
      <NewParentLayout page={'Studios'}>
        <Card>
          <p>
            You're dancers are not enrolled at or subscribed to any studios.
          </p>
          <button className='btn-action-primary' onClick={toggle}>
            Search for a studio to browse and/or register for classes.
          </button>
          {isToggled && (
            <NewSearchForStudio dancerId={dancers ? dancers[0].id : 'null'} />
          )}
        </Card>
      </NewParentLayout>
    )
  }

  return (
    <NewParentLayout page={'Studios'}>
      {data.parentUser.studios.map((studio) => (
        <StudioCard
          key={studio.id}
          studio={studio}
          dancers={data.parentUser.dancers}
        ></StudioCard>
      ))}
    </NewParentLayout>
  )
}
