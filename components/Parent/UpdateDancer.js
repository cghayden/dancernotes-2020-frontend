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
    const { name, type, value } = e.target;
    // const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: value });
  };

  updateDancer = async (e, updateDancerMutation) => {
    e.preventDefault();
    //TODO - delete old avatar image from cloudinary
    const res = await updateDancerMutation({
      variables: { id: this.props.id, ...this.state }
    });
    this.props.closeFunc();
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
                      {this.props.hasAvatar
                        ? `Change Picture`
                        : `Add a picture`}
                    </button>
                    {this.state.changePicture && (
                      <div className="input-item">
                        <label htmlFor="image">Choose an Image</label>
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
                              existingAvatarId: this.props.existingAvatarId,
                              loadingAvatar: false
                            });
                          }}
                        />
                      </div>
                    )}
                    <div className="form-footer">
                      <button
                        type="submit"
                        aria-busy={loading || this.state.loadingAvatar}
                      >
                        Sav
                        {loading ? "ing " : "e "} Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => this.props.closeFunc()}
                      >
                        Cancel
                      </button>
                    </div>
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
