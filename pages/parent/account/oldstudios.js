import { useQuery } from '@apollo/react-hooks'
import SubNavMainLayout from '../../../components/SubNavMainLayout'
import AccountSubNav from '../../../components/Parent/AccountSubNav'
import { STUDIO_CARD_QUERY } from '../../../components/Parent/Queries'
import StudioCard from '../../../components/Parent/StudioCard'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
import Card from '../../../components/styles/Card'
function MyStudiosPage() {
  const { data, loading, error } = useQuery(STUDIO_CARD_QUERY)

  if (loading || error)
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout mobileHeader={'Account'} page='My Studios'>
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    )
  const studios = data && data.parentUser.studios

  if (!studios.length) {
    return (
      <>
        <AccountSubNav />
        <SubNavMainLayout mobileHeader={'Account'} page={'My Studios'}>
          <Card>
            <p>
              You're dancers are not enrolled at or subscribed to any studios.
            </p>
          </Card>
        </SubNavMainLayout>
      </>
    )
  }
  return (
    <>
      <AccountSubNav />
      <SubNavMainLayout mobileHeader={'Account'} page={'My Studios'}>
        {studios.map((studio) => (
          <StudioCard
            key={studio.id}
            studio={studio}
            dancers={data.parentUser.dancers}
          ></StudioCard>
        ))}
      </SubNavMainLayout>
    </>
  )
}

export default MyStudiosPage
