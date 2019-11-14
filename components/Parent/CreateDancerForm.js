import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../Error";
import { PARENT_USER_QUERY } from "./ParentUserQuery";
import styled from "styled-components";

//same as DancerCard with height modification
const CreateFormHeader = styled.div`
  height: 50px;
  position: relative;
  background: ${props => props.theme.gray0};
  margin-top: 60px;
  margin-bottom: -20px;
  border-radius: 5px 5px 0 0;
  width: 90%;
  max-width: 600px;
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

const CardBody = styled(CreateFormHeader)`
  height: auto;
  border-radius: 0 0 5px 5px;
  margin-top: -1rem;
  padding-top: 0;
  background: ${props => props.theme.gray0};
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
    firstName: "",
    avatar: "",
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async e => {
    this.setState({ loadingAvatar: true });
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dancernotes-avatars");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      {
        method: "POST",
        body: data,
      },
    );
    const file = await res.json();
    this.setState({
      avatar: file.eager[0].secure_url,
      loadingAvatar: false,
    });
  };

  render() {
    const { avatar, loadingAvatar, firstName } = this.state;
    return (
      <Mutation
        mutation={CREATE_DANCER}
        variables={this.state}
        refetchQueries={[{ query: PARENT_USER_QUERY }]}
      >
        {(createDancer, { error, loading }) => (
          <>
            <CreateFormHeader>
              <ImageDiv avatar={avatar}>
                {avatar ? (
                  <img src={avatar} alt={`dancer's picture`} />
                ) : (
                  <p>{firstName && firstName[0]}</p>
                )}
              </ImageDiv>
            </CreateFormHeader>
            <CardBody>
              <Form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createDancer();
                  this.setState({
                    firstName: "",
                    avatar: "",
                  });
                  setFormVisible(false);
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
                      Add a picture of your dancer easily identify the
                      activities he/she is involved in.
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="file"
                      placeholder="Upload a picture of your dancer"
                      onChange={this.uploadFile}
                    />
                  </div>

                  <button type="submit">Add Dancer to my Account</button>
                  <button
                    type="button"
                    onClick={() => this.props.toggleAddDancer(false)}
                  >
                    Cancel
                  </button>
                </fieldset>
              </Form>
            </CardBody>
          </>
        )}
      </Mutation>
    );
  }
}

export default CreateDancerForm;
