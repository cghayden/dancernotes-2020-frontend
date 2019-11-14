import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../../components/Error";

const DANCER_PROFILE_QUERY = gql`
  query DANCER_PROFILE_QUERY($id: ID!) {
    dancer(where: { id: $id }) {
      id
      firstName
      avatar
    }
  }
`;

const UPDATE_DANCER_MUTATION = gql`
  mutation UPDATE_DANCER_MUTATION(
    $id: ID!
    $firstName: String
    $avatar: String
  ) {
    updateDancer(id: $id, firstName: $firstName, avatar: $avatar) {
      id
      firstName
      avatar
    }
  }
`;

class UpdateDancer extends Component {
  state = {
    changePicture: false,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    // const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: value });
  };

  updateDancer = async (e, updateDancerMutation) => {
    e.preventDefault();
    //TODO - delete old avatar image from cloudinary
    const res = await updateDancerMutation({
      variables: { id: this.props.id, ...this.state },
    });
    this.props.closeFunc();
  };

  uploadFile = async e => {
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
    });
  };

  render() {
    return (
      <Query query={DANCER_PROFILE_QUERY} variables={{ id: this.props.id }}>
        {({ data: { dancer } = {}, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (!dancer) return <p>No Dancer found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_DANCER_MUTATION} variables={this.state}>
              {(updateDancer, { loading, error }) => (
                <Form onSubmit={e => this.updateDancer(e, updateDancer)}>
                  <Error error={error} />

                  <h5>Update {dancer.firstName}'s Profile</h5>
                  <fieldset
                    disabled={loading || this.state.loadingAvatar}
                    aria-busy={loading || this.state.loadingAvatar}
                  >
                    <label htmlFor="firstName">
                      Name
                      <input
                        required
                        type="text"
                        name="firstName"
                        placeholder="firstName"
                        onChange={this.handleChange}
                        defaultValue={dancer.firstName}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({
                          changePicture: !this.state.changePicture,
                        })
                      }
                    >
                      Change Picture
                    </button>
                    {this.state.changePicture && (
                      <label htmlFor="image">
                        Upload a New Image
                        <input
                          type="file"
                          id="image"
                          name="image"
                          placeholder="Image for Avatar"
                          onChange={async e => {
                            this.setState({ loadingAvatar: true });
                            await this.props.changeAvatar(e);
                            this.setState({
                              avatar: this.props.newAvatar,
                            });
                            this.setState({ loadingAvatar: false });
                          }}
                        />
                      </label>
                    )}
                    <button type="submit">
                      Sav
                      {loading ? "ing " : "e "} Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => this.props.closeFunc()}
                    >
                      Cancel
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export default UpdateDancer;
export { UPDATE_DANCER_MUTATION };
