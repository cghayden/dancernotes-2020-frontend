import React from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'
import NewForm from '../styles/NewForm'
import Card from '../styles/Card'
import Error from '../Error'
import useForm from '../../utilities/useForm'
import { STUDIO_MAKEUP_QUERY } from './Queries'

const CREATE_MAKEUP_SET_MUTATION = gql`
  mutation CREATE_MAKEUP_SET_MUTATION(
    $name: String!
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
    createMakeupSet(
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

const initialInputState = {
  name: '',
  lipstick: '',
  eyeNotes: '',
  eyeShadow: '',
  eyeLids: '',
  eyeCrease: '',
  eyeLiner: '',
  foundation: '',
  powder: '',
  blush: '',
  bronzer: '',
  notes: '',
  applyToCategories: '',
}

function CreateMakeupForm({ toggleForm, studio }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState)

  const [
    createMakeupSet,
    {
      data: newMakeupSet,
      loading: creatingMakeupSet,
      error: errorCreatingMakeupSet,
    },
  ] = useMutation(CREATE_MAKEUP_SET_MUTATION, {
    variables: { ...inputs },
    onCompleted: () => {
      updateInputs({ ...initialInputState })
      Router.push('/studio/makeup')
    },
    refetchQueries: [{ query: STUDIO_MAKEUP_QUERY }],
  })

  async function saveMakeupSet(e) {
    e.preventDefault()
    await createMakeupSet()
  }

  return (
    <Card>
      <NewForm method='post' onSubmit={(e) => saveMakeupSet(e)}>
        <h2>Create a Makeup Set</h2>
        <fieldset disabled={creatingMakeupSet} aria-busy={creatingMakeupSet}>
          <Error error={errorCreatingMakeupSet} />

          <div className='form-row'>
            <div className='form-span4'>
              <label htmlFor='name'>Name</label>
              <input
                required
                type='text'
                name='name'
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
                value={inputs.eyeNotes}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='eyeShadow'>Eye Shadow</label>
              <input
                type='text'
                name='eyeShadow'
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
                value={inputs.eyeLiner}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='eyelashes'>Eye Lashes</label>
              <input
                type='text'
                name='eyelashes'
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
                value={inputs.foundation}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='powder'>Powder</label>
              <input
                type='text'
                name='powder'
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
                value={inputs.blush}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='bronzer'>Bronzer</label>
              <input
                type='text'
                name='bronzer'
                value={inputs.bronzer}
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
                value={inputs.foundation}
                onChange={handleChange}
              />
            </div>

            <div className='form-span2'>
              <label htmlFor='powder'>Powder</label>
              <input
                type='text'
                name='powder'
                value={inputs.powder}
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
              onClick={() => Router.back()}
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </NewForm>
    </Card>
  )
}

export default CreateMakeupForm
