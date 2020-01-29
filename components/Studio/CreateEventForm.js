import React, { Component } from "react";
import Select from "react-select";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Form } from "./CreateDanceClassForm";
import Error from "../Error";
const ADD_STUDIO_EVENT = gql`
  mutation ADD_STUDIO_EVENT(
    $type: String!
    $name: String!
    $appliesTo: [String]!
  ) {
    addStudioEvent(type: $type, name: $name, appliesTo: $appliesTo) {
      id
      type
      name
      appliesTo
    }
  }
`;
const appliesToOptions = [
  { value: "recreational", label: "Recreational", name: "appliesTo" },
  { value: "company", label: "Company", name: "appliesTo" },
  { value: "star", label: "Star", name: "appliesTo" },
];

class CreateEventForm extends Component {
  state = {
    type: "",
    name: "",
    applyTo: [],
  };

  handleSelectChange = e => {
    if (!e) return;
    const choices = [];
    const selectCategory = e[0].name;
    e.forEach(selection => choices.push(selection.value));
    this.setState({ ...this.state, [selectCategory]: choices });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Mutation
        mutation={ADD_STUDIO_EVENT}
        variables={this.state}
        // refetchQueries={[{ query: ALL_DANCE_CLASSES_QUERY }]}
        // awaitRefetchQueries={true}
      >
        {(addStudioEvent, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await addStudioEvent();
                this.setState({
                  type: "",
                  name: "",
                  appliesTo: "",
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <legend>Add A New Event</legend>
                <Error error={error} />
                <div className="input-item">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="type">Type:</label>
                  <select
                    id="type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    <option default value={""} disabled>
                      (Competition, Rehearsal, etc...)?
                    </option>
                    <option value="Competition">Competition</option>
                    <option value="Rehearsal">Rehearsal</option>
                  </select>
                </div>

                <div className="input-item">
                  <label htmlFor="appliesTo">Apply To:</label>
                  <Select
                    isMulti
                    options={appliesToOptions}
                    id="appliesTo"
                    name="appliesTo"
                    onChange={this.handleSelectChange}
                  />
                </div>
                <div>
                  <button type="submit" disabled={loading}>
                    Creat
                    {loading ? "ing " : "e "} Event
                  </button>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateEventForm;
