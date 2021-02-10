import { useQuery } from '@apollo/react-hooks'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import DancerListing from '../../../components/Parent/DancerListing'
import { PARENTS_DANCERS } from '../../../components/Parent/Queries'
import Link from 'next/link'
import Card from '../../../components/styles/Card'

export default function dancersIndex() {
  const { data, error, loading } = useQuery(PARENTS_DANCERS)
  const dancers = data ? data.parentsDancers : []

  if (!dancers.length) {
    return (
      <ParentNoFilterLayout page='Dancers'>
        <Card>
          <div>
            <p>You currently have no dancers.</p>
            <p>You can:</p>
          </div>
          <div className='card__section'>
            <Link href='/parent/dancers/addDancer'>
              <a className='btn-action-primary'>Add a Dancer to your Account</a>
            </Link>
          </div>
        </Card>
      </ParentNoFilterLayout>
    )
  }

  return (
    <ParentNoFilterLayout
      error={error}
      loading={loading}
      page='Dancers'
      createLink={`/parent/dancers/createDancer`}
    >
      {data &&
        data.parentsDancers.map((dancer) => (
          <DancerListing dancer={dancer} key={dancer.id} />
        ))}
    </ParentNoFilterLayout>
  )
}
