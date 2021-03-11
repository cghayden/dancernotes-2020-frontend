import { useState } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker'
import Router from 'next/router'
import Form from '../styles/Form'
import Card from '../styles/Card'
import Error from '../Error'
import useForm from '../../utilities/useForm'
import { SelectChoices } from '../styles/SelectChoices'
import { CUSTOM_EVENTS_QUERY } from './Queries'

const CREATE_CUSTOM_EVENT = gql`
  mutation CREATE_CUSTOM_EVENT(
    $name: String!
    $type: String!
    $dancerIds: [ID!]!
    $beginDate: DateTime
    $endDate: DateTime
    $location: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zip: String
    $url: String
    $notes: String
  ) {
    createCustomEvent(
      name: $name
      type: $type
      dancerIds: $dancerIds
      beginDate: $beginDate
      endDate: $endDate
      location: $location
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
      url: $url
      notes: $notes
    ) {
      id
      type
      name
    }
  }
`

const initialInputState = {
  type: '',
  name: '',
  location: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  url: '',
  notes: '',
}

function CreateCustomEventForm({ parent }) {
  const { inputs, handleChange } = useForm(initialInputState)
  const [dancerChoice, setDancerChoice] = useState(() =>
    parent.dancers.length > 1
      ? {}
      : { [parent.dancers[0].firstName]: parent.dancers[0].id }
  )
  const [beginDate, setBeginDate] = useState()
  const [endDate, setEndDate] = useState()
  const [showAddress2, toggleshowAddress2] = useState(false)
  const [createCustomEvent, { error, loading }] = useMutation(
    CREATE_CUSTOM_EVENT,
    {
      refetchQueries: [{ query: CUSTOM_EVENTS_QUERY }],
      onCompleted: () => {
        Router.push('/parent/events')
      },
    }
  )

  async function saveEvent(e) {
    e.preventDefault()
    const dancerIds = Object.values(dancerChoice)
    const beginningDate = beginDate ? beginDate.toISOString() : null
    const endingDate = endDate ? endDate.toISOString() : null
    await createCustomEvent({
      variables: {
        ...inputs,
        dancerIds,
        beginDate: beginningDate,
        endDate: endingDate,
      },
    })
  }

  function handleSelectChange(e) {
    const chosenDancerName = e.target.selectedOptions[0].label
    const chosenDancerId = e.target.selectedOptions[0].value
    setDancerChoice({ ...dancerChoice, [chosenDancerName]: chosenDancerId })
  }

  function removeChosenDancer(selection) {
    const dancers = { ...dancerChoice }
    delete dancers[selection]
    setDancerChoice(dancers)
  }

  return (
    <Card>
      <Form
        method='post'
        onSubmit={async (e) => {
          await saveEvent(e)
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Add A New Event</h2>

          <div className='input-item'>
            <label htmlFor='name'>
              Event Name <span className='required'> Required</span>
            </label>
            <input
              required
              type='text'
              name='name'
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='type'>Type:</label>
            <select
              id='type'
              name='type'
              value={inputs.type}
              onChange={handleChange}
            >
              <option default value={''} disabled>
                (Competition, Rehearsal, etc...)?
              </option>
              <option value='competition'>Competition</option>
              <option value='rehearsal'>Rehearsal</option>
              <option value='recital'>Recital</option>
              <option value='convention'>Convention</option>
              <option value='camp'>Camp</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <div className='input-item'>
            <label htmlFor='dancer'>
              Dancer(s) This Event Applies To:{' '}
              <span className='required'> Required</span>
            </label>
            <SelectChoices className='selectChoices'>
              {Object.entries(dancerChoice).map((dancer) => {
                return (
                  <li key={dancer[0]}>
                    {dancer[0]}
                    <span>
                      <button
                        className='btn-icon'
                        type='button'
                        onClick={() => {
                          removeChosenDancer(dancer[0])
                        }}
                      >
                        X
                      </button>
                    </span>
                  </li>
                )
              })}
            </SelectChoices>
            {parent.dancers.length > 1 && (
              <select
                id='dancer'
                name='dancer'
                value={''}
                onChange={(e) => {
                  handleSelectChange(e)
                }}
              >
                <option default value={''} disabled>
                  Dancer(s)...
                </option>
                {parent &&
                  parent.dancers.map((dancer) => (
                    <option
                      key={dancer.id}
                      value={dancer.id}
                      label={dancer.firstName}
                    >
                      {dancer.firstName}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {/* Dates */}
          <div className='form-row'>
            <div className='row-item'>
              <label htmlFor='beginDate'>Begin Date:</label>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                id='beginDate'
                selected={beginDate}
                onChange={(date) => setBeginDate(date)}
                popperPlacement='auto'
              />
            </div>
            <div className='row-item'>
              <label htmlFor='endDate'>End Date:</label>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                id='endDate'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                popperPlacement='auto'
              />
            </div>
          </div>
          <h3 style={{ padding: '0' }}>Location:</h3>
          <div className='input-item'>
            <label htmlFor='location'>Location Name</label>
            <input
              type='text'
              name='location'
              value={inputs.location}
              onChange={handleChange}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='address1'>Location Address Line 1</label>
            <input
              type='text'
              name='address1'
              value={inputs.address1}
              onChange={handleChange}
            />
          </div>
          {showAddress2 && (
            <div className='input-item'>
              <label htmlFor='address2'>Address Line 2</label>
              <input
                type='text'
                name='address2'
                value={inputs.address2}
                onChange={handleChange}
              />
            </div>
          )}
          <div className='form-row'>
            <div className='row-item'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                value={inputs.city}
                onChange={handleChange}
              />
            </div>
            <div className='row-item'>
              <label htmlFor='state'>State</label>
              <input
                className='state'
                type='text'
                name='state'
                value={inputs.state}
                onChange={handleChange}
              />
            </div>
            <div className='row-item'>
              <label htmlFor='zip'>Zip Code</label>
              <input
                className='zip'
                type='text'
                name='zip'
                value={inputs.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='input-item'>
            <label htmlFor='notes'>Notes</label>
            <textarea
              id='notes'
              type='text'
              name='notes'
              rows='3'
              value={inputs.notes}
              onChange={handleChange}
            />
          </div>
          <Error error={error} />
          <div className='form-footer'>
            <button
              className='btn-action-primary'
              type='submit'
              disabled={loading}
            >
              Creat
              {loading ? 'ing ' : 'e '} Event
            </button>
          </div>
        </fieldset>
      </Form>
    </Card>
  )
}

export default CreateCustomEventForm
