import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Link from "next/link";
import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import { UPDATE_DANCECLASS_MUTATION } from "./UpdateDanceClass";
import { DELETE_CLOUDINARY_ASSET } from "../Mutations";
import Error from "../Error";
import StyledCreateClassForm from "../styles/Form";
import useForm from "../../lib/useForm";
import Modal from "../Modal";

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
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);

  const [loadingSong, setLoadingSong] = useState(false);
  const [showModal, toggleModal] = useState(false);

  const [
    createDanceClass,
    {
      data: newDance,
      error: errorCreatingDanceClass,
      loading: creatingDanceClass
    }
  ] = useMutation(CREATE_DANCE_CLASS_MUTATION, {
    variables: { ...inputs },
    onCompleted: () => {
      updateInputs(initialInputState);
    },
    refetchQueries: [{ query: ALL_DANCE_CLASSES_QUERY }]
  });
  const newDanceClass = newDance && newDance.createDanceClass;

  const [
    updateDanceClass,
    {
      data: updatedClass,
      error: errorUpdatingDanceClass,
      loading: updatingDanceClass
    }
  ] = useMutation(UPDATE_DANCECLASS_MUTATION, {
    refetchQueries: [{ query: ALL_DANCE_CLASSES_QUERY }]
  });

  const [
    deleteCloudinaryAsset,
    { error: errorDeletingAsset, loading: deletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET);

  function setSongtoState(e) {
    const audioFile = e.target.files[0];
    updateInputs({ ...inputs, audioFile });
  }

  async function uploadSongAndUpdateClass(danceClassId) {
    setLoadingSong(true);
    const data = new FormData();
    data.append("file", inputs.audioFile);
    data.append("upload_preset", "dancernotes-music");
    data.append("tag", danceClassId);
    //todo - handle errors loading to cloudinary
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/video/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    setLoadingSong(false);

    await updateDanceClass({
      variables: {
        id: danceClassId,
        music: file.secure_url,
        musicId: file.public_id
      }
    }).catch(() => {
      // delete song file from cloudinary because there was an error updating the dnace class with the song url and id
      deleteCloudinaryAsset({
        variables: {
          publicId: file.public_id
        }
      });
    });
  }

  async function saveNewDanceClass(e) {
    e.preventDefault();
    //A. if music file is queued in state, create dance, upload music with tag of routineId, then update routine with the music url and musicId
    if (inputs.audioFile) {
      const newDanceClass = await createDanceClass();
      const newDanceClassId = newDanceClass.data.createDanceClass.id;
      await uploadSongAndUpdateClass(newDanceClassId);
    }
    //B. create without music
    else {
      await createDanceClass().catch(e => toggleModal(true));
      //if fail, error thrown
    }
    toggleModal(true);
  }

  const loading = loadingSong || updatingDanceClass || creatingDanceClass;

  return (
    <Fragment>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorCreatingDanceClass && (
            <>
              <p>
                Warning: there was a problem saving your class. Please try
                again:
              </p>
              <button role="button" onClick={() => toggleModal(false)}>
                Try Again
              </button>
            </>
          )}

          {newDanceClass && (
            <p>Success - you created {newDanceClass && newDanceClass.name}</p>
          )}
          {newDanceClass && errorUpdatingDanceClass && (
            <p>
              Warning: there was a problem uploading the music for{" "}
              {newDanceClass.name}. You can try to add music now or later by
              updating the dance class:
              <Link href={`/studio/updateClass/${newDanceClass.id}`}>
                <a>Update Class</a>
              </Link>
            </p>
          )}

          <button role="button" onClick={() => toggleModal(false)}>
            Create Another Class
          </button>
          <Link href="/studio/classes">
            <a>I'm finished creating classes</a>
          </Link>
        </div>
      </Modal>
      <StyledCreateClassForm
        method="post"
        onSubmit={async e => await saveNewDanceClass(e)}
      >
        <fieldset disabled={loading} aria-busy={loading}>
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
            {/* {error && <Error error={"There was an error crating your class. Please try again"} />} */}
            <button type="submit" disabled={loading || loadingSong}>
              Creat
              {loading ? "ing " : "e "} Class
            </button>
          </div>
        </fieldset>
      </StyledCreateClassForm>
    </Fragment>
  );
}

export default CreateDanceClass;
export { StyledCreateClassForm };

// {inputs.showSuccessMessage && (
//   <SuccessMessage
//     closeFunc={closeSuccessMessage}
//   />
// )}
