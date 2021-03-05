import { useState, Fragment } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Link from 'next/link'
import { ALL_Rs, PARENT_USER_QUERY } from './Queries'
import { UPDATE_CUSTOM_ROUTINE } from './UpdateCustomRoutine'
import { DELETE_CLOUDINARY_ASSET } from '../Mutations'

import { SelectChoices } from '../styles/SelectChoices'
import Form from '../styles/Form'
import Card from '../styles/Card'
import useForm from '../../utilities/useForm'
import CancelButton from '../CancelButton'

const CREATE_CUSTOM_ROUTINE_MUTATION = gql`
  mutation CREATE_CUSTOM_ROUTINE_MUTATION(
    $name: String!
    $performanceName: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $dancerIds: [ID!]!
    $studio: ID!
    $entryNumber: String
    $entryDay: String
    $entryTime: String
  ) {
    createCustomRoutine(
      name: $name
      performanceName: $performanceName
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      dancerIds: $dancerIds
      studio: $studio
      entryNumber: $entryNumber
      entryDay: $entryDay
      entryTime: $entryTime
    ) {
      name
      id
    }
  }
`

const Alert = styled.div`
  position: fixed;
  bottom: 50px;
  left: 10px;
  right: 10px;
  height: 300px;
  color: ${(props) => props.theme.blackText};
  background: ${(props) => props.theme.gray1};
  padding: 1rem;
  font-size: 1.2rem;
  p {
    padding: 1rem;
  }
`

const initialInputState = {
  name: '',
  performanceName: '',
  dancer: '',
  day: '',
  startTime: '',
  endTime: '',
  shoes: '',
  tights: '',
  notes: '',
  studio: '',
  entryNumber: '',
  entryDay: '',
  entryTime: '',
}

