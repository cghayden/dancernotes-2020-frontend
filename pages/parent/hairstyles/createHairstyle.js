import { useQuery } from '@apollo/react-hooks'
import {
  PARENT_EVENTS_QUERY,
  CUSTOM_EVENTS_QUERY,
  ALL_Rs,
} from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'

export default function createHairStylePage() {
  return (
    <NewParentLayout error={error} loading={loading} page={'Create Hairstyle'}>
      {!error && !loading && <div>Create Hairstyle Page</div>}
    </NewParentLayout>
  )
}
