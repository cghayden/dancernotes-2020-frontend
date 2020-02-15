import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DatePicker from "react-datepicker";
import Router from "next/router";
import Form from "../styles/Form";
import Card from "../styles/Card";
import Error from "../Error";
import useForm from "../../lib/useForm";
import { SelectChoices } from "./CreateCustomRoutineForm";
import { CUSTOM_EVENTS_QUERY } from "./Queries";

const CREATE_CUSTOM_EVENT = gql`
  mutation CREATE_CUSTOM_EVENT(
    $name: String!
    $type: String!
    $dancerIds: [ID!]!
    $beginDate: DateTime
    $endDate: DateTime
    $location: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zip: String
    $url: String
    $notes: String
  ) {
    createCustomEvent(
      name: $name
      type: $type
      dancerIds: $dancerIds
      beginDate: $beginDate
      endDate: $endDate
      location: $location
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
      url: $url
      notes: $notes
    ) {
      id
      type
      name
    }
  }
`;

const initialInputState = {
  type: "",
  name: "",
  location: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  url: "",
  notes: ""
};

function CreateCustomEventForm({ parent }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [dancerChoice, setDancerChoice] = useState(() =>
    parent.dancers.length > 1
      ? {}
      : { [parent.dancers[0].firstName]: parent.dancers[0].id }
  );
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showAddress2, toggleshowAddress2] = useState(false);
  const [createCustomEvent, { error, loading }] = useMutation(
    CREATE_CUSTOM_EVENT,
    {
      refetchQueries: [{ query: CUSTOM_EVENTS_QUERY }],
      onCompleted: () => {
        Router.push("/parent/notes/events");
      }
    }
  );

  async function saveEvent(e) {
    e.preventDefault();
    const dancerIds = Object.values(dancerChoice);
    const beginningDate = beginDate ? beginDate.toISOString() : null;
    const endingDate = endDate ? endDate.toISOString() : null;
    await createCustomEvent({
      variables: {
        ...inputs,
        dancerIds,
        beginDate: beginningDate,
        endDate: endingDate
      }
    });
  }

  function handleSelectChange(e) {
    const chosenDancerName = e.target.selectedOptions[0].label;
    const chosenDancerId = e.target.selectedOptions[0].value;
    setDancerChoice({ ...dancerChoice, [chosenDancerName]: chosenDancerId });
  }

  function removeChosenDancer(selection) {
    const dancers = { ...dancerChoice };
    delete dancers[selection];
    setDancerChoice(dancers);
  }

  return (
    <Card>
      <Form
        method="post"
        onSubmit={async e => {
          await saveEvent(e);
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <legend>Add A New Event</legend>

          <div className="input-item">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={inputs.type}
              onChange={handleChange}
            >
              <option default value={""} disabled>
                (Competition, Rehearsal, etc...)?
              </option>
              <option value="competition">Competition</option>
              <option value="rehearsal">Rehearsal</option>
              <option value="recital">Recital</option>
              <option value="convention">Convention</option>
              <option value="camp">Camp</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-item">
            <SelectChoices>
              <label htmlFor="dancer">Dancer(s):*</label>
              {Object.entries(dancerChoice).map(dancer => {
                console.log("dancer:", dancer);
                return (
                  <li key={dancer[0]}>
                    {dancer[0]}
                    <span>
                      <button
                        type="button"
                        onClick={() => {
                          console.log("remove", dancer[0]);
                          removeChosenDancer(dancer[0]);
                        }}
                      >
                        X
                      </button>
                    </span>
                  </li>
                );
              })}
            </SelectChoices>
            {parent.dancers.length > 1 && (
              <select
                id="dancer"
                name="dancer"
                value={""}
                onChange={e => {
                  handleSelectChange(e);
                }}
              >
                <option default value={""} disabled>
                  Dancer(s)...
                </option>
                {parent &&
                  parent.dancers.map(dancer => (
                    <option
                      key={dancer.id}
                      value={dancer.id}
                      label={dancer.firstName}
                    >
                      {dancer.firstName}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {/* Dates */}
          <div className="form-row">
            <div className="form-row-item">
              <label htmlFor="beginDate">Begin Date:</label>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                id="beginDate"
                selected={beginDate}
                onChange={date => setBeginDate(date)}
              />
            </div>
            <div className="form-row-item">
              <label htmlFor="endDate">End Date:</label>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                id="endDate"
                selected={endDate}
                onChange={date => setEndDate(date)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="input-item">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={inputs.location}
              onChange={handleChange}
            />
          </div>
          {/* Address */}

          <section className="card__section">
            <div className="left">
              <h3>Address:</h3>
              <span className="subHeading">Optional</span>
            </div>

            <div className="input-item">
              <label htmlFor="address1">Address Line 1</label>
              <input
                type="text"
                name="address1"
                value={inputs.address1}
                onChange={handleChange}
              />
            </div>
            {showAddress2 && (
              <div className="input-item">
                <label htmlFor="address2">
                  Address Line 2<span className="subLabel">Optional</span>
                </label>
                <input
                  type="text"
                  name="address2"
                  value={inputs.address2}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="input-item">
              <div className="form-row">
                <div className="form-row-item">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    value={inputs.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row-item">
                  <label htmlFor="state">State</label>
                  <input
                    className="state"
                    type="text"
                    name="state"
                    value={inputs.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row-item">
                  <label htmlFor="zip">Zip Code</label>
                  <input
                    className="zip"
                    type="text"
                    name="zip"
                    value={inputs.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="input-item">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              type="text"
              name="notes"
              rows="5"
              value={inputs.notes}
              onChange={handleChange}
            />
          </div>
          <Error error={error} />
          <div className="form-footer">
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
    </Card>
  );
}

export default CreateCustomEventForm;
