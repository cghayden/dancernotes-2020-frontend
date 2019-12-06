import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CUSTOM_ROUTINE_QUERY } from "./Queries";
import { StyledCreateClassForm } from "./CreateCustomRoutineForm";

const UpdateCustomRoutine = ({ danceId }) => {
  const [defaultValues, setValues] = useState({});
  const { data, error, loading } = useQuery(CUSTOM_ROUTINE_QUERY, {
    variables: { id: danceId }
  });
  const dance = data ? data.customRoutine : {};

  function onSuccess() {
    Router.push({
      pathname: "/parent/notes/routines"
    });
  }

  function updateCustomRoutine(e, updateMutation) {
    console.log("update routine");
  }

  function handleInputChange(e) {
    const { name, defaultValue } = e.target;
    setValues({ ...defaultValues, [name]: defaultValue });
  }

  return (
    <StyledCreateClassForm
      method="post"
      onSubmit={async e => await updateCustomRoutine(e)}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Update {dance.name}</h2>

        {/* <Error error={error} /> */}
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
            // onChange={}
          />
        </div>

        <div className="form-footer">
          <button type="submit" disabled={loading}>
            Sav
            {loading ? "ing " : "e "} Changes
          </button>
        </div>
      </fieldset>
    </StyledCreateClassForm>
  );
};

export default UpdateCustomRoutine;
