import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import { PARENT_USER_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import RoutinesList from '../../../components/Parent/RoutinesList'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import Card from '../../../components/styles/Card'
import { useToggle } from '../../../utilities/useToggle'
import NoDancersSearchStudio from '../../../components/NoDancersSearchStudio'
export default function routinesIndex() {
  const { isToggled, toggle } = useToggle(false)
  //   const { data, loading, error } = useQuery(ALL_Rs)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  // console.log('data', data)
  const parentUser = data ? data.parentUser : { dancers: [] }
  if (parentUser.dancers.length > 0) {
    return (
      <NewParentLayout
        error={error}
        loading={loading}
        page={'Routines'}
        createLink={`/parent/routines/createRoutine`}
      >
        {data && <RoutinesList dancerIds={data.parentUser.dancersIds} />}
      </NewParentLayout>
    )
  }
  if (parentUser.dancers.length < 1) {
    return (
      <ParentNoFilterLayout page='Routines'>
        <Card>
          <div>
            <p>
              Dance Classes and competition routines your dancers are in will
              appear here.
            </p>
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
}
