import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import Error from "../Error";
import Link from "next/link";
import Form from "../styles/Form";
import SuccessMessage from "../SuccessMessage";
import { PARENTS_STUDIOS, ALL_Rs } from "./Queries";
import { UPDATE_CUSTOM_ROUTINE } from "./UpdateCustomRoutine";
import StyledCreateClassForm from "../styles/Form";

const PARENTS_DANCERS_QUERY = gql`
  query {
    parentsDancers {
      firstName
      id
    }
  }
`;

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
    $music: String
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
      music: $music
      dancer: $dancer
      studio: $studio
    ) {
      name
      id
    }
  }
`;

class CreateCustomRoutineForm extends Component {
  state = {
    name: "",
    day: "",
    startTime: "",
    endTime: "",
    performanceName: "",
    shoes: "",
    tights: "",
    notes: "",
    music: "",
    musicId: "",
    showSuccessMessage: false,
    dancer: "",
    studio: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  setSongtoState = e => {
    const audioFile = e.target.files[0];
    this.setState({ audioFile });
  };

  uploadSong = async routineId => {
    const data = new FormData();
    data.append("file", this.state.audioFile);
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
    this.setState({
      music: file.secure_url,
      musicId: file.public_id
    });
  };

  closeSuccessMessage = () => {
    this.setState({ showSuccessMessage: false });
  };

  onSuccess = () => {
    console.log("updated dance with music");
    // Router.push({
    //   pathname: "/parent/notes/routines"
    // });
  };

  saveCustomRoutine = async (
    e,
    createCustomRoutineMutation,
    updateCustomRoutineMutation
  ) => {
    e.preventDefault();
    //1. createRoutine
    const newRoutine = await createCustomRoutineMutation({
      variables: {
        ...this.state
      }
    });
    console.log("newRoutine:", newRoutine);
    //2. if music file is queued in state,upload music with tag of routineId, then
    //3. update routine
    if (this.state.audioFile) {
      console.log("updating newRoutine with music...");

      const newRoutineId = newRoutine.data.createCustomRoutine.id;
      console.log("newRoutineId:", newRoutineId);
      await this.uploadSong(newRoutineId);
      await updateCustomRoutineMutation({
        variables: { id: newRoutineId, music: this.state.music }
      });
      console.log("music uploaded");
    }

    //4. reset state
    this.setState({
      name: "",
      day: "",
      startTime: "",
      endTime: "",
      performanceName: "",
      shoes: "",
      tights: "",
      notes: "",
      music: "",
      dancer: "",
      studio: ""
    });
    // this.onSuccess();
  };

  render() {
    return (
      <Mutation mutation={UPDATE_CUSTOM_ROUTINE}>
        {(
          updateCustomRoutine,
          { error: errorUpdatingRoutine, loading: updatingRoutine }
        ) => {
          return (
            <Query query={PARENTS_STUDIOS}>
              {({ data: { parentStudios } = {}, error, loading }) => {
                return (
                  <Query query={PARENTS_DANCERS_QUERY}>
                    {({ data: { parentsDancers } = {}, loading, error }) => {
                      return (
                        <Mutation
                          mutation={CREATE_CUSTOM_ROUTINE_MUTATION}
                          // onCompleted={({ createCustomRoutine }) =>
                          //   this.onSuccess(createCustomRoutine)
                          // }
                          refetchQueries={[{ query: ALL_Rs }]}
                          // awaitRefetchQueries={true}
                        >
                          {(
                            createCustomRoutine,
                            {
                              error: errorCreatingRoutine,
                              loading: savingRoutine
                            }
                          ) => {
                            if (
                              error ||
                              errorCreatingRoutine ||
                              errorUpdatingRoutine
                            )
                              return (
                                <Error
                                  error={
                                    error ||
                                    errorCreatingRoutine ||
                                    errorUpdatingRoutine
                                  }
                                />
                              );
                            return (
                              <>
                                {this.state.showSuccessMessage && (
                                  <SuccessMessage
                                    closeFunc={this.closeSuccessMessage}
                                  />
                                )}
                                <StyledCreateClassForm
                                  method="post"
                                  onSubmit={async e =>
                                    await this.saveCustomRoutine(
                                      e,
                                      createCustomRoutine,
                                      updateCustomRoutine
                                    )
                                  }
                                >
                                  <fieldset
                                    disabled={
                                      loading ||
                                      savingRoutine ||
                                      updatingRoutine
                                    }
                                    aria-busy={
                                      loading ||
                                      savingRoutine ||
                                      updatingRoutine
                                    }
                                  >
                                    <Error
                                      error={
                                        error ||
                                        errorCreatingRoutine ||
                                        errorUpdatingRoutine
                                      }
                                    />
                                    <h2>Create Your Own Routine</h2>
                                    <div className="input-item">
                                      <label htmlFor="name">Name* </label>
                                      <input
                                        required
                                        pattern="(?!^ +$)^.+$"
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                      />
                                    </div>
                                    <div className="input-item">
                                      <label htmlFor="dancer">
                                        Dancer*
                                        <p>
                                          (You may add other dancers later.)
                                        </p>
                                      </label>

                                      <select
                                        required
                                        id="dancer"
                                        name="dancer"
                                        value={this.state.dancer}
                                        onChange={this.handleChange}
                                      >
                                        <option default value={""} disabled>
                                          Dancer...
                                        </option>
                                        {parentsDancers &&
                                          parentsDancers.map(dancer => (
                                            <option
                                              key={dancer.id}
                                              value={dancer.id}
                                            >
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
                                        value={this.state.studio}
                                        onChange={this.handleChange}
                                      >
                                        <option default value={""} disabled>
                                          Studio...
                                        </option>
                                        {parentStudios &&
                                          parentStudios.map(studio => (
                                            <option
                                              key={studio.id}
                                              value={studio.id}
                                            >
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
                                          value={this.state.day}
                                          onChange={this.handleChange}
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
                                        <label htmlFor="startTime">
                                          Start Time:
                                        </label>
                                        <input
                                          className="day"
                                          type="time"
                                          id="startTime"
                                          name="startTime"
                                          min="0:00"
                                          max="23:59"
                                          value={this.state.startTime}
                                          onChange={this.handleChange}
                                        />
                                      </div>
                                      <div className="form-row-item">
                                        <label htmlFor="endTime">
                                          End Time:
                                        </label>
                                        <input
                                          className="day"
                                          type="time"
                                          id="endTime"
                                          name="endTime"
                                          min="0:00"
                                          max="23:59"
                                          value={this.state.endTime}
                                          onChange={this.handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="input-item">
                                      <label htmlFor="performanceName">
                                        Performance Name
                                      </label>
                                      <input
                                        type="text"
                                        name="performanceName"
                                        placeholder="Performance Name, or Name of Song"
                                        value={this.state.performanceName}
                                        onChange={this.handleChange}
                                      />
                                    </div>

                                    <div className="input-item">
                                      <label htmlFor="tights">Tights</label>
                                      <input
                                        type="text"
                                        name="tights"
                                        placeholder="The style of tights required..."
                                        value={this.state.tights}
                                        onChange={this.handleChange}
                                      />
                                    </div>

                                    <div className="input-item">
                                      <label htmlFor="shoes">Shoes</label>
                                      <input
                                        type="text"
                                        name="shoes"
                                        placeholder="The style of shoes required..."
                                        value={this.state.shoes}
                                        onChange={this.handleChange}
                                      />
                                    </div>
                                    <div className="input-item">
                                      <label htmlFor="notes">Notes</label>
                                      <textarea
                                        id="notes"
                                        type="text"
                                        name="notes"
                                        rows="5"
                                        value={this.state.notes}
                                        onChange={this.handleChange}
                                      />
                                    </div>
                                    <div className="input-item">
                                      <label htmlFor="music">
                                        Upload the music for this dance...
                                      </label>
                                      <input
                                        type="file"
                                        id="music"
                                        name="music"
                                        placeholder="Upload the music for this dance"
                                        onChange={this.setSongtoState}
                                      />
                                    </div>

                                    <div className="form-footer">
                                      <button type="submit" disabled={loading}>
                                        Creat
                                        {loading ? "ing " : "e "} Class
                                      </button>
                                    </div>
                                  </fieldset>
                                </StyledCreateClassForm>
                              </>
                            );
                          }}
                        </Mutation>
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateCustomRoutineForm;
export { StyledCreateClassForm };
