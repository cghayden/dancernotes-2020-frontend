import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import Form from "../styles/Form";
import Link from "next/link";
import Modal from "../Modal";
import BackButton from "../BackButton";
import { PARENT_USER_QUERY } from "./Queries";
import { DELETE_CLOUDINARY_ASSET } from "../Mutations";

import { UPDATE_DANCER_MUTATION } from "./UpdateDancer";
import { DancerCardContainer } from "./DancerCard";
import { DancerCardHeaderStyles } from "./DancerCard";
import useForm from "../../lib/useForm";

//same as DancerCard with z-index to put it on top of cardBody(form)
const ImageDiv = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background: ${props => props.theme.gray2};
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  border: 5px solid ${props => props.theme.gray0};
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
`;

const FormInCard = styled(Form)`
  padding: 0;
  width: 100%;
`;

const CREATE_DANCER = gql`
  mutation CREATE_DANCER($firstName: String!, $avatar: String) {
    createDancer(firstName: $firstName, avatar: $avatar) {
      id
      firstName
      avatar
    }
  }
`;

const initialInputState = {
  firstName: "",
  avatar: ""
};

function CreateDancerForm() {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState();
  const [avatarForUpload, setAvatarForUpload] = useState();
  const [showModal, toggleModal] = useState(false);
  const [status, setStatus] = useState();
  const [showFileInput, toggleFileInput] = useState(false);

  const [
    createDancer,
    { data: newDancer, error: errorCreatingDancer, loading: creatingDancer }
  ] = useMutation(CREATE_DANCER, {
    variables: { ...inputs },
    onCompleted: () => {
      resetForm();
    },
    refetchQueries: [{ query: PARENT_USER_QUERY }]
  });

  const [
    updateDancer,
    { error: errorUpdatingDancer, loading: updatingDancer }
  ] = useMutation(UPDATE_DANCER_MUTATION);

  const [
    deleteCloudinaryAsset,
    { error: errorDeletingAsset, loading: deletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET);

  const loading = creatingDancer || updatingDancer || uploadingAvatar;
  const errorUploadingAvatar =
    errorUpdatingDancer || errorUploadingToCloudinary;
  function resetForm() {
    updateInputs({ ...initialInputState });
    setAvatarPreview();
    setAvatarForUpload();
    toggleFileInput(false);
    setStatus();
  }

  function handleFileInput(e) {
    setAvatarForUpload(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      // get img from chosen file render thumbnail/avatar.
      const readerResult = e.target.result;
      setAvatarPreview(readerResult);
    };
    // read the image file as a data URL in order to display in html<img>.
    reader.readAsDataURL(file);
  }

  //ONLY UPLOAD TO CLOUDINARY ON SAVE
  async function uploadAvatarAndUpdate(dancerId) {
    setStatus("Uploading Avatar...");
    setUploadingAvatar(true);
    const data = new FormData();
    data.append("file", avatarForUpload);
    data.append("upload_preset", "dancernotes-avatars");
    data.append("tags", dancerId);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      {
        method: "POST",
        body: data
      }
    ).catch(error => {
      setCloudinaryUploadError(error);
    });
    const file = await res.json();
    if (file.error) {
      setCloudinaryUploadError(file.error);
      // setLoadingSong(false);
      throw `Image Upload failed: ${file.error}`;
    }
    setStatus("Saving Avatar...");
    setUploadingAvatar(false);
    await updateDancer({
      variables: {
        id: dancerId,
        avatar: file.eager[0].secure_url,
        avatarId: file.public_id
      }
    }).catch(() => {
      // delete song file from cloudinary because there was an error updating the dnace class with the song url and id
      deleteCloudinaryAsset({
        variables: {
          publicId: file.public_id
        }
      });
    });
  }

  async function saveNewDancer(e) {
    e.preventDefault();
    //1 .save dancer
    setStatus("Saving Dancer...");
    const newDancer = await createDancer();
    //2 get dancerId
    const newDancerId = newDancer.data.createDancer.id;

    //3 upload avatar and save to dancer as update
    if (avatarForUpload) {
      await uploadAvatarAndUpdate(newDancerId);
    }
    toggleModal(true);
    resetForm();
  }

  return (
    <Fragment>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorCreatingDancer && (
            <>
              <p>
                Warning: there was a problem saving your class. Please try
                again:
              </p>
              <button role="button" onClick={() => toggleModal(false)}>
                Try Again
              </button>
            </>
          )}

          {newDancer && <p>Success - you created {newDancer.name}</p>}
          {newDancer && errorUploadingAvatar && (
            <p>
              Warning: there was a problem uploading the image for
              {newDancer.name}. You can try to add an image now or later by
              updating the dancer
            </p>
          )}

          <button role="button" onClick={() => toggleModal(false)}>
            Create Another Dancer
          </button>
          <Link href="/parent/account/dancers">
            <a>I'm finished</a>
          </Link>
        </div>
      </Modal>
      <DancerCardContainer>
        <DancerCardHeaderStyles>
          <ImageDiv>
            {avatarPreview ? (
              <img src={avatarPreview} alt={`image preview`} />
            ) : (
              <p>{inputs.firstName && inputs.firstName[0]}</p>
            )}
          </ImageDiv>
        </DancerCardHeaderStyles>
        <FormInCard method="post" onSubmit={e => saveNewDancer(e)}>
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <Error error={error || errorLoadingAvatar} /> */}
            <div className="input-item">
              <label htmlFor="firstName">Name</label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="firstName"
                value={inputs.firstName}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="btn-dark"
              onClick={() => toggleFileInput(!showFileInput)}
            >
              Add Image
            </button>
            {showFileInput && (
              <div className="input-item">
                <label htmlFor="image">
                  Add a picture of your dancer to easily identify the activities
                  he/she is involved in. (ptional)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  placeholder="Upload a picture of your dancer"
                  onChange={handleFileInput}
                />
              </div>
            )}
            <p>{status}</p>
            <div className="form-footer">
              <button type="submit">Save Dancer</button>
              <BackButton text="Cancel" classNames="btn-danger" />
            </div>
          </fieldset>
        </FormInCard>
      </DancerCardContainer>
    </Fragment>
  );
}

export default CreateDancerForm;
