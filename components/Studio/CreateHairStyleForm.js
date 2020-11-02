import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import { HAIRSTYLES_QUERY } from "../../pages/studio/hairstyles";
import Form from "../styles/Form";
import Error from "../Error";
import Card from "../styles/Card";

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

export default class CreateHairStyleForm extends Component {
  state = {
    name: "",
    image: "",
    link: "",
    description: "",
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "images-default");
    data.append("folder", "dancernotes-hairstyles");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_HAIRSTYLE_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: HAIRSTYLES_QUERY }]}
        awaitRefetchQueries={true}
        onCompleted={() => {
          Router.push("/studio/hairstyles");
        }}
      >
        {(createHairStyle, { error, loading }) => (
          <Card>
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await createHairStyle();
                this.setState({
                  name: "",
                  image: "",
                  link: "",
                  description: "",
                });
              }}
            >
              <h2>Create a Hairstyle</h2>
              <fieldset disabled={loading} aria-busy={loading}>
                <Error error={error} />
                <div className="input-item">
                  <label htmlFor="name">Name </label>
                  <input
                    id="name"
                    required
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="description">Description </label>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="image">Image </label>
                  <input
                    type="file"
                    id="image"
                    name="file"
                    placeholder="Upload an Image"
                    onChange={this.uploadImage}
                  />
                </div>
                {this.state.image && (
                  <img width="200" src={this.state.image} alt="image preview" />
                )}
                <div className="input-item">
                  <label htmlFor="link">
                    Include a link to an instructional video
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    placeholder="Paste link here"
                    onChange={this.handleChange}
                  />
                </div>

                <button className="btn-action-primary" type="submit">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => Router.push("hairstyles")}
                >
                  Cancel
                </button>
              </fieldset>
            </Form>
          </Card>
        )}
      </Mutation>
    );
  }
}
