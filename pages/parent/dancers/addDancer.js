import NewParentLayout from '../../../components/Parent/NewParentLayout'

import CreateDancerForm from '../../../components/Parent/CreateDancerForm'

function AddDancerPage() {
  return (
    <NewParentLayout page={'Add a Dancer'}>
      <CreateDancerForm />
    </NewParentLayout>
  )
}

export default AddDancerPage
