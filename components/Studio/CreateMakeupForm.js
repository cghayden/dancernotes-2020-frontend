import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from '../styles/Form'
import Card from '../styles/Card'
import Error from '../Error'
import useForm from '../../utilities/useForm'
import { STUDIO_MAKEUP_QUERY } from './Queries'

const CREATE_MAKEUP_SET_MUTATION = gql`
  mutation CREATE_MAKEUP_SET_MUTATION(
    $name: String!
    $lipstick: String
    $eyeShadow: String
    $applyTo: String
  ) {
    createMakeupSet(
      name: $name
      lipstick: $lipstick
      eyeShadow: $eyeShadow
      applyTo: $applyTo
    ) {
      message
    }
  }
`

const initialInputState = {
  name: '',
  lipstick: '',
  eyeShadow: '',
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
      <Form method='post' onSubmit={(e) => saveMakeupSet(e)}>
        <h2>Create a Makeup Set</h2>
        <fieldset disabled={creatingMakeupSet} aria-busy={creatingMakeupSet}>
          <Error error={errorCreatingMakeupSet} />
          <div className='input-item'>
            <label htmlFor='name'>Name</label>
            <input
              required
              type='text'
              name='name'
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='lipstick'>Lip Stick</label>
            <input
              type='text'
              name='lipstick'
              value={inputs.lipstick}
              onChange={handleChange}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='eyeShadow'>Eye Shadow</label>
            <input
              type='text'
              name='eyeShadow'
              value={inputs.eyeShadow}
              onChange={handleChange}
            />
          </div>

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
        </fieldset>
      </Form>
    </Card>
  )
}

export default CreateMakeupForm
