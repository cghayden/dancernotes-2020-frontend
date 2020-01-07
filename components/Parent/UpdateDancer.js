import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../../components/Error";
import styled from "styled-components";

const UpdateDancerForm = styled(Form)`
  box-shadow: none;
  padding: 0;
`;

const UPDATE_DANCER_MUTATION = gql`
  mutation UPDATE_DANCER_MUTATION(
    $id: ID!
    $firstName: String
    $avatar: String
    $existingAvatarId: String
    $newAvatarId: String
  ) {
    updateDancer(
      id: $id
      firstName: $firstName
      avatar: $avatar
      existingAvatarId: $existingAvatarId
      newAvatarId: $newAvatarId
    ) {
      id
      firstName
      avatar
    }
  }
`;

class UpdateDancer extends Component {
  state = {
    changePicture: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  previewAvatar = (e, showAvatarPreview) => {
    const avatarFileToUploadToCloudinary = e.target.files[0];
    this.setState({ avatarFileToUploadToCloudinary });
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
  };

  uploadNewAvatar = async () => {
    const data = new FormData();
    data.append("file", this.state.avatarFileToUploadToCloudinary);
    data.append("upload_preset", "dancernotes-avatars");
    data.append("tags", this.props.dancer.id);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();

    this.setState({
      avatar: file.eager[0].secure_url,
      newAvatarId: file.public_id
    });
  };

  updateDancer = async (e, updateDancerMutation) => {
    e.preventDefault();
    //if newAvatar, upload img to cloudinary, and get new url form cloudinary into this.state.avatar
    if (this.state.avatarFileToUploadToCloudinary) {
      await this.uploadNewAvatar();
    }
    await updateDancerMutation({
      variables: {
        id: this.props.dancer.id,
        existingAvatarId: this.props.dancer.existingAvatarId,
        ...this.state
      }
    });
    this.props.closeFunc();
  };

  render() {
    const { dancer, closeFunc, hasAvatar, showAvatarPreview } = this.props;
    return (
      <Mutation mutation={UPDATE_DANCER_MUTATION}>
        {(updateDancer, { loading, error }) => (
          <UpdateDancerForm onSubmit={e => this.updateDancer(e, updateDancer)}>
            <Error error={error} />
            <fieldset
              disabled={loading || this.state.loadingAvatar}
              aria-busy={loading || this.state.loadingAvatar}
            >
              <h5>Update {dancer.firstName}'s Profile</h5>
              <div className="input-item">
                <label htmlFor="firstName">Name </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="firstName"
                  onChange={this.handleChange}
                  defaultValue={dancer.firstName}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  this.setState({
                    changePicture: !this.state.changePicture
                  })
                }
              >
                {hasAvatar ? `Change Picture` : `Add a picture`}
              </button>
              {this.state.changePicture && (
                <div className="input-item">
                  <label htmlFor="image">Choose an Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    placeholder="Image for Avatar"
                    onChange={e => this.previewAvatar(e, showAvatarPreview)}
                  />
                </div>
              )}
              <div className="form-footer">
                <button type="submit" aria-busy={loading}>
                  Sav
                  {loading ? "ing " : "e "} Changes
                </button>
                <button
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
          </UpdateDancerForm>
        )}
      </Mutation>
    );
  }
}
export default UpdateDancer;
export { UPDATE_DANCER_MUTATION };
