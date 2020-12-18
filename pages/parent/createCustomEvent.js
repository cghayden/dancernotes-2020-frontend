import SubNavMainLayout from '../../components/SubNavMainLayout'
import { useQuery } from '@apollo/react-hooks'
import CreateCustomEventForm from '../../components/Parent/CreateCustomEventForm'
import { STUDIOS_AND_DANCERS } from '../../components/Parent/Queries'
import Error from '../../components/Error'
import CancelButton from '../../components/CancelButton'
import NotesSubNav from '../../components/Parent/NotesSubNav'
import Loading from '../../components/Loading'
function createCustomEventPage() {
  const { data: parent, loading, error } = useQuery(STUDIOS_AND_DANCERS)
  if (loading || error)
    return (
      <>
        <NotesSubNav />
        <SubNavMainLayout
          page={'Create Your Own Event'}
          pageAction={<CancelButton />}
          mobileHeader='Notes'
        >
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    )

  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout
        page={'Create Your own Event'}
        pageAction={<CancelButton />}
        mobileHeader='Notes'
      >
        <CreateCustomEventForm parent={parent.parentUser} />
      </SubNavMainLayout>
    </>
  )
}

export default createCustomEventPage
