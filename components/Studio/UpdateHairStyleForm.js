import { useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import Card from '../styles/Card'
import Form from '../styles/Form'
import Error from '../Error'
import Router from 'next/router'
import DeleteHairStyleButton from './DeleteHairstyleButton'
import { DELETE_CLOUDINARY_ASSET } from '../Mutations'
import { HAIRSTYLES_QUERY, UPDATE_HAIRSTYLE_MUTATION } from './Queries'
import useForm from '../../utilities/useForm'

const HairImage = styled.div`
  text-align: center;
  img {
    width: 300px;
    height: 300px;
  }
`
const initialInputState = {}

export default function UpdateHairStyleForm({ hairstyle }) {
  const { inputs, updateInputs, handleChange } = useForm()
  const [imagePreview, setImagePreview] = useState()
  const [imageForUpload, setImageForUpload] = useState()
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState()
  const [showModal, toggleModal] = useState(false)
  const [status, setStatus] = useState()

  const [
    updateHairstyle,
    { data, loading: loadingHairstyle, error: errorLoadingHairstyle },
  ] = useMutation(UPDATE_HAIRSTYLE_MUTATION, {
    variables: {
      ...inputs,
      id: hairstyle.id,
    },
    refetchQueries: [{ query: HAIRSTYLES_QUERY }],
    awaitRefetchQueries: true,
    onError: () => handleError(),
    onCompleted: () => {
      resetForm()
      Router.push({
        pathname: `/studio/hairstyles/${hairstyle.id}`,
      })
    },
  })
  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset },
  ] = useMutation(DELETE_CLOUDINARY_ASSET)

  const loading = loadingHairstyle || deletingAsset
  let error =
    errorLoadingHairstyle || errorUploadingToCloudinary || errorDeletingAsset
  function resetForm() {
    updateInputs({ ...initialInputState })
    setStatus()
  }
  const handleError = () => {
    cloudinaryCleanup()
    resetForm()
  }

  const cloudinaryCleanup = () => {
    if (inputs.imageId) {
      deleteCloudinaryAsset({
        variables: { publicId: inputs.imageId, resourceType: 'image' },
      })
    }
  }
  function handleFileInput(e) {
    setImageForUpload(e.target.files[0])
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      // get img from chosen file render thumbnail/avatar.
      const readerResult = e.target.result
      setImagePreview(readerResult)
    }
    // read the image file as a data URL in order to display in html<img>.
    reader.readAsDataURL(file)
  }

  async function uploadNewImage() {
    const data = new FormData()
    data.append('file', imageForUpload)
    data.append('upload_preset', 'dancernotes-hairstyles')
    data.append('tags', [hairstyle.id, hairstyle.studio.id])

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/coreytesting/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()
    if (file.error) {
      setCloudinaryUploadError(file.error)
    } else {
      // file upload successful, set url and id to input state to send with update
      updateInputs({
        ...inputs,
        image: file.secure_url,
        imageId: file.public_id,
      })
    }
  }

  async function saveChanges(e) {
    e.preventDefault()
    setStatus('Saving Changes...')
    // Delete old Image from cloudinary, and upload new, ONLY ON SAVE
    if (imageForUpload) {
      // if hairstyle already has an image, delete it.
      if (hairstyle.imageId) {
        await deleteCloudinaryAsset({
          variables: { publicId: hairstyle.imageId, resourceType: 'image' },
        })
      }
      await uploadNewImage().catch((err) => {
        delete inputs.image
        delete inputs.imageId
        setCloudinaryUploadError(err)
      })
    }
    await updateHairstyle().catch((err) => {
      console.log(err)
      error = err
      cloudinaryCleanup()
    })
  }

  const image = imagePreview ? imagePreview : hairstyle.image

  return (
    <Card>
      <Form method='post' onSubmit={(e) => saveChanges(e)}>
        <h3>Edit Hairstyle</h3>
        <HairImage>
          {image && <img src={image} alt={'image of hairstyle'} />}
        </HairImage>
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <div className='input-item'>
            <label htmlFor='name'>Name</label>
            <input
              required
              type='text'
              name='name'
              defaultValue={hairstyle.name}
              onChange={handleChange}
            />
          </div>

          <div className='input-item'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              name='description'
              defaultValue={hairstyle.description}
              onChange={handleChange}
            />
          </div>

          <div className='input-item'>
            <label htmlFor='image'>Add / Change Image</label>
            <input
              type='file'
              id='image'
              name='file'
              placeholder='Upload an Image'
              onChange={() => handleFileInput()}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='link'>Link to an instructional video:</label>
            <input
              type='text'
              id='link'
              name='link'
              placeholder='Paste link here'
              onChange={handleChange}
            />
          </div>
          <div className='form-footer'>
            <button
              className='btn-action-primary'
              // disabled={disableButton}
              type='submit'
            >
              Sav{loading ? 'ing' : 'e'} Hairstyle
            </button>
            <DeleteHairStyleButton id={hairstyle.id} />
          </div>
        </fieldset>
      </Form>
    </Card>
  )
}
