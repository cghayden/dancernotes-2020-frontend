import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import Form from '../styles/Form';
import Card from '../styles/Card';
import Error from '../Error';
import useForm from '../../utilities/useForm';
import { SelectChoices } from '../styles/SelectChoices';
import { STUDIO_EVENTS_QUERY } from './Queries';
import Router from 'next/router';
import Modal from '../Modal';
import Link from 'next/link';
import app from 'next/app';
import styled from 'styled-components';

const CREATE_STUDIO_EVENT = gql`
  mutation CREATE_STUDIO_EVENT(
    $name: String!
    $type: String!
    $appliesTo: [String!]!
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
    createStudioEvent(
      name: $name
      type: $type
      appliesTo: $appliesTo
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
      appliesTo
    }
  }
`;
const appliesToOptions = [
  { value: 'all', label: 'All Classes', name: 'appliesTo' },
  { value: 'recreational', label: 'Recreational', name: 'appliesTo' },
  { value: 'company', label: 'All Company', name: 'appliesTo' },
  { value: 'star', label: 'All Star', name: 'appliesTo' },
  { value: 'mini star', label: 'Mini Star', name: 'appliesTo' },
  { value: 'mini company', label: 'Mini Company', name: 'appliesTo' },
  { value: 'junior star', label: 'Junior Star', name: 'appliesTo' },
  { value: 'junior company', label: 'Junior Company', name: 'appliesTo' },
  { value: 'teen 1 star', label: 'Teen Star', name: 'appliesTo' },
  { value: 'teen 1 company', label: 'Teen 1 Company', name: 'appliesTo' },
  { value: 'teen 2 star', label: 'Teen Star', name: 'appliesTo' },
  { value: 'teen 2 company', label: 'Teen 2 Company', name: 'appliesTo' },
  { value: 'senior star', label: 'Senior Star', name: 'appliesTo' },
  { value: 'senior company', label: 'Senior Company', name: 'appliesTo' },
  { value: 'lyric', label: 'Lyric', name: 'appliesTo' },
  { value: 'jazz', label: 'Jazz', name: 'appliesTo' },
  { value: 'hip hop', label: 'Hip Hop', name: 'appliesTo' },
  { value: 'tap', label: 'Tap', name: 'appliesTo' },
  { value: 'production', label: 'Production', name: 'appliesTo' },
  { value: 'acro team', label: 'Acro Team', name: 'appliesTo' },
  { value: 'mini acro team', label: 'Mini Acro Team', name: 'appliesTo' },
];
const CheckboxAndLabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  margin-left: 0.75em;
  input {
    color: ${(props) =>
      props.disabled ? props.theme.disabledText : 'inherit'};
    margin-top: 4px;
    margin-right: 8px;
  }
