import React, { useState, Fragment } from "react";
import Router from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CATEGORIES_QUERY } from "./EditClassCategories";
import { DELETE_CLOUDINARY_ASSET } from "../../components/Mutations";
import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import Error from "../Error";
import { StyledCreateClassForm } from "../styles/Form";
import DeleteDanceClass from "./DeleteDanceClass";
import Modal from "../Modal";

const UPDATE_DANCECLASS_MUTATION = gql`
  mutation UPDATE_DANCECLASS_MUTATION(
    $id: ID!
    $name: String
    $style: String
    $level: String
    $division: String
    $day: String
    $startTime: String
    $endTime: String
    $shoes: String
    $tights: String
    $notes: String
    $music: String
    $musicId: String
    $performanceName: String
    $makeupSet: ID
    $size: String
  ) {
    updateDanceClass(
      id: $id
      name: $name
      style: $style
      level: $level
      division: $division
      day: $day
      startTime: $startTime
      endTime: $endTime
      shoes: $shoes
      tights: $tights
      notes: $notes
      music: $music
      musicId: $musicId
      performanceName: $performanceName
      makeupSet: $makeupSet
      size: $size
    ) {
      message
    }
  }
`;

const UpdateDanceClass = ({ danceClass, studio }) => {
  const [values, setValues] = useState({});
  const [loadingSong, setLoadingSong] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [error, setError] = useState();

  const [
    updateDanceClass,
    { loading: updatingDanceClass, error: errorUpdatingDanceClass }
  ] = useMutation(UPDATE_DANCECLASS_MUTATION, {
    variables: { ...values, id: danceClass.id },
    refetchQueries: { query: ALL_DANCE_CLASSES_QUERY },
    awaitRefetchQueries: true,
    onCompleted: () => {
      Router.push({
        pathname: "/studio/classes"
      });
    }
  });
  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET, {
    onError: error => setError(error)
  });

  const loading = loadingSong || updatingDanceClass || deletingAsset;

  const saveChanges = async e => {
    e.preventDefault();
    //A. update class with audioFile:
    if (values.audioFile) {
      setLoadingSong(true);
      // 1. if dance already has a song, delete it
      if (danceClass.musicId) {
        await deleteCloudinaryAsset({
          variables: { publicId: danceClass.musicId }
        }).catch(error => setError(error));
      }
      //1. upload new song
      await uploadSong(danceClass.id, values.audioFile);

      setLoadingSong(false);
      await updateDanceClass().catch(error => {
        deleteCloudinaryAsset({ variables: { publicId: values.musicId } });
        setError(error);
      });
    }
    // B. update class without audiofile
    await updateDanceClass();
  };

  const uploadSong = async (routineId, asset) => {
    const data = new FormData();
    data.append("file", asset);
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
      ...values,
      music: file.secure_url,
      musicId: file.public_id
    });
  };

  // disable submission of empty state if no updates are made
  const disableButton = Object.keys(values).length < 1;
  let defaultMakeupSet = "";
  if (danceClass.makeupSet) {
    defaultMakeupSet = danceClass.makeupSet.name;
  }

  if (error) {
    return <Error error={error} />;
  }
  // console.log("categories data:", data && data.studioCategories);

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

          {/* {newDanceClass && (
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
          )} */}
        </div>
      </Modal>
      <StyledCreateClassForm onSubmit={e => saveChanges(e)}>
        <h2>Update {danceClass.name}</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <div className="input-item">
            <label htmlFor="name">Class Name </label>
            <input
              required
              type="text"
              name="name"
              placeholder="name"
              defaultValue={danceClass.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="input-item">
            <label htmlFor="performanceName">Performance Name</label>
            <input
              type="text"
              name="performanceName"
              placeholder="Performance Name, or Name of Song"
              defaultValue={danceClass.performanceName}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="input-item">
            <label htmlFor="music">
              Add / Change the music for this dance...
            </label>
            <input
              type="file"
              id="music"
              name="music"
              placeholder="Upload music for this dance"
              onChange={e =>
                setValues({ ...values, audioFile: e.target.files[0] })
              }
            />
          </div>
          <div className="input-item">
            <label htmlFor="size">
              {`Size...(Currently ${danceClass.size})`}
            </label>
            <select
              id="size"
              name="size"
              defaultValue={danceClass.size}
              onChange={e => setValues({ ...values, name: e.target.value })}
            >
              <option value="Group">Group</option>
              <option value="Solo">Solo</option>
              <option value="Duo">Duo</option>
              <option value="Trio">Trio</option>
            </select>
          </div>

          <div className="form-row">
            <div className="day form-row-item">
              <label htmlFor="day">Day:</label>
              <select
                id="day"
                name="day"
                defaultValue={danceClass.day}
                onChange={e => setValues({ ...values, name: e.target.value })}
              >
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
                defaultValue={danceClass.startTime}
                onChange={e => setValues({ ...values, name: e.target.value })}
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
                defaultValue={danceClass.endTime}
                onChange={e => setValues({ ...values, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-row-item">
              <label htmlFor="style">Style: </label>

              <select
                required
                id="style"
                name="style"
                defaultValue={danceClass.style}
                onChange={e => setValues({ ...values, name: e.target.value })}
              >
                {studio.styles.map(style => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row-item">
              <label htmlFor="level">Level: </label>

              <select
                required
                id="level"
                name="level"
                defaultValue={danceClass.level}
                onChange={e => setValues({ ...values, name: e.target.value })}
              >
                {studio.levels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row-item">
              <label htmlFor="division">Division: </label>

              <select
                required
                id="division"
                name="division"
                defaultValue={danceClass.division}
                onChange={e => setValues({ ...values, name: e.target.value })}
              >
                {studio.divisions.map(division => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-row-item">
              <label htmlFor="tights">Tights </label>
              <input
                type="text"
                name="tights"
                placeholder="The style of tights required..."
                defaultValue={danceClass.tights}
                onChange={e => setValues({ ...values, name: e.target.value })}
              />
            </div>

            <div className="form-row-item">
              <label htmlFor="shoes">Shoes </label>
              <input
                type="text"
                name="shoes"
                placeholder="The style of shoes required..."
                defaultValue={danceClass.shoes}
                onChange={e => setValues({ ...values, name: e.target.value })}
              />
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="notes">Notes</label>

            <textarea
              id="notes"
              type="text"
              name="notes"
              rows="5"
              defaultValue={danceClass.notes}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>

          <div className="input-item">
            <label htmlFor="makeupSet">Makeup: </label>

            <select
              id="makeupSet"
              name="makeupSet"
              defaultValue={defaultMakeupSet}
              onChange={e => setValues({ ...values, name: e.target.value })}
            >
              {!defaultMakeupSet && (
                <option default disabled value={""}>
                  Makeup...
                </option>
              )}
              {studio.makeupSets.map(set => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
              <option value={"none"}>None</option>
            </select>
          </div>

          <button type="submit" disabled={disableButton}>
            SAV
            {loading ? "ING " : "E "} Class
          </button>
          <button
            type="button"
            onClick={() =>
              Router.push({
                pathname: "/studio/classes"
              })
            }
          >
            Cancel
          </button>
          <DeleteDanceClass id={danceClass.id}>
            Delete this Class
          </DeleteDanceClass>
        </fieldset>
      </StyledCreateClassForm>
    </Fragment>
  );
};

export default UpdateDanceClass;
export { UPDATE_DANCECLASS_MUTATION };
