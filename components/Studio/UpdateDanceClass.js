import { useState, Fragment } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'
import Form from '../styles/Form'
import Card from '../styles/Card'
import useForm from '../../lib/useForm'
import Modal from '../Modal'
import DeleteDanceClass from '../DeleteDanceClass'
import { DELETE_CLOUDINARY_ASSET } from '../../components/Mutations'
import { ALL_DANCE_CLASSES_QUERY } from './Queries'
import SaveCancelDelete from '../SaveCancelDelete'

const UPDATE_DANCECLASS_MUTATION = gql`
  mutation UPDATE_DANCECLASS_MUTATION(
    $id: ID!
    $name: String
    $style: String
    $competitiveLevel: String
    $ageDivision: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $music: String
    $musicId: String
    $performanceName: String
    $size: String
    $entryNumber: String
    $entryDay: String
    $entryTime: String
  ) {
    updateDanceClass(
      id: $id
      name: $name
      style: $style
      competitiveLevel: $competitiveLevel
      ageDivision: $ageDivision
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      music: $music
      musicId: $musicId
      performanceName: $performanceName
      size: $size
      entryNumber: $entryNumber
      entryDay: $entryDay
      entryTime: $entryTime
    ) {
      id
      name
    }
  }
`

const initialInputState = {}