`;
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
};
function CreateEventForm({ categories }) {
  console.log('categories', categories);
  const { inputs, handleChange } = useForm(initialInputState);
  const [appliesTo, setAppliesTo] = useState([]);
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showModal, toggleModal] = useState(false);

  const [createStudioEvent, { data, error, loading }] = useMutation(
    CREATE_STUDIO_EVENT,
    {
      refetchQueries: [{ query: STUDIO_EVENTS_QUERY }],
      awaitRefetchQueries: true,
      onCompleted: () => toggleModal(true),
    }
  );

  function handleAppliesToChange(category) {
    // if (!e) return;
    if (appliesTo.includes(category)) {
      const index = appliesTo.indexOf(category);
      const newAppliesTo = [...appliesTo];
      newAppliesTo.splice(index, 1);
      setAppliesTo(newAppliesTo);
    } else {
      const newAppliesTo = [category, ...appliesTo];
      setAppliesTo(newAppliesTo);
    }
    console.log('new applies to:', appliesTo);
  }

  function removeAppliesTo(selection) {
    const choices = { ...appliesTo };
    delete choices[selection];
    setAppliesTo(choices);
  }

  async function saveEvent(e) {
    e.preventDefault();
    const applyTo = Object.keys(appliesTo);
    const beginningDate = beginDate ? beginDate.toISOString() : null;
    const endingDate = endDate ? endDate.toISOString() : null;
    await createStudioEvent({
      variables: {
        ...inputs,
        appliesTo: applyTo,
        beginDate: beginningDate,
        endDate: endingDate,
      },
    });
  }

  return (
    <>
      <Card>
        <Form
          method='post'
          onSubmit={async (e) => {
            await saveEvent(e);
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <legend>Add A New Event</legend>
            <Error error={error} />
            <div className='input-item'>
              <label htmlFor='name'>
                Name <span className='required'> Required</span>
              </label>
              <input
                required
                type='text'
                name='name'
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className='form-row'>
              <div className='row-item'>
                <label htmlFor='type'>
                  Type: <span className='required'> Required</span>
                </label>
                <select
                  required
                  id='type'
                  name='type'
                  value={inputs.type}
                  onChange={handleChange}
                >
                  <option default value={'all'} disabled>
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
            </div>
            <div className='form-row'>
              <h3>This event applies to:</h3>
            </div>
            <div className='form-row'>
              <div className='row-item'>
                <legend>
                  Age Division: <span className='required'> Required</span>
                </legend>
                {categories.ageDivisions.map((ageDivision) => (
                  <CheckboxAndLabelContainer key={ageDivision}>
                    <label>
                      <input
                        type='checkbox'
                        checked={appliesTo.includes(ageDivision)}
                        value={ageDivision}
                        onChange={() => handleAppliesToChange(ageDivision)}
                      />
                      {ageDivision}
                    </label>
                  </CheckboxAndLabelContainer>
                ))}
              </div>
              <div className='row-item'>
                <legend>
                  Competitive Level: <span className='required'> Required</span>
                </legend>
                {categories.competitiveLevels.map((compLevel) => (
                  <CheckboxAndLabelContainer key={compLevel}>
                    <label>
                      <input
                        type='checkbox'
                        checked={appliesTo.includes(compLevel)}
                        value={compLevel}
                        onChange={() => handleAppliesToChange(compLevel)}
                      />
                      {compLevel}
                    </label>
                  </CheckboxAndLabelContainer>
                ))}
              </div>
              <div className='row-item'>
                <legend>
                  Style: <span className='required'> Required</span>
                </legend>
                {categories.styles.map((style) => (
                  <CheckboxAndLabelContainer key={style}>
                    <label>
                      <input
                        type='checkbox'
                        checked={appliesTo.includes(style)}
                        value={style}
                        onChange={() => handleAppliesToChange(style)}
                      />
                      {style}
                    </label>
                  </CheckboxAndLabelContainer>
                ))}
              </div>
            </div>
            {/* <SelectChoices>
              {Object.entries(appliesTo).map((entry) => (
                <li key={entry[0]}>
                  {entry[1]}
                  <span>
                    <button
                      className='btn-icon'
                      type='button'
                      onClick={() => removeAppliesTo(entry[0])}
                    >
                      X
                    </button>
                  </span>
                </li>
              ))}
            </SelectChoices> */}
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
            <div className='input-item'>
              <label htmlFor='website'>Website</label>
              <input
                type='text'
                name='url'
                value={inputs.url}
                onChange={handleChange}
              />
            </div>
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
              <label htmlFor='address1'>Address Line 1</label>
              <input
                type='text'
                name='address1'
                value={inputs.address1}
                onChange={handleChange}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='address2'>Address Line 2</label>
              <input
                type='text'
                name='address2'
                value={inputs.address2}
                onChange={handleChange}
              />
            </div>
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
                rows='4'
                value={inputs.notes}
                onChange={handleChange}
              />
            </div>
            {/* footer */}
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
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {error && (
            <>
              <p>
                Warning: there was a problem creating the event. Please try
                again:
              </p>
              <button
                className='btn-action-primary'
                role='button'
                onClick={() => toggleModal(false)}
              >
                Try Again
              </button>
            </>
          )}

          {data?.createStudioEvent && (
            <p>Success - you created {data.createStudioEvent.name}</p>
          )}
          <div className='modal-options'>
            <button
              className='btn-action-primary'
              role='button'
              onClick={() => toggleModal(false)}
            >
              Create Another Event
            </button>
            <Link href='/studio/events'>
              <a className='btn-action-secondary'>
                I'm finished creating events
              </a>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateEventForm;
