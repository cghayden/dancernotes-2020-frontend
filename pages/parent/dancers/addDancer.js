import CreateDancerForm from '../../../components/Parent/CreateDancerForm'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'

function AddDancerPage() {
  return (
    <ParentNoFilterLayout page={'Add a Dancer'}>
      <h2>Add a New Dancer</h2>
      <CreateDancerForm />
    </ParentNoFilterLayout>
  )
}

export default AddDancerPage