function CreateCustomRoutineForm({ parent }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState)
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState()
  const [loadingSong, setLoadingSong] = useState(false)
  const [showModal, toggleModal] = useState(false)
  const [status, setStatus] = useState()
  const [showFileInput, toggleFileInput] = useState(false)
  const [showCompInput, toggleCompInput] = useState(false)
  const [musicForUpload, setMusicForUpload] = useState()
  const [musicId, setMusicId] = useState({})
  const [dancerChoice, setDancerChoice] = useState(() =>
    parent.dancers.length > 1
      ? {}
      : { [parent.dancers[0].firstName]: parent.dancers[0].id }
  )

  const [
    createCustomRoutine,
    {
      data: newCustomRoutine,
      error: errorCreatingCustomRoutine,
      loading: creatingCustomRoutine,
    },
  ] = useMutation(CREATE_CUSTOM_ROUTINE_MUTATION, {
    variables: { ...inputs, dancerIds: Object.values(dancerChoice) },
    // onCompleted: () => {
    //   resetForm()
    // },
    refetchQueries: [{ query: ALL_Rs }, { query: PARENT_USER_QUERY }],
    awaitRefetchQueries: true,
  })

  const [
    updateCustomRoutine,
    { error: errorUpdatingDanceClass, loading: updatingDanceClass },
  ] = useMutation(UPDATE_CUSTOM_ROUTINE, {
    onError: () => cloudinaryCleanup(),
    refetchQueries: [{ query: ALL_Rs }],
  })

  const [
    deleteCloudinaryAsset,
    { error: errorDeletingAsset, loading: deletingAsset },
  ] = useMutation(DELETE_CLOUDINARY_ASSET)

  const newDanceClass = newCustomRoutine && newCustomRoutine.createCustomRoutine

  const loading = loadingSong || creatingCustomRoutine || updatingDanceClass
  const errorUploadingSong =
    errorUpdatingDanceClass || errorUploadingToCloudinary

  const cloudinaryCleanup = () => {
    if (musicId) {
      deleteCloudinaryAsset({
        variables: { publicId: musicId, resourceType: 'video' },
      })
    }
  }

  function resetForm() {
    updateInputs({ ...initialInputState })
    setMusicId()
    toggleFileInput(false)
    setStatus()
  }

  function setSongtoState(e) {
    const audioFile = e.target.files[0]
    updateInputs({ ...inputs, audioFile })
  }

  async function saveNewCustomRoutine(e) {
    e.preventDefault()
    setStatus('Creating Class...')
    const newCustomRoutine = await createCustomRoutine()
    //A. if music file is queued in state, create dance, upload music with tag of routineId, then update routine with the music url and musicId
    if (inputs.audioFile) {
      setStatus('Uploading Music...')
      const newCustomRoutineId = newCustomRoutine.data.createCustomRoutine.id
      await uploadSongAndUpdateRoutine(
        newCustomRoutineId,
        inputs.audioFile,
        parent.id
      ).catch((err) => {
        setStatus()
        toggleModal(true)
        setCloudinaryUploadError(err)
      })
    }
    resetForm()
    toggleModal(true)
  }

  async function uploadSongAndUpdateRoutine(danceClassId, asset, assetOwnerId) {
    setLoadingSong(true)
    const data = new FormData()
    data.append('file', asset)
    data.append('upload_preset', 'dancernotes-music')
    data.append('tags', [danceClassId, assetOwnerId])
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/coreytesting/video/upload',
      {
        method: 'POST',
        body: data,
      }
    ).catch((error) => {
      setCloudinaryUploadError(error)
    })
    const file = await res.json()
    if (file.error) {
      setCloudinaryUploadError(file.error)
      setLoadingSong(false)
    } else {
      //set info to state in case there is an error updating the class, we can delete this music from cloudinary
      setStatus('Updating class...')
      setMusicId(file.public_id)
      await updateCustomRoutine({
        variables: {
          id: danceClassId,
          music: file.secure_url,
          musicId: file.public_id,
        },
      })
    }
    setStatus()
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
    <Fragment>
      <Card>
        <Form
          method='post'
          onSubmit={async (e) => await saveNewCustomRoutine(e)}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Create Your Own Routine</h2>
            <div className='input-item'>
              <SelectChoices>
                <label htmlFor='dancer'>Dancer(s):*</label>
                {Object.entries(dancerChoice).map((dancer) => (
                  <li key={dancer[0]}>
                    <p>{dancer[0]}</p>
                    <button
                      type='button'
                      className='btn-icon'
                      onClick={() => removeChosenDancer(dancer[0])}
                    >
                      X
                    </button>
                  </li>
                ))}
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
            <div className='input-item'>
              <label htmlFor='name'>Name of Routine* </label>
              <input
                required
                pattern='(?!^ +$)^.+$'
                type='text'
                name='name'
                placeholder='name'
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='performanceName'>Performance Name</label>
              <input
                type='text'
                name='performanceName'
                placeholder='Performance Name, or Name of Song'
                value={inputs.performanceName}
                onChange={handleChange}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='studio'>Studio:*</label>
              <select
                required
                id='studio'
                name='studio'
                value={inputs.studio}
                onChange={handleChange}
              >
                <option default value={''} disabled>
                  Studio...
                </option>
                {parent &&
                  parent.studios.map((studio) => (
                    <option key={studio.id} value={studio.id}>
                      {studio.studioName}
                    </option>
                  ))}
                <option value={'none'}>None / Other</option>
              </select>
            </div>
            <div className='day'>
              <label htmlFor='day'>Day:</label>
              <select
                className='day'
                id='day'
                name='day'
                value={inputs.day}
                onChange={handleChange}
              >
                <option default value={''} disabled>
                  Day...
                </option>
                <option value='Mon.'>Mon.</option>
                <option value='Tue.'>Tue.</option>
                <option value='Wed.'>Wed.</option>
                <option value='Thur.'>Thur.</option>
                <option value='Fri.'>Fri.</option>
                <option value='Sat.'>Sat.</option>
                <option value='Sun.'>Sun.</option>
              </select>
            </div>
            <div className='time'>
              <div>
                <label htmlFor='startTime'>Start Time:</label>
                <input
                  type='time'
                  id='startTime'
                  name='startTime'
                  min='0:00'
                  max='23:59'
                  value={inputs.startTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='endTime'>End Time:</label>
                <input
                  type='time'
                  id='endTime'
                  name='endTime'
                  min='0:00'
                  max='23:59'
                  value={inputs.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='input-item'>
              <label htmlFor='tights'>Tights</label>
              <input
                type='text'
                name='tights'
                placeholder='The style of tights required...'
                value={inputs.tights}
                onChange={handleChange}
              />
            </div>

            <div className='input-item'>
              <label htmlFor='shoes'>Shoes</label>
              <input
                type='text'
                name='shoes'
                placeholder='The style of shoes required...'
                value={inputs.shoes}
                onChange={handleChange}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='notes'>Notes</label>
              <textarea
                id='notes'
                type='text'
                name='notes'
                rows='5'
                value={inputs.notes}
                onChange={handleChange}
              />
            </div>
            <button
              type='button'
              className='btn-action-primary-outline'
              onClick={() => toggleFileInput(!showFileInput)}
            >
              Add Music
            </button>
            <button
              type='button'
              className='btn-comp-outline'
              onClick={() => toggleFileInput(!showCompInput)}
            >
              Add Entry
            </button>
            {showFileInput && (
              <div className='input-item'>
                <label htmlFor='music'>
                  Upload the music for this dance...
                </label>
                <input
                  type='file'
                  id='audioFile'
                  name='audioFile'
                  placeholder='Upload the music for this dance'
                  onChange={setSongtoState}
                />
              </div>
            )}
            {showCompInput && (
              <section>
                <h3>Competition Entry Information</h3>
                <div className='form-row'>
                  <div className='form-row-item'>
                    <label htmlFor='entryNumber'>Entry Number:</label>
                    <input
                      type='text'
                      id='entryNumber'
                      name='entryNumber'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='day form-row-item'>
                    <label htmlFor='entryDay'>Day:</label>
                    <select
                      id='entryDay'
                      name='entryDay'
                      onChange={handleChange}
                    >
                      <option value='' disabled>
                        Day...
                      </option>
                      <option value='Sat.'>Sat.</option>
                      <option value='Sun.'>Sun.</option>
                      <option value='Mon.'>Mon.</option>
                      <option value='Tue.'>Tue.</option>
                      <option value='Wed.'>Wed.</option>
                      <option value='Thur.'>Thur.</option>
                      <option value='Fri.'>Fri.</option>
                    </select>
                  </div>
                  <div className='form-row-item'>
                    <label htmlFor='entryTime'>Entry Time: </label>
                    <input
                      type='time'
                      id='entryTime'
                      name='entryTime'
                      min='0:00'
                      max='23:59'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            )}

            <p>{status}</p>
            {showModal && (
              <Alert>
                {errorCreatingCustomRoutine && (
                  <>
                    <p>
                      Warning: there was a problem saving your class. Please try
                      again:
                    </p>
                    <button role='button' onClick={() => toggleModal(false)}>
                      Try Again
                    </button>
                  </>
                )}

                {newDanceClass && (
                  <p>Success - you created {newDanceClass.name}</p>
                )}
                {newDanceClass && errorUploadingSong && (
                  <p>
                    Warning: there was a problem uploading the music for{' '}
                    {newDanceClass.name}. You can try to add music now or later
                    by updating the dance class:
                    <Link href={`/parent/updateDance/${newDanceClass.id}`}>
                      <a>Update Class</a>
                    </Link>
                  </p>
                )}

                <button
                  style={{ marginBottom: '1rem' }}
                  role='button'
                  className='btn-action-primary'
                  onClick={() => {
                    resetForm()
                    toggleModal(false)
                  }}
                >
                  Create Another Routine
                </button>
                <Link href='/parent/routines'>
                  <a className='btn-action-secondary'>
                    I'm finished creating classes
                  </a>
                </Link>
              </Alert>
            )}
            <div className='form-footer'>
              <button
                className='btn-action-primary'
                type='submit'
                disabled={loading}
              >
                Creat
                {loading ? 'ing ' : 'e '} Class
              </button>
              <CancelButton />
            </div>
          </fieldset>
        </Form>
      </Card>
    </Fragment>
  )
}

export default CreateCustomRoutineForm
export { SelectChoices }
