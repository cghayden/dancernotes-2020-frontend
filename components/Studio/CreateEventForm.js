import React, { Component } from "react";
import Select from "react-select";
import Router from "next/router";
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
  { value: "company", label: " All Company", name: "appliesTo" },
  { value: "star", label: "All Star", name: "appliesTo" },
  { value: "all", label: "All Classes", name: "appliesTo" },
  { value: "mini star", label: "Mini Star", name: "appliesTo" },
  { value: "mini company", label: "Mini Company", name: "appliesTo" },
  { value: "junior star", label: "Junior Star", name: "appliesTo" },
  { value: "junior company", label: "Junior Company", name: "appliesTo" },
  { value: "teen 1 star", label: "Teen Star", name: "appliesTo" },
  { value: "teen 1 company", label: "Teen 1 Company", name: "appliesTo" },
  { value: "teen 2 star", label: "Teen Star", name: "appliesTo" },
  { value: "teen 2 company", label: "Teen 2 Company", name: "appliesTo" },
  { value: "senior star", label: "Senior Star", name: "appliesTo" },
  { value: "senior company", label: "Senior Company", name: "appliesTo" },
  { value: "lyric", label: "Lyric", name: "appliesTo" },
  { value: "jazz", label: "Jazz", name: "appliesTo" },
  { value: "hip hop", label: "Hip Hop", name: "appliesTo" },
  { value: "tap", label: "Tap", name: "appliesTo" },
  { value: "production", label: "Production", name: "appliesTo" },
  { value: "acro team", label: "Acro Team", name: "appliesTo" },
  { value: "mini acro team", label: "Mini Acro Team", name: "appliesTo" }
];

class CreateEventForm extends Component {
  state = {
    type: "",
    name: "",
    applyTo: []
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
        onCompleted={() => Router.push("/studio/events")}
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
                  appliesTo: ""
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
                    <option value="competition">Competition</option>
                    <option value="rehearsal">Rehearsal</option>
                    <option value="recital">Recital</option>
                    <option value="convention">Convention</option>
                    <option value="other">Other</option>
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

                {/* Dates */}
                <div className="input-item">
                  <label htmlFor="beginDate">Start Date</label>
                  <input
                    type="date"
                    name="beginDate"
                    value={this.state.beginDate}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleChange}
                  />
                </div>
                {/* Address */}
                <div className="input-item">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </div>

                {/* footer */}
                <div>
                  <button
                    className="btn-action-primary"
                    type="submit"
                    disabled={loading}
                  >
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
