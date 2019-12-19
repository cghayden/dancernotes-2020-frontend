import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Link from "next/link";
import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import { UPDATE_DANCECLASS_MUTATION } from "./UpdateDanceClass";
import Error from "../Error";
import StyledCreateClassForm from "../styles/Form";
import SuccessMessage from "../SuccessMessage";
import useForm from "../../lib/useForm";

const CREATE_DANCE_CLASS_MUTATION = gql`
  mutation CREATE_DANCE_CLASS_MUTATION(
    $name: String!
    $performanceName: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $level: String
    $style: String
    $division: String
    $makeupSet: ID
    $size: String
  ) {
    createDanceClass(
      name: $name
      performanceName: $performanceName
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      level: $level
      style: $style
      division: $division
      makeupSet: $makeupSet
      size: $size
    ) {
      name
      size
      id
    }
  }
`;

const initialInputState = {
  name: "",
  day: "Day...",
  startTime: "",
  endTime: "",
  style: "",
  level: "",
  division: "",
  performanceName: "",
  shoes: "",
  tights: "",
  notes: "",
  showSuccessMessage: false,
  makeupSet: "none",
  size: ""
};

function CreateDanceClass({ studio }) {
  const { inputs, updateInputs, handleChange, resetForm } = useForm(
    initialInputState
  );

  const [loadingSong, setLoadingSong] = useState(false);

  const [showMessage, toggleMessage] = useState(false);

  const [
    updateDanceClass,
    { error: errorUpdatingDanceClass, loading: updatingDanceClass }
  ] = useMutation(UPDATE_DANCECLASS_MUTATION);

  const [
    createDanceClass,
    { error: errorCreatingDanceClass, loading: creatingDanceClass }
  ] = useMutation(CREATE_DANCE_CLASS_MUTATION);

  function setSongtoState(e) {
    const audioFile = e.target.files[0];
    updateInputs({ ...inputs, audioFile });
  }

  async function uploadSong(danceClassId) {
    setLoadingSong(true);
    const data = new FormData();
    data.append("file", inputs.audioFile);
    data.append("upload_preset", "dancernotes-music");
    data.append("tag", danceClassId);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/video/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    updateDanceClass({
      variables: {
        id: danceClassId,
        music: file.secure_url,
        musicId: file.public_id
      }
    });
    setLoadingSong(false);
  }

  async function saveNewDanceClass(e) {
    e.preventDefault();
    //1. createDanceClass
    const newDanceClass = await createDanceClass({
      variables: {
        ...inputs
      }
    });
    //2. if music file is queued in state,upload music with tag of routineId, and update routine with the music url and musicId
    if (inputs.audioFile) {
      const newDanceClassId = newDanceClass.data.createDanceClass.id;
      await uploadSong(newDanceClassId);
    }

    // 4. reset state
    updateInputs(initialInputState);
  }

  const error = errorCreatingDanceClass || errorUpdatingDanceClass;
  const loading = loadingSong || updatingDanceClass || creatingDanceClass;

  function closeSuccessMessage() {
    toggleMessage(false);
  }

  function onSuccess(danceClass) {
    if (danceClass.size === "Group") {
      toggleMessage(true);
    } else {
      Router.push({
        pathname: "/studio/addDancers",
        query: { id: danceClass.id }
      });
    }
  }

  return (
    <StyledCreateClassForm
      method="post"
      onSubmit={async e => await saveNewDanceClass(e)}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        {error && <Error error={error} />}
        <legend>Add A New Dance Class To Your Schedule</legend>
        <Link href="configureClassCategories">
          <a className="btn-dark">Configure Class Categories</a>
        </Link>
        <div className="input-item">
          <label htmlFor="name">Class Name *</label>
          <input
            required
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-item">
          <label htmlFor="size">Size: *</label>
          <select
            required
            id="size"
            name="size"
            value={inputs.size}
            onChange={handleChange}
          >
            <option default value={""} disabled>
              (Group/Solo/Duo/Trio)?
            </option>
            <option value="Group">Group</option>
            <option value="Solo">Solo</option>
            <option value="Duo">Duo</option>
            <option value="Trio">Trio</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-row-item day">
            <label htmlFor="day">Day: </label>
            <select
              id="day"
              name="day"
              value={inputs.day}
              onChange={handleChange}
            >
              ``{" "}
              <option default value={"Day..."} disabled>
                Day...
              </option>
              <option value="Mon.">Mon.</option>
              <option value="Tue.">Tue.</option>
              <option value="Wed.">Wed.</option>
              <option value="Thur.">Thur.</option>
              <option value="Fri.">Fri.</option>
              <option value="Sat.">Sat.</option>
              <option value="Sun.">Sun.</option>
            </select>
          </div>

          <div className="form-row-item">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              min="0:00"
              max="23:59"
              value={inputs.startTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-item">
            <label htmlFor="endTime">End Time: </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              min="0:00"
              max="23:59"
              value={inputs.endTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-item">
          <label htmlFor="style">Style: *</label>
          <select
            required
            id="style"
            name="style"
            value={inputs.style}
            onChange={handleChange}
          >
            <option default value={""} disabled>
              Style...
            </option>
            {studio &&
              studio.styles.map(style => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
          </select>
        </div>
        <div className="input-item">
          <label htmlFor="level">Level: *</label>
          <select
            required
            id="level"
            name="level"
            value={inputs.level}
            onChange={handleChange}
          >
            <option default disabled value={""}>
              Level...
            </option>
            {studio &&
              studio.levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
          </select>
        </div>
        <div className="input-item">
          <label htmlFor="division">Division:</label>
          <select
            id="division"
            name="division"
            value={inputs.division}
            onChange={handleChange}
          >
            <option default disabled value={""}>
              Division...
            </option>
            {studio &&
              studio.divisions.map(division => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
          </select>
        </div>
        <div className="input-item">
          <label htmlFor="performanceName">Performance Name</label>
          <input
            type="text"
            name="performanceName"
            placeholder="Performance Name, or Name of Song"
            value={inputs.performanceName}
            onChange={handleChange}
          />
        </div>
        <div className="input-item">
          <label htmlFor="tights">Tights:</label>
          <input
            type="text"
            name="tights"
            placeholder="The style of tights required..."
            value={inputs.tights}
            onChange={handleChange}
          />
        </div>
        <div className="input-item">
          <label htmlFor="shoes">Shoes</label>
          <input
            type="text"
            name="shoes"
            placeholder="The style of shoes required..."
            value={inputs.shoes}
            onChange={handleChange}
          />
        </div>
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
        <div className="input-item">
          <label htmlFor="makeupSet">Makeup:</label>
          <select
            id="makeupSet"
            name="makeupSet"
            value={inputs.makeupSet}
            onChange={handleChange}
          >
            <option default disabled value={""}>
              Makeup...
            </option>
            {studio &&
              studio.makeupSets.map(set => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            <option value={"none"}>None at this time, N/A</option>
          </select>
        </div>
        <div className="input-item">
          <label htmlFor="music">Upload the music for this dance...</label>
          <input
            type="file"
            id="music"
            name="music"
            placeholder="Upload the music for this dance"
            onChange={setSongtoState}
          />
        </div>

        <div>
          <button type="submit" disabled={loading || loadingSong}>
            Creat
            {loading ? "ing " : "e "} Class
          </button>
        </div>
      </fieldset>
    </StyledCreateClassForm>
  );
}

export default CreateDanceClass;
export { StyledCreateClassForm };

// {inputs.showSuccessMessage && (
//   <SuccessMessage
//     closeFunc={closeSuccessMessage}
//   />
// )}
