import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Card from "../styles/Card";
import Error from "../Error";
import { PARENT_USER_QUERY } from "./ParentUserQuery";
import styled from "styled-components";
import { DancerCardHeaderStyles } from "./DancerCard";
import CancelUpdateDancerButton from "./CancelUpdateDancerButton";

//same as DancerCard

const CardBody = styled(Form)`
  height: auto;
  border-radius: 0 0 5px 5px;
  margin-top: -1rem;
  background: ${props => props.theme.gray0};
`;

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
  margin-left: auto;
  margin-right: auto;
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

const CREATE_DANCER = gql`
  mutation CREATE_DANCER(
    $firstName: String!
    $avatar: String
    $existingAvatarId: String
  ) {
    createDancer(
      firstName: $firstName
      avatar: $avatar
      existingAvatarId: $existingAvatarId
    ) {
      id
      firstName
      avatar
    }
  }
`;

class CreateDancerForm extends Component {
  state = {
    previewAvatar: "",
    firstName: "",
    avatar: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  previewAvatar = e => {
    const avatarFileToUploadToCloudinary = e.target.files[0];
    this.setState({ avatarFileToUploadToCloudinary });
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      // get img from chosen file render thumbnail/avatar.
      const readerResult = e.target.result;
      this.setState({ previewAvatar: readerResult });
    };
    // read the image file as a data URL in order to display in html<img>.
    reader.readAsDataURL(file);
  };

  //ONLY UPLOAD TO CLOUDINARY ON SAVE
  uploadFile = async () => {
    const data = new FormData();
    data.append("file", this.state.avatarFileToUploadToCloudinary);
    // optional:
    data.append("tags", this.props.parentId);
    data.append("upload_preset", "dancernotes-avatars");

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
      existingAvatarId: file.public_id
      // loadingAvatar: false
    });
  };

  render() {
    const {
      existingAvatarId,
      loadingAvatar,
      firstName,
      previewAvatar
    } = this.state;
    const { toggleAddDancer } = this.props;
    return (
      <Mutation
        mutation={CREATE_DANCER}
        //dont send the previewAvatar, only 'avatar', the url from cloudinary
        variables={{ ...this.state, previewAvatar: "" }}
        refetchQueries={[{ query: PARENT_USER_QUERY }]}
      >
        {(createDancer, { error, loading }) => (
          <>
            <h2 style={{ textAlign: "center" }}>Add a Dancer</h2>
            <DancerCardHeaderStyles>
              <ImageDiv>
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    alt={`preview of dancer's picture to save`}
                  />
                ) : (
                  <p>{firstName && firstName[0]}</p>
                )}
              </ImageDiv>
            </DancerCardHeaderStyles>
            <CardBody
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                //1 .upload avatar
                await this.uploadFile();
                await createDancer();
                this.setState({
                  firstName: "",
                  avatar: "",
                  avatarPreview: "",
                  existingAvatarId: ""
                });
                toggleAddDancer(false);
              }}
            >
              <fieldset
                disabled={loading || loadingAvatar}
                aria-busy={loading || loadingAvatar}
              >
                <Error error={error} />
                <div className="input-item">
                  <label htmlFor="firstName">Name</label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-item">
                  <label htmlFor="image">
                    Add a picture of your dancer to easily identify the
                    activities he/she is involved in. (ptional)
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="file"
                    placeholder="Upload a picture of your dancer"
                    onChange={this.previewAvatar}
                  />
                </div>

                <button type="submit">Save Dancer</button>
                <CancelUpdateDancerButton
                  toggleAddDancer={toggleAddDancer}
                  existingAvatarId={existingAvatarId}
                />
              </fieldset>
            </CardBody>
          </>
        )}
      </Mutation>
    );
  }
}

export default CreateDancerForm;
