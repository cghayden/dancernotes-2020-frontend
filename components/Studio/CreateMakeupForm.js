import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

import Form from "../styles/Form";
import Error from "../Error";

import { CATEGORIES_QUERY } from "./Queries";

const CREATE_MAKEUP_SET_MUTATION = gql`
  mutation CREATE_MAKEUP_SET_MUTATION(
    $name: String!
    $lipstick: String
    $eyeShadow: String
    $applyTo: String
  ) {
    createMakeupSet(
      name: $name
      lipstick: $lipstick
      eyeShadow: $eyeShadow
      applyTo: $applyTo
    ) {
      message
    }
  }
`;

export default class AddMakeupForm extends Component {
  state = {
    name: "",
    lipstick: "",
    eyeShadow: "",
    applyTo: "",
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveMakeupSet = async (e, createMakeupSet, closeForm) => {
    e.preventDefault();
    await createMakeupSet({ variables: this.state });
    this.setState(
      {
        name: "",
        lipstick: "",
        eyeShadow: "",
        applyTo: "",
      },
      () => closeForm(false),
    );
  };

  render() {
    return (
      <Mutation mutation={CREATE_MAKEUP_SET_MUTATION}>
        {(createMakeupSet, { error, loading }) => (
          <Query query={CATEGORIES_QUERY}>
            {({ data: { studioCategories }={} }, error, loading) => {
              return (
                <Form
                  method="post"
                  onSubmit={e =>
                    this.saveMakeupSet(e, createMakeupSet, this.props.closeForm)
                  }
                >
                  <h2>Create a Makeup Set</h2>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <Error error={error} />
                    <label htmlFor="name">
                      Name
                      <input
                        required
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="applyTo">
                      Apply To:
                      <select
                        id="applyTo"
                        name="applyTo"
                        value={this.state.applyTo}
                        onChange={this.handleChange}
                      >
                        <option default disabled value={""}>
                          Apply To...
                        </option>
                        {studioCategories &&
                          studioCategories.levels.map(level => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        <option value={"none"}>None at this time</option>
                      </select>
                    </label>
                    <label htmlFor="lipstick">
                      Lip Stick
                      <input
                        type="text"
                        name="lipstick"
                        value={this.state.lipstick}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="eyeShadow">
                      Eye Shadow
                      <input
                        type="text"
                        name="eyeShadow"
                        value={this.state.eyeShadow}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Save Makeup Set</button>
                    <button
                      type="button"
                      onClick={() => this.props.closeForm(false)}
                    >
                      Cancel
                    </button>
                  </fieldset>
                </Form>
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}
