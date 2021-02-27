import useForm from '../../utilities/useForm'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import Router from 'next/router'
import gql from 'graphql-tag'
import {
  HAIRSTYLES_QUERY,
  UPDATE_HAIRSTYLE_MUTATION,
} from '../../components/Studio/Queries'
import { DELETE_CLOUDINARY_ASSET } from '../Mutations'

import Form from '../styles/Form'
import Error from '../Error'
import Card from '../styles/Card'
import { useState } from 'react'

const CREATE_HAIRSTYLE_MUTATION = gql`
  mutation CREATE_HAIRSTYLE_MUTATION(
    $name: String!
    $link: String
    $description: String
  ) {
    createHairstyle(name: $name, link: $link, description: $description) {
      id
      name
      studio {
        id
      }
    }
  }
`
const HairstyleCardHeaderStyles = styled.div`
  height: 80px;
  position: relative;
  text-align: right;
  margin-bottom: -20px;
  z-index: 100;
`

const ImageDiv = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background: ${(props) => props.theme.gray2};
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  border: 5px solid ${(props) => props.theme.gray0};
  text-align: center;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: 5rem;
  }
`
const initialInputState = {
  name: '',
  image: '',
  link: '',
  description: '',
}

function CreateHairStyleForm() {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState)
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState()
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState()
  const [imageForUpload, setImageForUpload] = useState()
  // const [showModal, toggleModal] = useState(false)
  const [status, setStatus] = useState()

  const [createHairstyle, { data, error, loading }] = useMutation(
    CREATE_HAIRSTYLE_MUTATION,
    {
      variables: { ...inputs },
      onCompleted: () => {
        resetForm()
      },
      refetchQueries: [{ query: HAIRSTYLES_QUERY }],
    }
  )
  const [
    updateHairstyle,
    { error: errorUpdatingHairstyle, loading: updatingHairstyle },
  ] = useMutation(UPDATE_HAIRSTYLE_MUTATION)

  const [
    deleteCloudinaryAsset,
    { error: errorDeletingAsset, loading: deletingAsset },
  ] = useMutation(DELETE_CLOUDINARY_ASSET)

  function resetForm() {
    updateInputs({ ...initialInputState })
    setImagePreview()
    setImageForUpload()
    setStatus()
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

  //ONLY UPLOAD TO CLOUDINARY ON SAVE
  async function uploadImageAndUpdate(hairstyleId, assetOwnerId) {
    setStatus('Uploading Image...')
    setUploadingImage(true)
    const data = new FormData()
    data.append('file', imageForUpload)
    data.append('upload_preset', 'dancernotes-hairstyles')
    data.append('tags', [hairstyleId, assetOwnerId])

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/coreytesting/image/upload',
      {
        method: 'POST',
        body: data,
      }
    ).catch((error) => {
      setCloudinaryUploadError(error)
    })
    const file = await res.json()
    console.log('file', file)
    if (file.error) {
      setCloudinaryUploadError(file.error)
      setStatus()
      throw `Image Upload failed: ${file.error}`
    }
    setStatus('Saving Avatar...')
    setUploadingImage(false)
    await updateHairstyle({
      variables: {
        id: hairstyleId,
        image: file.secure_url,
        imageId: file.public_id,
      },
    }).catch(() => {
      // delete avatar file from cloudinary because there was an error updating the dancer with the song url and id
      deleteCloudinaryAsset({
        variables: {
          publicId: file.public_id,
          resourceType: 'image',
        },
      })
    })
  }

  async function saveNewHairstyle(e) {
    e.preventDefault()
    //1 .save hairstyle
    setStatus('Saving HairStyle...')
    const newHairstyle = await createHairstyle()
    //2 get hairstyleId and studioId for tags on cloudinary avatar
    const newHairstyleId = newHairstyle.data.createHairstyle.id
    const studioId = newHairstyle.data.createHairstyle.studio.id

    //3 upload image and save to hairstyle as update
    if (imageForUpload) {
      await uploadImageAndUpdate(newHairstyleId, studioId)
    }
    // toggleModal(true)
    resetForm()
  }

  return (
    <Card>
      <HairstyleCardHeaderStyles>
        {imagePreview && (
          <ImageDiv>
            <img src={imagePreview} alt={`image preview`} />
          </ImageDiv>
        )}
      </HairstyleCardHeaderStyles>
      <Form method='post' onSubmit={async (e) => saveNewHairstyle(e)}>
        <h2>Create a Hairstyle</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <div className='input-item'>
            <label htmlFor='name'>Name </label>
            <input
              required
              type='text'
              id='name'
              name='name'
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='description'>Description </label>
            <input
              id='description'
              type='text'
              name='description'
              value={inputs.description}
              onChange={handleChange}
            />
          </div>
          <div className='input-item'>
            <label htmlFor='image'>Image </label>
            <input
              type='file'
              id='image'
              name='image'
              placeholder='Upload an Image'
              onChange={handleFileInput}
            />
          </div>

          <div className='input-item'>
            <label htmlFor='link'>
              Include a link to an instructional video
            </label>
            <input
              type='text'
              id='link'
              name='link'
              placeholder='Paste link here'
              value={inputs.link}
              onChange={handleChange}
            />
          </div>

          <div className='form-footer'>
            <button className='btn-action-primary' type='submit'>
              Save
            </button>
            <button
              type='button'
              className='btn-danger'
              onClick={() => Router.push('hairstyles')}
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </Form>
    </Card>
  )
}

export default CreateHairStyleForm
