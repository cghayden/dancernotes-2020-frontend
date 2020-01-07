import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../Error";
import { PARENT_USER_QUERY } from "./ParentUserQuery";
import { UPDATE_DANCER_MUTATION } from "./UpdateDancer";
import styled from "styled-components";
import { DancerCardHeaderStyles } from "./DancerCard";

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

const CREATE_DANCER = gql`
  mutation CREATE_DANCER($firstName: String!, $avatar: String) {
    createDancer(firstName: $firstName, avatar: $avatar) {
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
  uploadFile = async dancerId => {
    const data = new FormData();
    data.append("file", this.state.avatarFileToUploadToCloudinary);
    data.append("upload_preset", "dancernotes-avatars");
    data.append("tags", dancerId);

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
    });
  };

  saveNewDancer = async (e, createDancerMutation, updateDancerMutation) => {
    e.preventDefault();
    //1 .save dancer
    const newDancer = await createDancerMutation({
      variables: { ...this.state, previewAvatar: "" }
    });
    //2 get dancerId
    const newDancerId = newDancer.data.createDancer.id;

    //3 upload avatar with tag of dancer id
    if (this.state.avatarFileToUploadToCloudinary) {
      await this.uploadFile(newDancerId);
      const { avatar, existingAvatarId } = this.state;
      //4 update dancer in prisma with avatar url
      await updateDancerMutation({
        variables: { id: newDancerId, avatar, existingAvatarId }
      });
    }

    this.setState({
      firstName: "",
      avatar: "",
      avatarPreview: "",
      existingAvatarId: ""
    });
    this.props.toggleAddDancer(false);
  };

  render() {
    const { firstName, previewAvatar } = this.state;
    const { toggleAddDancer } = this.props;
    return (
      <Mutation mutation={UPDATE_DANCER_MUTATION}>
        {(
          updateDancer,
          { error: errorLoadingAvatar, loading: loadingAvatar }
        ) => (
          <Mutation
            mutation={CREATE_DANCER}
            //dont send the previewAvatar, only 'avatar', the url from cloudinary
            refetchQueries={[{ query: PARENT_USER_QUERY }]}
          >
            {(createDancer, { error, loading }) => (
              <>
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
                <Form
                  method="post"
                  onSubmit={e =>
                    this.saveNewDancer(e, createDancer, updateDancer)
                  }
                >
                  <fieldset
                    disabled={loading || loadingAvatar}
                    aria-busy={loading || loadingAvatar}
                  >
                    {" "}
                    <h2 style={{ textAlign: "center" }}>Add a Dancer</h2>
                    <Error error={error || errorLoadingAvatar} />
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
                    <button
                      type="button"
                      onClick={() => toggleAddDancer(false)}
                    >
                      Cancel
                    </button>
                  </fieldset>
                </Form>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default CreateDancerForm;
