import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { HAIRSTYLES_QUERY } from "../../pages/studio/hairstyles";
import Form from "../styles/Form";
import Error from "../Error";

const CREATE_HAIRSTYLE_MUTATION = gql`
  mutation CREATE_HAIRSTYLE_MUTATION(
    $name: String!
    $image: String
    $link: String
    $description: String
  ) {
    createHairStyle(
      name: $name
      image: $image
      link: $link
      description: $description
    ) {
      message
    }
  }
`;

export default class AddMakeupForm extends Component {
  state = {
    name: "",
    image: "",
    link: "",
    description: "",
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dancernotes-hairstyleImages");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      { method: "POST", body: data },
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
    });
  };

  saveHairStyle = async (e, createHairStyle, closeForm) => {
    e.preventDefault();
    await createHairStyle({ variables: this.state });
    this.setState(
      {
        name: "",
        image: "",
        link: "",
        description: "",
      },
      () => closeForm(false),
    );
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_HAIRSTYLE_MUTATION}
        refetchQueries={[{ query: HAIRSTYLES_QUERY }]}
        awaitRefetchQueries={true}
      >
        {(createHairStyle, { error, loading }) => (
          <Form
            method="post"
            onSubmit={e =>
              this.saveHairStyle(e, createHairStyle, this.props.closeForm)
            }
          >
            <h2>Create a Hairstyle</h2>
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  required
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <input
                  id="description"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="image">
                Image
                <input
                  type="file"
                  id="image"
                  name="file"
                  placeholder="Upload an Image"
                  onChange={this.uploadImage}
                />
              </label>
              {this.state.image && (
                <img width="200" src={this.state.image} alt="image preview" />
              )}
              <label htmlFor="link">
                Include a link to an instructional video
                <input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="Paste link here"
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Save</button>
              <button type="button" onClick={() => this.props.closeForm(false)}>
                Cancel
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
