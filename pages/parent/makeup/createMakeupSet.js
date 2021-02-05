import NewParentLayout from '../../../components/Parent/NewParentLayout'

export default function createMakeupSet() {
  return (
    <NewParentLayout error={error} loading={loading} page={'Create Makeup Set'}>
      {!error && !loading && <div>Create Makeup Set Page</div>}
    </NewParentLayout>
  )
}
