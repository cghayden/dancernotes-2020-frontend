import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../Error";
import { STUDIO_MAKEUP_QUERY } from "../../pages/studio/makeup";

const UPDATE_MAKEUP_SET_MUTATION = gql`
  mutation UPDATE_MAKEUP_SET_MUTATION(
    $id: ID!
    $name: String!
    $lipstick: String
    $eyeShadow: String
  ) {
    updateMakeupSet(
      id: $id
      name: $name
      lipstick: $lipstick
      eyeShadow: $eyeShadow
    ) {
      message
    }
  }
`;

export default class EditMakeupForm extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { makeupSet, setShowEdit } = this.props;
    // disable submission of empty state if no updates are made
    const disableButton = Object.keys(this.state).length < 1;
    return (
      <Mutation
        mutation={UPDATE_MAKEUP_SET_MUTATION}
        variables={{ id: makeupSet.id, ...this.state }}
        refetchQueries={[{ query: STUDIO_MAKEUP_QUERY }]}
        awaitRefetchQueries={true}
        // onCompleted={()=>setShowEdit(false);}
      >
        {(updateMakeupSet, { loading, error }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                await updateMakeupSet();
                this.setState({});
                setShowEdit(false);
              }}
            >
              <h3>Edit Makeup Set {makeupSet.name}</h3>
              <fieldset disabled={loading} aria-busy={loading}>
                <Error error={error} />
                <div className="input-item">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    defaultValue={makeupSet.name}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-item">
                  <label htmlFor="lipstick">Lip Stick</label>
                  <input
                    type="text"
                    name="lipstick"
                    defaultValue={makeupSet.lipstick}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-item">
                  <label htmlFor="eyeShadow">Eye Shadow</label>
                  <input
                    type="text"
                    name="eyeShadow"
                    defaultValue={makeupSet.eyeShadow}
                    onChange={this.handleChange}
                  />
                </div>

                <button disabled={disableButton} type="submit">
                  Save Makeup Set
                </button>
                <button type="button" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
