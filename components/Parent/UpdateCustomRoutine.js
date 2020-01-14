import React, { Fragment, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import Router from "next/router";
import Error from "../Error";
import { StyledCreateClassForm } from "../styles/Form";
import useForm from "../../lib/useForm";
import Modal from "../Modal";
import BackButton from "../BackButton";
import DeleteDanceClass from "../DeleteDanceClass";
import { DELETE_CLOUDINARY_ASSET } from "../Mutations";

const UPDATE_CUSTOM_ROUTINE = gql`
  mutation UPDATE_CUSTOM_ROUTINE(
    $id: ID!
    $name: String
    $performanceName: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $music: String
    $musicId: String
    $dancer: ID
    $studio: ID
  ) {
    updateCustomRoutine(
      id: $id
      name: $name
      performanceName: $performanceName
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      music: $music
      musicId: $musicId
      dancer: $dancer
      studio: $studio
    ) {
      id
      name
      music
      musicId
    }
  }
`;
const initialInputState = {};

function UpdateCustomRoutine({ dance, parent }) {
  const { inputs, updateInputs, handleChange } = useForm();
  const [errorUploadingToCloudinary, setCloudinaryUploadError] = useState();
  const [loadingSong, setLoadingSong] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [status, setStatus] = useState();
  const [showFileInput, toggleFileInput] = useState(false);

  const [
    updateCustomRoutine,
    {
      data: updatedRoutine,
      loading: updatingRoutine,
      error: errorUpdatingRoutine
    }
  ] = useMutation(UPDATE_CUSTOM_ROUTINE, {
    variables: { ...inputs, id: dance.id },
    refetchQueries: ["allRs"],
    awaitRefetchQueries: true,
    onCompleted: () => {
      resetForm();
    }
  });

  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET);

  const updatedDanceClass =
    updatedRoutine && updatedRoutine.updateCustomRoutine;
  const loading = loadingSong || updatingRoutine || deletingAsset;
  function resetForm() {
    updateInputs({ ...initialInputState });
    toggleFileInput(false);
    setStatus();
  }

  function setSongtoState(e) {
    const audioFile = e.target.files[0];
    updateInputs({ ...inputs, audioFile });
  }

  const saveChanges = async (e, updateMutation) => {
    e.preventDefault();
    //A. update class with audioFile:
    if (inputs.audioFile) {
      // if dance already has a song, delete it
      setLoadingSong(true);
      if (dance.musicId) {
        setStatus("Deleting Old Music");
        await deleteCloudinaryAsset({
          variables: { publicId: danceClass.musicId }
        }).catch(error => console.log(error));
      }
      //upload song to cloudinary and set id and url to state
      setStatus("Uploading Song...");
      await uploadSong(dance.id, inputs.audioFile).catch(err => {
        //if error uploading to cloudinary, delete from inputs.  Why? because if there are no other updates besides the music, the update does not need to be run, because the music upload to cloudinary has failed.
        delete inputs.audioFile;
        setCloudinaryUploadError(err);
      });
      setLoadingSong(false);
      //if upload song errored out, and there are other inputs to update, update them
      if (Object.keys(inputs).length > 0) {
        setStatus("Updating Class");
        await updateDanceClass().catch(error => {
          //if a song was uploaded to cloudinary, but the url and id could not be updated in prisma, delete the song from cloudinary
          if (inputs.musicId) {
            deleteCloudinaryAsset({ variables: { publicId: inputs.musicId } });
          }
        });
      }
    }
    // B. update class without audiofile
    else {
      setStatus("Updating Class");
      await updateCustomRoutine();
    }
    //c. clean up
    setStatus();
    toggleModal(true);
    resetForm();
  };

  async function uploadSong(danceClassId, asset) {
    const data = new FormData();
    data.append("file", audioFile);
    data.append("upload_preset", "dancernotes-music");
    data.append("tags", routineId);

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
    }
    updateInputs({
      ...inputs,
      music: file.secure_url,
      musicId: file.public_id
    });
  }
  // disable submission of empty state if no updates are made
  const disableButton = Object.keys(inputs).length < 1;

  return (
    <Fragment>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorUpdatingRoutine && (
            <>
              <p>
                Warning: there was a problem saving your class. Please try
                again:
              </p>
              <button role="button" onClick={() => toggleModal(false)}>
                Try Again
              </button>
              <Link href={`/parent/notes/routines`}>
                <a>Never Mind!</a>
              </Link>
            </>
          )}
          {updatedDanceClass && (
            <p>
              Success - you updated
              {updatedDanceClass.name}
            </p>
          )}
          {updatedDanceClass && errorUploadingToCloudinary && (
            <>
              <p>
                Success - you updated
                {updatedDanceClass.name}
              </p>
              <p>
                Warning: there was a problem uploading the music for
                {updatedDanceClass.name}. You can try to add music now or later
                by updating the dance class:
                <Link href={`/parent/updateDance/${updatedDanceClass.id}`}>
                  <a>Update Class</a>
                </Link>
              </p>
            </>
          )}
          <Link href="/parent/notes/routines">
            <a>Return to Routines</a>
          </Link>
        </div>
      </Modal>
      <StyledCreateClassForm
        method="post"
        onSubmit={async e => await saveChanges(e, updateCustomRoutine)}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Update {dance.name}</h2>
          {/* <Error error={errorUpdatingRoutine} /> */}
          <div className="input-item">
            <label htmlFor="name">Name*</label>
            <input
              required
              pattern="(?!^ +$)^.+$"
              type="text"
              name="name"
              defaultValue={dance.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="dancer">Dancer*</label>
            <select
              id="dancer"
              name="dancer"
              defaultValue={dance.dancer}
              onChange={handleChange}
            >
              {/* <option default defaultValue={""} disabled>
                Dancer...
              </option> */}
              {parent.dancers.map(dancer => (
                <option key={dancer.id} value={dancer.id}>
                  {dancer.firstName}
                </option>
              ))}
            </select>
          </div>

          <div className="input-item">
            <label htmlFor="studio">Studio:</label>
            <select
              id="studio"
              name="studio"
              value={inputs.studio}
              defaultValue={dance.studio ? dance.studio : "None"}
              onChange={handleChange}
            >
              {/* <option
                default
                alue={dance.studio ? dance.studio : "None"}
              >
                {dance.studio ? dance.studio : "None"}
              </option> */}
              {parent.studios.map(studio => (
                <option key={studio.id} value={studio.id}>
                  {studio.studioName}
                </option>
              ))}
              <option value={"None"}>None</option>
            </select>
          </div>

          <div className="form-row">
            <div className="day form-row-item">
              <label htmlFor="day">Day:</label>
              <select
                className="day"
                id="day"
                name="day"
                defaultValue={dance.day}
                onChange={handleChange}
              >
                <option default defaultValue={""} disabled>
                  Day...
                </option>
                <option defaultValue="Mon.">Mon.</option>
                <option defaultValue="Tue.">Tue.</option>
                <option defaultValue="Wed.">Wed.</option>
                <option defaultValue="Thur.">Thur.</option>
                <option defaultValue="Fri.">Fri.</option>
                <option defaultValue="Sat.">Sat.</option>
                <option defaultValue="Sun.">Sun.</option>
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
                defaultValue={dance.startTime}
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
                defaultValue={dance.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="performanceName">Performance Name</label>
            <input
              type="text"
              name="performanceName"
              placeholder="Performance Name, or Name of Song"
              defaultValue={dance.performanceName}
              onChange={handleChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="tights">Tights</label>
            <input
              type="text"
              name="tights"
              placeholder="The style of tights required..."
              defaultValue={dance.tights}
              onChange={handleChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="shoes">Shoes</label>
            <input
              type="text"
              name="shoes"
              placeholder="The style of shoes required..."
              defaultValue={dance.shoes}
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
              defaultValue={dance.notes}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn-dark"
            onClick={() => toggleFileInput(true)}
          >
            Add/Change Music
          </button>
          {showFileInput && (
            <div className="input-item">
              <label htmlFor="audioFile">Upload music for this dance...</label>
              <input
                type="file"
                id="audioFile"
                name="audioFile"
                placeholder="Upload music for this dance"
                onChange={setSongtoState}
              />
            </div>
          )}
          <div className="form-footer">
            <button type="submit" disabled={updatingRoutine || loadingSong}>
              Sav
              {updatingRoutine ? "ing " : "e "} Changes
            </button>
            <BackButton text="Cancel" classNames="btn-danger" />{" "}
          </div>
        </fieldset>
      </StyledCreateClassForm>
    </Fragment>
  );
}

export default UpdateCustomRoutine;
export { UPDATE_CUSTOM_ROUTINE };
