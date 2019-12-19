import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CUSTOM_ROUTINE_QUERY } from "./Queries";
import { StyledCreateClassForm } from "../styles/Form";
import Error from "../Error";

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

const UpdateCustomRoutine = ({ danceId }) => {
  const [values, setValues] = useState({});
  const [audioFile, setAudioFile] = useState();
  const {
    data,
    loading: loadingRoutine,
    error: errorLoadingRoutine
  } = useQuery(CUSTOM_ROUTINE_QUERY, {
    variables: { id: danceId }
  });
  const [
    updateCustomRoutine,
    { loading: loadingMutation, error: mutationError }
  ] = useMutation(UPDATE_CUSTOM_ROUTINE, {
    variables: { ...values, id: danceId },
    refetchQueries: ["allRs"],
    awaitRefetchQueries: true
    // onCompleted: onCompleted
  });

  const dance = data ? data.customRoutine : {};

  const onCompleted = () => {
    console.log("update complete");
    // Router.push({
    //   pathname: "/parent/notes/routines"
    // });
  };

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
      await uploadSong(danceId);
    }
    // update routine with music url from cloudinary
    await updateMutation();
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  if (loadingRoutine) return <h2>5, 6, 7, 8</h2>;
  return (
    <StyledCreateClassForm
      method="post"
      onSubmit={async e => await saveChanges(e, updateCustomRoutine)}
    >
      <fieldset disabled={loadingMutation} aria-busy={loadingMutation}>
        <h2>Update {dance.name}</h2>
        <Error error={errorLoadingRoutine || mutationError} />
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
        {/* <div className="input-item">
                                <label htmlFor="dancer">
                                  Dancer*
                                  <p>(You may add other dancers later.)</p>
                                </label>

                                <select
                                  required
                                  id="dancer"
                                  name="dancer"
                                  defaultValue={dance.dancer}
                                  onChange={handleInputChange}
                                >
                                  <option default defaultValue={""} disabled>
                                    Dancer...
                                  </option>
                                  {parentsDancers &&
                                    parentsDancers.map(dancer => (
                                      <option key={dancer.id} defaultValue={dancer.id}>
                                        {dancer.firstName}
                                      </option>
                                    ))}
                                </select>
                              </div>*/}

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
            {/* {parentStudios &&
                                    parentStudios.map(studio => (
                                      <option key={studio.id} defaultValue={studio.id}>
                                        {studio.studioName}
                                      </option>
                                    ))} */}
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
          <button type="submit" disabled={loadingMutation}>
            Sav
            {loadingMutation ? "ing " : "e "} Changes
          </button>
          <button>Cancel</button>
        </div>
      </fieldset>
    </StyledCreateClassForm>
  );
};

export default UpdateCustomRoutine;
export { UPDATE_CUSTOM_ROUTINE };