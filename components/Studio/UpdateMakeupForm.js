import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import NewForm from '../styles/NewForm'
import Card from '../styles/Card'
import Error from '../Error'
import { STUDIO_MAKEUP_QUERY } from './Queries'
import useForm from '../../utilities/useForm'
import Router from 'next/router'

const UPDATE_MAKEUP_SET_MUTATION = gql`
  mutation UPDATE_MAKEUP_SET_MUTATION(
    $id: ID!
    $name: String
    $lipstick: String
    $eyeNotes: String
    $eyeShadow: String
    $eyeLids: String
    $eyeCrease: String
    $eyeLiner: String
    $eyelashes: String
    $foundation: String
    $powder: String
    $blush: String
    $bronzer: String
    $applyToCategories: String
    $notes: String
  ) {
    updateMakeupSet(
      id: $id
      name: $name
      lipstick: $lipstick
      eyeNotes: $eyeNotes
      eyeShadow: $eyeShadow
      eyeLids: $eyeLids
      eyeCrease: $eyeCrease
      eyeLiner: $eyeLiner
      eyelashes: $eyelashes
      foundation: $foundation
      powder: $powder
      blush: $blush
      bronzer: $bronzer
      notes: $notes
      applyToCategories: $applyToCategories
    ) {
      message
    }
  }
`
const initialInputState = {}

export default function UpdateMakeupForm({ makeupSet }) {
  console.log('makeupSet', makeupSet)
  const { inputs, updateInputs, handleChange } = useForm()
  const [updateMakeupSet, { data, error, loading }] = useMutation(
    UPDATE_MAKEUP_SET_MUTATION,
    {
      variables: { ...inputs, id: makeupSet.id },
      refetchQueries: [{ query: STUDIO_MAKEUP_QUERY }],
      awaitRefetchQueries: true,
    }
  )
  // disable submission of empty state if no updates are made
  const disableButton = Object.keys(inputs).length < 1

  return (
    <Card>
      <NewForm
        method='post'
        onSubmit={(e) => {
          e.preventDefault()
          updateMakeupSet()
        }}
      >
        <h2>Update Makeup Set</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <div className='form-row'>
            <div className='form-span4'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                defaultValue={makeupSet.name}
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-span4'>
              <h3>Eye Shadow</h3>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-span2'>
              <label htmlFor='eyeNotes'>Eye Notes</label>
              <input
                type='text'
                name='eyeNotes'
                defaultValue={makeupSet.eyeNotes}
                value={inputs.eyeNotes}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='eyeShadow'>Eye Shadow</label>
              <input
                type='text'
                name='eyeShadow'
                defaultValue={makeupSet.eyeShadow}
                value={inputs.eyeShadow}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-span2'>
              <label htmlFor='eyeLids'>Eye Lids</label>
              <textarea
                type='text'
                name='eyeLids'
                rows='2'
                defaultValue={makeupSet.eyeLids}
                value={inputs.eyeLids}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='eyeCrease'>Eye Crease</label>
              <textarea
                type='text'
                name='eyeCrease'
                rows='2'
                defaultValue={makeupSet.eyeCrease}
                value={inputs.eyeCrease}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-span2'>
              <label htmlFor='eyeLiner'>Eye Liner</label>
              <input
                type='text'
                name='eyeLiner'
                defaultValue={makeupSet.eyeLiner}
                value={inputs.eyeLiner}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='eyelashes'>Eye Lashes</label>
              <input
                type='text'
                name='eyelashes'
                defaultValue={makeupSet.eyelashes}
                value={inputs.eyelashes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-span2'>
              <label htmlFor='foundation'>Foundation</label>
              <input
                type='text'
                name='foundation'
                defaultValue={makeupSet.foundation}
                value={inputs.foundation}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='powder'>Powder</label>
              <input
                type='text'
                name='powder'
                defaultValue={makeupSet.powder}
                value={inputs.powder}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-span2'>
              <label htmlFor='blush'>Blush</label>
              <input
                type='text'
                name='blush'
                defaultValue={makeupSet.blush}
                value={inputs.blush}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='bronzer'>Bronzer</label>
              <input
                type='text'
                name='bronzer'
                defaultValue={makeupSet.bronzer}
                value={inputs.bronzer}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-c-full'>
              <label htmlFor='notes'>Notes</label>
              <textarea
                type='text'
                name='notes'
                rows='5'
                defaultValue={makeupSet.notes}
                value={inputs.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='form-footer'>
            <button className='btn-action-primary' type='submit'>
              Save Makeup Set
            </button>
            <button
              className='btn-danger'
              type='button'
              onClick={() => {
                updateInputs(initialInputState)
                Router.back()
              }}
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </NewForm>
    </Card>
  )
}
