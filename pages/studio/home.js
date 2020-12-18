import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'
import Link from 'next/link'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { STUDIO_USER_QUERY } from '../../components/Studio/useStudio'
import Home from '../../components/Studio/Home'
import RequestsNavLink from '../../components/Studio/RequestsNavLink'

function StudioHome() {
  const { data, error, loading } = useQuery(STUDIO_USER_QUERY)

  //tile for classes, dancers, events, hairstyles, makeup and accounts
  // number of each,
  // with + option on each

  return (
    <NewStudioLayout page='Home'>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {data && <Home studio={data.myStudio} />}
    </NewStudioLayout>
  )
}

// if (!data.myStudio.danceClasses.length) {
//   return (

//       <NewStudioLayout
//       error={error}
//     loading={loading}
//     page={'Home'}
//       ><Card>
//       <p>Welcome to dancernotes!</p>
//       <div className="card__section">
//       To begin, configure your class categories that you will use to
//       create and describe your dance classes.
//       </div>
//       <div className="card__section">
//       <Link href="configureClassCategories">
//       <a className="btn-action-primary">
//       Configure Class Categories
//       </a>
//       </Link>
//       </div>
//       </Card></NewStudioLayout>
//   );
// }
export default StudioHome
