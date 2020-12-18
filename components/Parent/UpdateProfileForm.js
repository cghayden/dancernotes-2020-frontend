import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useForm from '../../lib/useForm'
import Card from '../styles/Card'
import Form from '../styles/Form'
import Error from '../Error'
import DeleteAccount from './DeleteAccount'
import CancelButton from '../CancelButton'
const UPDATE_PARENT = gql`
  mutation UPDATE_PARENT($firstName: String) {
    updateParent(firstName: $firstName) {
      id
      firstName
      email
    }
  }
`

const initialInputState = {}

export default function UpdateProfileForm({ parentUser }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState)
  const [updateParent, { loading, error }] = useMutation(UPDATE_PARENT, {
    variables: { ...inputs },
  })

  const disableButton = Object.keys(inputs).length < 1

  async function saveChanges(e) {
    e.preventDefault()
    console.log('save')
    await updateParent()
  }

  return (
    <Card>
      <Form method='post' onSubmit={(e) => saveChanges(e)}>
        <Error error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <h5>Update Your Profile</h5>
          <div className='input-item'>
            <label htmlFor='firstName'>Name</label>
            <input
              type='text'
              name='firstName'
              onChange={handleChange}
              defaultValue={parentUser.firstName}
            />
          </div>
          <div className='form-footer'>
            <button
              className='btn-action-primary'
              type='submit'
              disabled={loading || disableButton}
              aria-busy={loading}
            >
              Sav
              {loading ? 'ing ' : 'e '} Changes
            </button>
            <CancelButton />
            <DeleteAccount />
          </div>
        </fieldset>
      </Form>
    </Card>
  )
}
