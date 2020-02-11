import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Router from "next/router";
import Form from "../styles/Form";
import Error from "../Error";
import useForm from "../../lib/useForm";

import { SelectChoices } from "../Parent/CreateCustomRoutineForm";
import { STUDIO_EVENTS_QUERY } from "./Queries";

const CREATE_STUDIO_EVENT = gql`
  mutation CREATE_STUDIO_EVENT(
    $name: String!
    $type: String!
    $appliesTo: [String!]!
    $beginDate: DateTime
    $endDate: DateTime
    $location: String
    $street1: String
    $city: String
    $state: String
    $zip: String
    $url: String
    $notes: String
  ) {
    createStudioEvent(
      name: $name
      type: $type
      appliesTo: $appliesTo
      beginDate: $beginDate
      endDate: $endDate
      location: $location
      street1: $street1
      city: $city
      state: $state
      zip: $zip
      url: $url
      notes: $notes
    ) {
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
const initialInputState = {
  type: "",
  name: "",
  type: "",
  beginDate: "2020-03-03T01:17:13.506Z",
  endDate: "2021-03-03T01:17:13.506Z",
  name: "",
  location: "",
  street1: "",
  city: "",
  state: "",
  zip: "",
  url: "",
  notes: ""
};
function CreateEventForm() {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [appliesTo, setAppliesTo] = useState({});
  const [createStudioEvent, { error, loading }] = useMutation(
    CREATE_STUDIO_EVENT,
    {
      refetchQueries: [{ query: STUDIO_EVENTS_QUERY }]
    }
  );

  function handleAppliesToChange(e) {
    if (!e) return;
    const selectedValue = e.target.selectedOptions[0].value;
    const selectedLabel = e.target.selectedOptions[0].label;
    setAppliesTo({ ...appliesTo, [selectedValue]: selectedLabel });
  }

  function removeAppliesTo(selection) {
    setAppliesTo(appliesTo => delete appliesTo[selection]);
  }

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        const applyTo = Object.values(appliesTo);
        await createStudioEvent({
          variables: { ...inputs, appliesTo: applyTo }
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
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-item">
          <SelectChoices>
            <label htmlFor="appliesTo">Apply To:</label>
            {Object.entries(appliesTo).map(entry => (
              <li key={entry[0]}>
                {entry[1]}
                <span>
                  <button
                    type="button"
                    onClick={() => removeAppliesTo(entry[0])}
                  >
                    X
                  </button>
                </span>
              </li>
            ))}
          </SelectChoices>
          <select
            name="appliesTo"
            value={""}
            onChange={e => handleAppliesToChange(e)}
          >
            <option default value={""} disabled>
              Applies to...
            </option>
            {appliesToOptions.map(category => (
              <option
                key={category.value}
                value={category.value}
                label={category.label}
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="input-item">
          <label htmlFor="beginDate">Start Date</label>
          <input
            type="date"
            name="beginDate"
            value={inputs.beginDate}
            onChange={handleChange}
          />
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            value={inputs.nameendDate}
            onChange={handleChange}
          />
        </div>
        {/* Address */}
        <div className="input-item">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
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
}

export default CreateEventForm;