function UpdateDanceClass({ danceClass, studio }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState)
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState()
  const [loadingSong, setLoadingSong] = useState(false)
  const [showModal, toggleModal] = useState(false)
  const [status, setStatus] = useState()
  const [showFileInput, toggleFileInput] = useState(false)

  const [
    updateDanceClass,
    {
      data: updatedDance,
      loading: updatingDanceClass,
      error: errorUpdatingDanceClass,
    },
  ] = useMutation(UPDATE_DANCECLASS_MUTATION, {
    onError: () => cloudinaryCleanup,
    variables: { ...inputs, id: danceClass.id },
    refetchQueries: [{ query: ALL_DANCE_CLASSES_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      resetForm()
    },
  })

  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset },
  ] = useMutation(DELETE_CLOUDINARY_ASSET)

  const updatedDanceClass = updatedDance && updatedDance.updateDanceClass
  const loading = loadingSong || updatingDanceClass || deletingAsset
  const cloudinaryCleanup = () => {
    if (inputs.musicId) {
      deleteCloudinaryAsset({
        variables: { publicId: inputs.musicId, resourceType: 'video' },
      })
    }
  }
  function resetForm() {
    updateInputs({ ...initialInputState })
    toggleFileInput(false)
    setStatus()
  }

  function setSongtoState(e) {
    const audioFile = e.target.files[0]
    updateInputs({ ...inputs, audioFile })
  }

  async function saveChanges(e) {
    e.preventDefault()
    //A. update class with audioFile:
    if (inputs.audioFile) {
      // 1. if dance already has a song, delete it
      setLoadingSong(true)
      if (danceClass.musicId) {
        setStatus('Deleting Old Music')
        await deleteCloudinaryAsset({
          variables: { publicId: danceClass.musicId, resourceType: 'video' },
        })
      }
      //2. upload new song
      setStatus('Uploading Music...')
      await uploadSong(danceClass.id, inputs.audioFile, studio.id).catch(
        (err) => {
          //if error uploading to cloudinary, delete from inputs.  Why? because if there are no other updates besides the music, the update does not need to be run, because the music upload to cloudinary has failed.
          delete inputs.audioFile
          setCloudinaryUploadError(err)
        }
      )
      setLoadingSong(false)
      //update danceclass with song info in inputs. if upload song errored out, and music was the only update, the update will not run.
      if (Object.keys(inputs).length > 0) {
        setStatus('Updating Class')
        await updateDanceClass()
      }
    }
    // B. update class without audiofile
    else {
      setStatus('Updating Class')
      await updateDanceClass()
    }
    //c. clean up
    setStatus()
    toggleModal(true)
    resetForm()
  }

  async function uploadSong(danceClassId, asset, assetOwnerId) {
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
      delete inputs.audioFile
    } else {
      updateInputs({
        ...inputs,
        music: file.secure_url,
        musicId: file.public_id,
      })
    }
  }

  // disable submission of empty state if no updates are made
  const disableButton = Object.keys(inputs).length < 1

  return (
    <Fragment>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorUpdatingDanceClass && (
            <>
              <p>
                Warning: there was a problem saving your class. Please try
                again:
              </p>
              <button role='button' onClick={() => toggleModal(false)}>
                Try Again
              </button>
              <Link href={`/studio/home`}>
                <a>Never Mind!</a>
              </Link>
            </>
          )}

          {updatedDanceClass && (
            <p>Success - you updated {updatedDanceClass.name}</p>
          )}
          {updatedDanceClass && errorUploadingToCloudinary && (
            <>
              <p>
                Success - you updated
                {updatedDanceClass.name}
              </p>
              <p>
                Warning: there was a problem uploading the music for
                {updatedDanceClass.name}. You can try to add music now or later
                by updating the dance class:
                <Link href={`/studio/updateClass/${updatedDanceClass.id}`}>
                  <a>Update Class</a>
                </Link>
              </p>
            </>
          )}
          <Link href='/studio/classes'>
            <a>Return to Classes</a>
          </Link>
        </div>
      </Modal>
      <Card>
        <Form onSubmit={(e) => saveChanges(e)} id='updateClass'>
          <h2>Update {danceClass.name}</h2>
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <Error error={error} /> */}
            <div className='input-item'>
              <label htmlFor='name'>Class Name </label>
              <input
                required
                type='text'
                name='name'
                placeholder='name'
                defaultValue={danceClass.name}
                onChange={handleChange}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='performanceName'>Performance Name</label>
              <input
                type='text'
                name='performanceName'
                placeholder='Performance Name, or Name of Song'
                defaultValue={danceClass.performanceName}
                onChange={handleChange}
              />
            </div>
            <button
              type='button'
              className='btn-action-primary-outline'
              onClick={() => toggleFileInput(true)}
            >
              Add/Change Music
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
            <div className='input-item'>
              <label htmlFor='size'>
                {`Size...(Currently ${danceClass.size})`}
              </label>
              <select
                id='size'
                name='size'
                defaultValue={danceClass.size}
                onChange={handleChange}
              >
                <option value='Group'>Group</option>
                <option value='Solo'>Solo</option>
                <option value='Duo'>Duo</option>
                <option value='Trio'>Trio</option>
              </select>
            </div>
            <section>
              <h3>Class Categories</h3>
              <div className='form-row'>
                <div className='form-row-item'>
                  <label htmlFor='style'>Style: </label>

                  <select
                    required
                    id='style'
                    name='style'
                    defaultValue={danceClass.style}
                    onChange={handleChange}
                  >
                    {studio.styles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-row-item'>
                  <label htmlFor='competitiveLevel'>Competitive Team ?: </label>

                  <select
                    required
                    id='competitiveLevel'
                    name='competitiveLevel'
                    defaultValue={danceClass.competitiveLevel}
                    onChange={handleChange}
                  >
                    {studio.competitiveLevels.map((competitiveLevel) => (
                      <option key={competitiveLevel} value={competitiveLevel}>
                        {competitiveLevel}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-row-item'>
                  <label htmlFor='ageDivision'>Age Division: </label>

                  <select
                    required
                    id='ageDivision'
                    name='ageDivision'
                    defaultValue={danceClass.ageDivision}
                    onChange={handleChange}
                  >
                    {studio.ageDivisions.map((ageDivision) => (
                      <option key={ageDivision} value={ageDivision}>
                        {ageDivision}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            <div className='form-row'>
              <div className='day form-row-item'>
                <label htmlFor='day'>Day:</label>
                <select
                  id='day'
                  name='day'
                  defaultValue={danceClass.day}
                  onChange={handleChange}
                >
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
                  defaultValue={danceClass.startTime}
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
                  defaultValue={danceClass.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-row-item'>
                <label htmlFor='tights'>Tights </label>
                <input
                  type='text'
                  name='tights'
                  placeholder='The style of tights required...'
                  defaultValue={danceClass.tights}
                  onChange={handleChange}
                />
              </div>

              <div className='form-row-item'>
                <label htmlFor='shoes'>Shoes </label>
                <input
                  type='text'
                  name='shoes'
                  placeholder='The style of shoes required...'
                  defaultValue={danceClass.shoes}
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
                rows='5'
                defaultValue={danceClass.notes}
                onChange={handleChange}
              />
            </div>
            <section>
              <div>
                <h3>Competition Entry Information</h3>
                <button
                  onClick={() => {
                    updateDanceClass({
                      variables: {
                        entryDay: null,
                        entryTime: null,
                        entryNumber: null,
                      },
                    })
                  }}
                >
                  clear
                </button>
              </div>
              <div className='form-row'>
                <div className='form-row-item'>
                  <label htmlFor='entryNumber'>Entry Number:</label>
                  <input
                    type='text'
                    id='entryNumber'
                    name='entryNumber'
                    defaultValue={
                      danceClass.entryNumber ? danceClass.entryNumber : ''
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className='day form-row-item'>
                  <label htmlFor='entryDay'>Day:</label>
                  <select
                    id='entryDay'
                    name='entryDay'
                    defaultValue={danceClass.entryDay}
                    onChange={handleChange}
                  >
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
                  <label htmlFor='entryTime'>Entry Time: </label>
                  <input
                    type='time'
                    id='entryTime'
                    name='entryTime'
                    min='0:00'
                    max='23:59'
                    defaultValue={danceClass.entryTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <p>{status}</p>
            {/* <SaveCancelDelete
              formId='updateClass'
              loading={loading}
              disableButton={disableButton}
              danceClassId={danceClass.id}
            /> */}
            <div className='form-footer'>
              <button
                className='btn-action-primary'
                type='submit'
                disabled={disableButton}
              >
                SAV
                {loading ? 'ING ' : 'E '} Class
              </button>
              <button
                className='btn-action-secondary'
                type='button'
                onClick={() =>
                  Router.push({
                    pathname: '/studio/classes',
                  })
                }
              >
                Cancel
              </button>
              <DeleteDanceClass id={danceClass.id} />
            </div>
          </fieldset>
        </Form>
      </Card>
    </Fragment>
  )
}

export default UpdateDanceClass
export { UPDATE_DANCECLASS_MUTATION }
