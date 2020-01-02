import React, { Fragment, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { StyledCreateClassForm } from "../styles/Form";
import { STUDIOS_AND_DANCERS } from "./Queries";
import { DELETE_CLOUDINARY_ASSET } from "../Mutations";
import Error from "../Error";
import BackButton from "../BackButton";
import Modal from "../Modal";

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

const UpdateCustomRoutine = ({ dance }) => {
  const [values, setValues] = useState({});
  const [audioFile, setAudioFile] = useState();
  const [loadingSong, setLoadingSong] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [error, setError] = useState();
  const {
    data: parent,
    loading: loadingParent,
    error: errorLoadingParent
  } = useQuery(STUDIOS_AND_DANCERS);

  const [
    updateCustomRoutine,
    { loading: loadingUpdate, error: errorUpdatingDanceClass }
  ] = useMutation(UPDATE_CUSTOM_ROUTINE, {
    variables: { ...values, id: dance.id },
    refetchQueries: ["allRs"],
    awaitRefetchQueries: true
    // onCompleted: onCompleted
  });

  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET, {
    onError: error => setError(error)
  });

  const uploadSong = async routineId => {
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
    );
    const file = await res.json();
    setValues({
      music: file.secure_url,
      musicId: file.public_id,
      ...values
    });
  };

  const saveChanges = async (e, updateMutation) => {
    e.preventDefault();
    // if audioFile, upload and get new Id.
    if (audioFile) {
      // if dance already has a song, delete it
      if (dance.musicId) {
        setLoadingSong(true);
        await deleteCloudinaryAsset({
          variables: { publicId: danceClass.musicId }
        }).catch(error => setError(error));
      }
      //upload song to cloudinary and set id and url to state
      await uploadSong(dance.id, audioFile).catch(error => setError(error));
      setLoadingSong(false);
    }
    // update routine with values in state
    await updateMutation().catch(error => {
      // delete song file from cloudinary because there was an error updating the class with the song url and id
      deleteCloudinaryAsset({
        variables: {
          publicId: file.public_id
        }
      });
      setError(error);
    });
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Fragment>
      <Modal open={showModal} setOpen={toggleModal}>
        <div>
          {errorUpdatingDanceClass && (
            <>
              <p>
                Warning: there was a problem saving your class. Please try
                again:
              </p>
              <button role="button" onClick={() => toggleModal(false)}>
                Try Again
              </button>
              <Link href={`/studio/home`}>
                <a>Never Mind!</a>
              </Link>
            </>
          )}
        </div>
      </Modal>
      <StyledCreateClassForm
        method="post"
        onSubmit={async e => await saveChanges(e, updateCustomRoutine)}
      >
        <fieldset
          disabled={loadingUpdate || loadingSong}
          aria-busy={loadingUpdate || loadingSong}
        >
          <h2>Update {dance.name}</h2>
          <Error error={errorUpdatingDanceClass} />
          <div className="input-item">
            <label htmlFor="name">Name*</label>
            <input
              required
              pattern="(?!^ +$)^.+$"
              type="text"
              name="name"
              defaultValue={dance.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="dancer">Dancer*</label>
            <select
              id="dancer"
              name="dancer"
              defaultValue={dance.dancer}
              onChange={handleInputChange}
            >
              <option default defaultValue={""} disabled>
                Dancer...
              </option>
              {parent &&
                parent.parentUser.dancers.map(dancer => (
                  <option key={dancer.id} defaultValue={dancer.id}>
                    {dancer.firstName}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-item">
            <label htmlFor="studio">Studio:</label>
            <select
              required
              id="studio"
              name="studio"
              defaultValue={dance.studio}
              onChange={handleInputChange}
            >
              <option default defaultValue={""} disabled>
                Studio...
              </option>
              {parent &&
                parent.parentUser.studios.map(studio => (
                  <option key={studio.id} defaultValue={studio.id}>
                    {studio.studioName}
                  </option>
                ))}
              <option defaultValue={"None"}>None</option>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="tights">Tights</label>
            <input
              type="text"
              name="tights"
              placeholder="The style of tights required..."
              defaultValue={dance.tights}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="shoes">Shoes</label>
            <input
              type="text"
              name="shoes"
              placeholder="The style of shoes required..."
              defaultValue={dance.shoes}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="music">Upload music for this dance...</label>
            <input
              type="file"
              id="music"
              name="music"
              placeholder="Upload music for this dance"
              onChange={e => setAudioFile(e.target.files[0])}
            />
          </div>

          <div className="form-footer">
            <button type="submit" disabled={loadingUpdate || loadingSong}>
              Sav
              {loadingUpdate ? "ing " : "e "} Changes
            </button>
            <BackButton text="Cancel" classNames="btn-danger" />{" "}
          </div>
        </fieldset>
      </StyledCreateClassForm>
    </Fragment>
  );
};

export default UpdateCustomRoutine;
export { UPDATE_CUSTOM_ROUTINE };
