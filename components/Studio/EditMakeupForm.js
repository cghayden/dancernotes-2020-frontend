import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

import Form from "../styles/Form";
import Error from "../Error";
import { MAKEUP_QUERY } from "../../pages/studio/makeup";
import { CATEGORIES_QUERY } from "./Queries";

const UPDATE_MAKEUP_SET_MUTATION = gql`
  mutation UPDATE_MAKEUP_SET_MUTATION(
    $id: ID!
    $name: String!
    $lipstick: String
    $eyeShadow: String
    $applyTo: String
  ) {
    updateMakeupSet(
      id: $id
      name: $name
      lipstick: $lipstick
      eyeShadow: $eyeShadow
      applyTo: $applyTo
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
      <Query query={CATEGORIES_QUERY}>
        {({ data: { studioCategories }={} }, error, loading) => {
          return (
            <Mutation
              mutation={UPDATE_MAKEUP_SET_MUTATION}
              variables={{ id: makeupSet.id, ...this.state }}
              refetchQueries={[{ query: MAKEUP_QUERY }]}
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
                      <label htmlFor="name">
                        Name
                        <input
                          required
                          type="text"
                          name="name"
                          defaultValue={makeupSet.name}
                          onChange={this.handleChange}
                        />
                      </label>
                      {/* <label htmlFor="applyTo">
                        Apply To:
                        <select
                          id="applyTo"
                          name="applyTo"
                          defaultValue={makeupSet.applyTo}
                          onChange={this.handleChange}
                        >
                          {studioCategories &&
                            studioCategories.levels.map(level => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          <option value={"none"}>None at this time</option>
                        </select>
                      </label> */}
                      <label htmlFor="lipstick">
                        Lip Stick
                        <input
                          type="text"
                          name="lipstick"
                          defaultValue={makeupSet.lipstick}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="eyeShadow">
                        Eye Shadow
                        <input
                          type="text"
                          name="eyeShadow"
                          defaultValue={makeupSet.eyeShadow}
                          onChange={this.handleChange}
                        />
                      </label>
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
        }}
      </Query>
    );
  }
}
