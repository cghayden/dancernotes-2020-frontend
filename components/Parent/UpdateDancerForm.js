import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import Form from "../styles/Form";
import Error from "../Error";
import useForm from "../../lib/useForm";
import { DELETE_CLOUDINARY_ASSET } from "../Mutations";
import { PARENT_USER_QUERY } from "./Queries";

const FormStyles = styled(Form)`
  box-shadow: none;
  padding: 0;
`;

const UPDATE_DANCER_MUTATION = gql`
  mutation UPDATE_DANCER_MUTATION(
    $id: ID!
    $firstName: String
    $avatar: String
    $avatarId: String
  ) {
    updateDancer(
      id: $id
      firstName: $firstName
      avatar: $avatar
      avatarId: $avatarId
    ) {
      id
      firstName
      avatar
    }
  }
`;
const initialInputState = {};

function UpdateDancerForm({ dancer, closeFunc, hasAvatar, showAvatarPreview }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [showFileInput, toggleFileInput] = useState(false);
  const [avatarForUpload, setAvatarForUpload] = useState();
  const [status, setStatus] = useState();
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState();

  const [
    updateDancer,
    { data: updatedDancer, loading: updatingDancer, error: errorUpdatingDancer }
  ] = useMutation(UPDATE_DANCER_MUTATION, {
    variables: {
      ...inputs,
      id: dancer.id
    },
    refetchQueries: [{ query: PARENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onError: () => cloudinaryCleanup()
  });

  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET);

  const cloudinaryCleanup = () => {
    if (inputs.avatarId) {
      deleteCloudinaryAsset({
        variables: { publicId: inputs.avatarId, resourceType: "image" }
      });
    }
  };

  const loading = updatingDancer || deletingAsset;
  const error = errorUpdatingDancer || errorUploadingToCloudinary;
  function resetForm() {
    updateInputs({ ...initialInputState });
    setStatus();
  }
  function handleFileInput(e) {
    setAvatarForUpload(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      // get img from chosen file render thumbnail/avatar.
      const readerResult = e.target.result;
      //send preview url up to dancerCard:
      showAvatarPreview(readerResult);
    };
    // read the image file as a data URL in order to display in html<img>.
    reader.readAsDataURL(file);
  }

  async function uploadNewAvatar() {
    const data = new FormData();
    data.append("file", avatarForUpload);
    data.append("upload_preset", "dancernotes-avatars");
    data.append("tags", dancer.id);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    if (file.error) {
      setCloudinaryUploadError(file.error);
    } else {
      // file upload successful, set url and id to input state to send with update
      updateInputs({
        ...inputs,
        avatar: file.eager[0].secure_url,
        avatarId: file.public_id
      });
    }
  }

  async function saveChanges(e) {
    e.preventDefault();
    setStatus("Saving Changes...");
    //if newAvatar, upload img to cloudinary, and get new url form cloudinary into state.avatar
    if (avatarForUpload) {
      // if dancer already had an avatar, delete it.
      if (dancer.avatarId) {
        await deleteCloudinaryAsset({
          variables: { publicId: dancer.avatarId, resourceType: "image" }
        });
      }
      await uploadNewAvatar().catch(err => {
        delete inputs.avatar;
        delete inputs.avatarId;
        setCloudinaryUploadError(err);
      });
    }
    await updateDancer();
    closeFunc();
  }

  const disableButton = Object.keys(inputs).length < 1 && !avatarForUpload;

  return (
    <FormStyles onSubmit={e => saveChanges(e)}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <h5>Update {dancer.firstName}'s Profile</h5>
        <div className="input-item">
          <label htmlFor="firstName">Name </label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            defaultValue={dancer.firstName}
          />
        </div>
        <button
          type="button"
          className="btn-action-primary"
          onClick={() => toggleFileInput(!showFileInput)}
        >
          {hasAvatar ? `Change Picture` : `Add a picture`}
        </button>
        {showFileInput && (
          <div className="input-item">
            <label htmlFor="image">Choose an Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileInput}
            />
          </div>
        )}
        <p>{status}</p>
        <div className="form-footer">
          <button
            type="submit"
            disabled={loading || disableButton}
            aria-busy={loading}
          >
            Sav
            {loading ? "ing " : "e "} Changes
          </button>
          <button
            className="btn-danger"
            type="button"
            onClick={async () => {
              await showAvatarPreview("");
              closeFunc();
            }}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </FormStyles>
  );
}

export default UpdateDancerForm;
export { UPDATE_DANCER_MUTATION };
