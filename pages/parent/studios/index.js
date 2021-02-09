import { useQuery } from '@apollo/react-hooks'
import { STUDIO_CARD_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import StudioCard from '../../../components/Parent/StudioCard'
import Card from '../../../components/styles/Card'
import { useToggle } from '../../../utilities/useToggle'
import SearchForStudio from '../../../components/SearchForStudio'
export default function studiosIndex() {
  const { isToggled, toggle } = useToggle(false)
  const { data, loading, error } = useQuery(STUDIO_CARD_QUERY)

  const studios = data ? data.parentUser.studios : []
  const dancers = data ? data.parentUser.dancers : []

  if (studios.length < 1) {
    return (
      <NewParentLayout
        error={error}
        loading={loading}
        page={'My Studios'}
        //   createLink={`/parent/makeup/createMakeupSet`}
      >
        <Card>
          <p>
            You're dancers are not enrolled at or subscribed to any studios.
          </p>
          <button className='btn-action-primary' onClick={toggle}>
            Search for a studio to browse and/or register for classes.
          </button>
          {isToggled && (
            <SearchForStudio dancerId={dancers ? dancers[0].id : 'null'} />
          )}
        </Card>
      </NewParentLayout>
    )
  }

  return (
    <NewParentLayout
      error={error}
      loading={loading}
      page={'My Studios'}
      //   createLink={`/parent/makeup/createMakeupSet`}
    >
      {studios.map((studio) => (
        <StudioCard
          key={studio.id}
          studio={studio}
          dancers={data.parentUser.dancers}
        ></StudioCard>
      ))}
    </NewParentLayout>
  )
}
