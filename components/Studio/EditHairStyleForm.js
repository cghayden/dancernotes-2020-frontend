import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Card from "../styles/Card";
import Form from "../styles/Form";
import Error from "../Error";
import { HAIRSTYLES_QUERY } from "../../pages/studio/hairstyles";
import DeleteHairStyleButton from "./DeleteHairstyleButton";

const UPDATE_HAIRSTYLE_MUTATION = gql`
  mutation UPDATE_HAIRSTYLE_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $image: String
    $link: String
  ) {
    updateHairStyle(
      id: $id
      name: $name
      description: $description
      image: $image
      link: $link
    ) {
      message
    }
  }
`;

const HairImage = styled.div`
  text-align: center;
  img {
    width: 300px;
    height: 300px;
  }
`;

export default class EditHairStyleForm extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  changeImage = async (e, oldImage) => {
    //TODO - Delete save old image to state to use path for deletion from cloudinary.
    // if cancel, old image remains in cloudinary
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dancernotes-hairstyleImages");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url
    });
  };

  render() {
    const { hairStyle, setShowEdit } = this.props;
    // disable submission of empty state if no updates are made
    const disableButton = Object.keys(this.state).length < 1;
    const image = this.state.image
      ? this.state.image
      : hairStyle.image
      ? hairStyle.image
      : null;
    return (
      <Mutation
        mutation={UPDATE_HAIRSTYLE_MUTATION}
        variables={{ id: hairStyle.id, ...this.state }}
        refetchQueries={[{ query: HAIRSTYLES_QUERY }]}
        awaitRefetchQueries={true}
      >
        {(updateHairStyle, { loading, error }) => {
          return (
            <Card>
              <Form
                onSubmit={async e => {
                  e.preventDefault();
                  await updateHairStyle();
                  this.setState({});
                  setShowEdit(false);
                }}
              >
                <h3>Edit Hair Style</h3>
                <HairImage>
                  {image && <img src={image} alt={"image of hairstyle"} />}
                </HairImage>
                <fieldset disabled={loading} aria-busy={loading}>
                  <Error error={error} />
                  <div className="input-item">
                    <label htmlFor="name">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      defaultValue={hairStyle.name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-item">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={hairStyle.description}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-item">
                    <label htmlFor="image">Add / Change Picture</label>
                    <input
                      type="file"
                      id="image"
                      name="file"
                      placeholder="Upload an Image"
                      onChange={e => this.changeImage(e, image)}
                    />
                  </div>

                  <div className="input-item">
                    <label htmlFor="link">
                      Add or change a link to an instructional video
                    </label>
                    <input
                      type="text"
                      id="link"
                      name="link"
                      placeholder="Paste link here"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-footer">
                    <button
                      className="btn-action-primary"
                      disabled={disableButton}
                      type="submit"
                    >
                      Sav{loading ? "ing" : "e"} Hair Style
                    </button>
                    <button
                      className="btn-action-secondary"
                      type="button"
                      onClick={() => setShowEdit(false)}
                    >
                      {/* if image is in state, delete uploaded image that was not saved */}
                      Cancel
                    </button>
                    <DeleteHairStyleButton id={hairStyle.id}>
                      Delete
                    </DeleteHairStyleButton>
                  </div>
                </fieldset>
              </Form>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}
