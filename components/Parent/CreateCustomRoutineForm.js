import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import { ALL_Rs, PARENT_USER_QUERY } from "./Queries";
import { UPDATE_CUSTOM_ROUTINE } from "./UpdateCustomRoutine";
import { DELETE_CLOUDINARY_ASSET } from "../Mutations";
import { StyledCreateClassForm } from "../styles/Form";
import Card from "../styles/Card";
import useForm from "../../lib/useForm";
import Modal from "../Modal";
import BackButton from "../BackButton";
import { DANCER_QUERY } from "./DancerQuery";

const CREATE_CUSTOM_ROUTINE_MUTATION = gql`
  mutation CREATE_CUSTOM_ROUTINE_MUTATION(
    $name: String!
    $performanceName: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $dancer: ID!
    $studio: ID!
  ) {
    createCustomRoutine(
      name: $name
      performanceName: $performanceName
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      dancer: $dancer
      studio: $studio
    ) {
      name
      id
    }
  }
`;

const initialInputState = {
  name: "",
  performanceName: "",
  dancer: "",
  day: "",
  startTime: "",
  endTime: "",
  shoes: "",
  tights: "",
  notes: "",
  studio: ""
};

function CreateCustomRoutineForm({ parent }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState();
  const [loadingSong, setLoadingSong] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [status, setStatus] = useState();
  const [showFileInput, toggleFileInput] = useState(false);

  const [
    createCustomRoutine,
    {
      data: newCustomRoutine,
      error: errorCreatingCustomRoutine,
      loading: creatingCustomRoutine
    }
  ] = useMutation(CREATE_CUSTOM_ROUTINE_MUTATION, {
    variables: { ...inputs },
    onCompleted: () => {
      resetForm();
    },
    refetchQueries: [
      { query: ALL_Rs },
      { query: PARENT_USER_QUERY },
      { query: DANCER_QUERY, variables: { id: inputs.dancer } }
    ],
    awaitRefetchQueries: true
  });

  const [
    updateCustomRoutine,
    { error: errorUpdatingDanceClass, loading: updatingDanceClass }
  ] = useMutation(UPDATE_CUSTOM_ROUTINE, {
    refetchQueries: [
      {
        query: ALL_Rs
      }
    ]
  });

  const [
    deleteCloudinaryAsset,
    { error: errorDeletingAsset, loading: deletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET);

  const newDanceClass =
    newCustomRoutine && newCustomRoutine.createCustomRoutine;

  const loading =
    loadingSong || creatingCustomRoutine || updatingDanceClass || deletingAsset;
  const errorUploadingSong =
    errorUpdatingDanceClass || errorUploadingToCloudinary;
  function resetForm() {
    updateInputs({ ...initialInputState });
    toggleFileInput(false);
    setStatus();
  }
  function setSongtoState(e) {
    const audioFile = e.target.files[0];
    updateInputs({ ...inputs, audioFile });
  }
  async function uploadSongAndUpdateRoutine(danceClassId) {
    setLoadingSong(true);
    setStatus("Uploading Song...");
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
    ).catch(error => {
      setCloudinaryUploadError(error);
    });
    const file = await res.json();
    if (file.error) {
      setCloudinaryUploadError(file.error);
      setLoadingSong(false);
      throw `Audio Upload failed: ${file.error}`;
    }
    setLoadingSong(false);
    setStatus("Updating class...");
    await updateCustomRoutine({
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
    setStatus();
  }

  async function saveNewCustomRoutine(e) {
    e.preventDefault();
    //A. if music file is queued in state, create dance, upload music with tag of routineId, then update routine with the music url and musicId
    setStatus("Creating Class...");
    if (inputs.audioFile) {
      const newCustomRoutine = await createCustomRoutine();
      const newCustomRoutineId = newCustomRoutine.data.createCustomRoutine.id;
      await uploadSongAndUpdateRoutine(newCustomRoutineId).catch(() => {
        setStatus();
        toggleModal(true);
      });
    }
    //B. create without music
    else {
      await createCustomRoutine();
      //if fail, error thrown
    }
    toggleModal(true);
    resetForm();
  }

  return (
    <Fragment>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorCreatingCustomRoutine && (
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

          {newDanceClass && <p>Success - you created {newDanceClass.name}</p>}
          {newDanceClass && errorUploadingSong && (
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
          <Link href="/parent/notes/routines">
            <a>I'm finished creating classes</a>
          </Link>
        </div>
      </Modal>
      <Card>
        <StyledCreateClassForm
          method="post"
          onSubmit={async e => await saveNewCustomRoutine(e)}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Create Your Own Routine</h2>
            <div className="input-item">
              <label htmlFor="dancer">
                Dancer*
                <p>(You may add other dancers later.)</p>
              </label>
              <select
                required
                id="dancer"
                name="dancer"
                value={inputs.dancer}
                onChange={handleChange}
              >
                <option default value={""} disabled>
                  Dancer...
                </option>
                {parent &&
                  parent.dancers.map(dancer => (
                    <option key={dancer.id} value={dancer.id}>
                      {dancer.firstName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input-item">
              <label htmlFor="name">Name of Routine* </label>
              <input
                required
                pattern="(?!^ +$)^.+$"
                type="text"
                name="name"
                placeholder="name"
                value={inputs.name}
                onChange={handleChange}
              />
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
              <label htmlFor="studio">Studio:*</label>
              <select
                required
                id="studio"
                name="studio"
                value={inputs.studio}
                onChange={handleChange}
              >
                <option default value={""} disabled>
                  Studio...
                </option>
                {parent &&
                  parent.studios.map(studio => (
                    <option key={studio.id} value={studio.id}>
                      {studio.studioName}
                    </option>
                  ))}
                <option value={"none"}>None / Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="day form-row-item">
                <label htmlFor="day">Day:</label>
                <select
                  className="day"
                  id="day"
                  name="day"
                  value={inputs.day}
                  onChange={handleChange}
                >
                  <option default value={""} disabled>
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
                  className="day"
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
                <label htmlFor="endTime">End Time:</label>
                <input
                  className="day"
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
              <label htmlFor="tights">Tights</label>
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
            <button
              type="button"
              className="btn-dark"
              onClick={() => toggleFileInput(true)}
            >
              Add Music
            </button>
            {showFileInput && (
              <div className="input-item">
                <label htmlFor="music">
                  Upload the music for this dance...
                </label>
                <input
                  type="file"
                  id="music"
                  name="music"
                  placeholder="Upload the music for this dance"
                  onChange={setSongtoState}
                />
              </div>
            )}

            <div className="form-footer">
              <p>{status}</p>

              <button type="submit" disabled={loading}>
                Creat
                {loading ? "ing " : "e "} Class
              </button>
              <BackButton text="Cancel" classNames="btn-danger" />
            </div>
          </fieldset>
        </StyledCreateClassForm>
      </Card>
    </Fragment>
  );
}

export default CreateCustomRoutineForm;
