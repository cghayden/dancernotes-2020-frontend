import { useState } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import { ALL_DANCE_CLASSES_QUERY } from './Queries'
import { UPDATE_DANCECLASS_MUTATION } from './UpdateDanceClass'
import { DELETE_CLOUDINARY_ASSET } from '../Mutations'
import Form from '../styles/Form'
import Card from '../styles/Card'
import useForm from '../../utilities/useForm'
import Modal from '../Modal'

const CREATE_DANCE_CLASS_MUTATION = gql`
  mutation CREATE_DANCE_CLASS_MUTATION(
    $name: String!
    $performanceName: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $competitiveLevel: String
    $style: String
    $ageDivision: String
    $size: String
  ) {
    createDanceClass(
      name: $name
      performanceName: $performanceName
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      competitiveLevel: $competitiveLevel
      style: $style
      ageDivision: $ageDivision
      size: $size
    ) {
      name
      size
      id
    }
  }
`

const initialInputState = {
  name: '',
  day: '',
  startTime: '',
  endTime: '',
  style: '',
  competitiveLevel: '',
  ageDivision: '',
  performanceName: '',
  shoes: '',
  tights: '',
  notes: '',
  showSuccessMessage: false,
  size: '',
  audioFile: '',
}

function CreateDanceClass({ studio }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState)
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState()
  const [loadingSong, setLoadingSong] = useState(false)
  const [showModal, toggleModal] = useState(false)
  const [status, setStatus] = useState()
  const [showFileInput, toggleFileInput] = useState(false)

  const [musicId, setMusicId] = useState({})

  const [
    createDanceClass,
    {
      data: newDance,
      loading: creatingDanceClass,
      error: errorCreatingDanceClass,
    },
  ] = useMutation(CREATE_DANCE_CLASS_MUTATION, {
    variables: { ...inputs },
    refetchQueries: [{ query: ALL_DANCE_CLASSES_QUERY }],
    awaitRefetchQueries: true,
  })

  const [
    updateDanceClass,
    {
      data: updatedDance,
      error: errorUpdatingDanceClass,
      loading: updatingDanceClass,
    },
  ] = useMutation(UPDATE_DANCECLASS_MUTATION, {
    onError: () => cloudinaryCleanup(),
    refetchQueries: [{ query: ALL_DANCE_CLASSES_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      resetForm()
    },
  })

  const [
    deleteCloudinaryAsset,
    { error: errorDeletingAsset, loading: deletingAsset },
  ] = useMutation(DELETE_CLOUDINARY_ASSET)

  const newDanceClass = newDance && newDance.createDanceClass
  const errorUploadingSong =
    errorUpdatingDanceClass || errorUploadingToCloudinary
  const loading = loadingSong || updatingDanceClass || creatingDanceClass

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

  async function saveNewDanceClass(e) {
    e.preventDefault()
    setStatus('Creating Class...')
    const newDanceClass = await createDanceClass()
    //A. if music file is queued in state, create dance, upload music with tag of routineId, then update routine with the music url and musicId
    if (inputs.audioFile) {
      setStatus('Uploading Music...')
      const newDanceClassId = newDanceClass.data.createDanceClass.id
      await uploadSongAndUpdateClass(
        newDanceClassId,
        inputs.audioFile,
        studio.id
      ).catch((err) => {
        setStatus()
        toggleModal(true)
        setCloudinaryUploadError(err)
      })
    }
    resetForm()
    toggleModal(true)
  }

  async function uploadSongAndUpdateClass(danceClassId, asset, assetOwnerId) {
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
    setLoadingSong(false)
    if (file.error) {
      setCloudinaryUploadError(file.error)
      setLoadingSong(false)
    } else {
      setStatus('Updating class...')
      setMusicId(file.public_id)
      await updateDanceClass({
        variables: {
          id: danceClassId,
          music: file.secure_url,
          musicId: file.public_id,
        },
      })
    }
    setStatus()
  }

  return (
    <>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorCreatingDanceClass && (
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

          {newDanceClass && <p>Success - you created {newDanceClass.name}</p>}
          {newDanceClass && errorUploadingSong && (
            <p>
              Warning: there was a problem uploading the music for{' '}
              {newDanceClass.name}. You can try to add music now or later by
              editing the class:
              <Link href={`/studio/updateClass/${newDanceClass.id}`}>
                <a>Update Class</a>
              </Link>
            </p>
          )}

          <button role='button' onClick={() => toggleModal(false)}>
            Create Another Class
          </button>
          <Link href='/studio/classes'>
            <a>I'm finished creating classes</a>
          </Link>
        </div>
      </Modal>
      <Card>
        <Form method='post' onSubmit={async (e) => await saveNewDanceClass(e)}>
          <fieldset disabled={loading} aria-busy={loading}>
            <legend>Add A New Dance Class To Your Schedule</legend>

            <div className='input-item'>
              <label htmlFor='name'>
                Class Name <span className='required'> Required</span>
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
              <label htmlFor='size'>
                Size: <span className='required'> Required</span>
              </label>
              <select
                required
                id='size'
                name='size'
                value={inputs.size}
                onChange={handleChange}
              >
                <option default value={''} disabled>
                  (Group/Solo/Duo/Trio)?
                </option>
                <option value='Group'>Group</option>
                <option value='Solo'>Solo</option>
                <option value='Duo'>Duo</option>
                <option value='Trio'>Trio</option>
              </select>
            </div>

            <section>
              <div>
                <h3>Class Categories</h3>
                <Link href='/studio/configureClassCategories'>
                  <a className='btn-action-primary btn-small'>
                    Edit Class Categories
                  </a>
                </Link>
              </div>
              <div className='form-row'>
                <div className='row-item'>
                  <label htmlFor='style'>Style: *</label>
                  <select
                    required
                    id='style'
                    name='style'
                    value={inputs.style}
                    onChange={handleChange}
                  >
                    <option default value={''} disabled>
                      Style...
                    </option>
                    {studio &&
                      studio.styles?.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='row-item'>
                  <label htmlFor='competitiveLevel'>
                    Competitive Level:{' '}
                    <span className='required'> Required</span>
                  </label>
                  <select
                    required
                    id='competitiveLevel'
                    name='competitiveLevel'
                    value={inputs.competitiveLevel}
                    onChange={handleChange}
                  >
                    <option default disabled value={''}>
                      Competitive Level...
                    </option>
                    {studio &&
                      studio.competitiveLevels?.map((competitiveLevel) => (
                        <option key={competitiveLevel} value={competitiveLevel}>
                          {competitiveLevel}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='row-item'>
                  <label htmlFor='ageDivision'>Age Division:</label>
                  <select
                    id='ageDivision'
                    name='ageDivision'
                    value={inputs.ageDivision}
                    onChange={handleChange}
                  >
                    <option default disabled value={''}>
                      Age Division...
                    </option>
                    {studio &&
                      studio.ageDivisions?.map((ageDivision) => (
                        <option key={ageDivision} value={ageDivision}>
                          {ageDivision}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </section>
            <section>
              <h3>Day & Time</h3>
              <div className='form-row'>
                <div className='form-row-item day'>
                  <label htmlFor='day'>Day: </label>
                  <select
                    id='day'
                    name='day'
                    value={inputs.day}
                    onChange={handleChange}
                  >
                    <option default value={''} disabled>
                      Day...
                    </option>
                    {/* <option value="TBD">TBD</option> */}
                    <option value='Mon.'>Mon.</option>
                    <option value='Tue.'>Tue.</option>
                    <option value='Wed.'>Wed.</option>
                    <option value='Thur.'>Thur.</option>
                    <option value='Fri.'>Fri.</option>
                    <option value='Sat.'>Sat.</option>
                    <option value='Sun.'>Sun.</option>
                  </select>
                </div>

                <div className='form-row-item'>
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

                <div className='form-row-item'>
                  <label htmlFor='endTime'>End Time: </label>
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
            </section>

            <section>
              <div className='input-item'>
                <label htmlFor='tights'>Tights:</label>
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
            </section>
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
              onClick={() => toggleFileInput(true)}
            >
              Add Music
            </button>
            {showFileInput && (
              <div className='input-item'>
                <label htmlFor='audioFile'>
                  Upload the music for this dance...
                </label>
                <input
                  type='file'
                  id='audioFile'
                  name='audioFile'
                  placeholder='Upload music for this dance'
                  onChange={setSongtoState}
                />
              </div>
            )}

            <p>{status}</p>
            <div className='form-footer'>
              <button
                className='btn-action-primary'
                type='submit'
                disabled={loading}
              >
                Sav
                {loading ? 'ing ' : 'e '} Class
              </button>
            </div>
          </fieldset>
        </Form>
      </Card>
    </>
  )
}

export default CreateDanceClass
export { Form }

// {inputs.showSuccessMessage && (
//   <SuccessMessage
//     closeFunc={closeSuccessMessage}
//   />
// )}
