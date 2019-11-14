import React, { Component } from "react";
import Router from "next/router";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CATEGORIES_QUERY } from "./EditClassCategories";
import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import Error from "../Error";
import { StyledCreateClassForm } from "./CreateDanceClassForm";
import DeleteDanceClass from "./DeleteDanceClass";
const SINGLE_DANCE_QUERY = gql`
  query SINGLE_DANCE_QUERY($id: ID!) {
    danceClass(where: { id: $id }) {
      id
      name
      style
      level
      division
      day
      startTime
      endTime
      shoes
      tights
      notes
      music
      performanceName
      makeupSet {
        name
      }
      size
    }
  }
`;

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
      performanceName: $performanceName
      makeupSet: $makeupSet
      size: $size
    ) {
      message
    }
  }
`;

export default class UpdateDanceClass extends Component {
  state = {
    loadingSong: false,
    // sizeDefaultOption: "Add or Change Size..."
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateDanceClass = async (e, updateDanceClassMutation) => {
    e.preventDefault();
    const res = await updateDanceClassMutation({
      variables: { id: this.props.id, ...this.state },
    });
    Router.push({
      pathname: "/studio/classes",
    });
  };
  uploadSong = async e => {
    this.setState({ loadingSong: true });
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dancernotes-music");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/video/upload",
      {
        method: "POST",
        body: data,
      },
    );
    const file = await res.json();
    this.setState({
      music: file.secure_url,
      loadingSong: false,
    });
  };

  render() {
    // disable submission of empty state if no updates are made
    const disableButton = Object.keys(this.state).length < 2;

    return (
      <Query query={CATEGORIES_QUERY}>
        {({ data: { studioCategories } = {} }, error, loading) => {
          return (
            <Query query={SINGLE_DANCE_QUERY} variables={{ id: this.props.id }}>
              {({ data: { danceClass } = {}, loading, error }) => {
                let size = danceClass.size;
                let defaultMakeupSet = "";
                if (danceClass.makeupSet) {
                  defaultMakeupSet = danceClass.makeupSet.name;
                }
                if (loading) return <p>Loading...</p>;
                if (!danceClass)
                  return (
                    <p>Error: No DanceClass found for ID {this.props.id}</p>
                  );
                return (
                  <Mutation
                    mutation={UPDATE_DANCECLASS_MUTATION}
                    variables={this.state}
                    refetchQueries={[{ query: ALL_DANCE_CLASSES_QUERY }]}
                    awaitRefetchQueries={true}
                  >
                    {(updateDanceClass, { loading, error }) => {
                      return (
                        <StyledCreateClassForm
                          onSubmit={e =>
                            this.updateDanceClass(e, updateDanceClass)
                          }
                        >
                          <fieldset
                            disabled={loading || this.state.loadingSong}
                            aria-busy={loading || this.state.loadingSong}
                          >
                            <Error error={error} />
                            <label htmlFor="name">
                              Class Name
                              <input
                                required
                                type="text"
                                name="name"
                                placeholder="name"
                                defaultValue={danceClass.name}
                                onChange={this.handleChange}
                              />
                            </label>
                            <label htmlFor="performanceName">
                              Performance Name
                              <input
                                type="text"
                                name="performanceName"
                                placeholder="Performance Name, or Name of Song"
                                defaultValue={danceClass.performanceName}
                                onChange={this.handleChange}
                              />
                            </label>
                            <label htmlFor="size">
                              {`Size...(Currently ${danceClass.size})`}

                              <select
                                id="size"
                                name="size"
                                defaultValue={danceClass.size}
                                onChange={this.handleChange}
                              >
                                <option value="Group">Group</option>
                                <option value="Solo">Solo</option>
                                <option value="Duo">Duo</option>
                                <option value="Trio">Trio</option>
                              </select>
                            </label>
                            <div className="formGroup">
                              <div className="day formGroup-item">
                                <label htmlFor="day">
                                  Day:
                                  <select
                                    id="day"
                                    name="day"
                                    defaultValue={danceClass.day}
                                    onChange={this.handleChange}
                                  >
                                    <option value="Mon.">Mon.</option>
                                    <option value="Tue.">Tue.</option>
                                    <option value="Wed.">Wed.</option>
                                    <option value="Thur.">Thur.</option>
                                    <option value="Fri.">Fri.</option>
                                    <option value="Sat.">Sat.</option>
                                    <option value="Sun.">Sun.</option>
                                  </select>
                                </label>
                              </div>
                              <div className="formGroup-item">
                                <label htmlFor="startTime">
                                  Start Time:
                                  <input
                                    type="time"
                                    id="startTime"
                                    name="startTime"
                                    min="0:00"
                                    max="23:59"
                                    defaultValue={danceClass.startTime}
                                    onChange={this.handleChange}
                                  />
                                </label>
                              </div>

                              <div className="formGroup-item">
                                <label htmlFor="endTime">
                                  End Time:
                                  <input
                                    type="time"
                                    id="endTime"
                                    name="endTime"
                                    min="0:00"
                                    max="23:59"
                                    defaultValue={danceClass.endTime}
                                    onChange={this.handleChange}
                                  />
                                </label>
                              </div>
                            </div>

                            <div className="formGroup">
                              <div className="formGroup-item">
                                <label htmlFor="style">
                                  Style:
                                  <select
                                    required
                                    id="style"
                                    name="style"
                                    defaultValue={studioCategories.style}
                                    onChange={this.handleChange}
                                  >
                                    {studioCategories.styles.map(style => (
                                      <option key={style} value={style}>
                                        {style}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              </div>
                              <div className="formGroup-item">
                                <label htmlFor="level">
                                  Level:
                                  <select
                                    required
                                    id="level"
                                    name="level"
                                    defaultValue={studioCategories.level}
                                    onChange={this.handleChange}
                                  >
                                    {studioCategories.levels.map(level => (
                                      <option key={level} value={level}>
                                        {level}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              </div>
                              <div className="formGroup-item">
                                <label htmlFor="division">
                                  Division:
                                  <select
                                    required
                                    id="division"
                                    name="division"
                                    defaultValue={studioCategories.division}
                                    onChange={this.handleChange}
                                  >
                                    {studioCategories.divisions.map(
                                      division => (
                                        <option key={division} value={division}>
                                          {division}
                                        </option>
                                      ),
                                    )}
                                  </select>
                                </label>
                              </div>
                            </div>
                            <label htmlFor="tights">
                              Tights
                              <input
                                type="text"
                                name="tights"
                                placeholder="The style of tights required..."
                                defaultValue={danceClass.tights}
                                onChange={this.handleChange}
                              />
                            </label>
                            <label htmlFor="shoes">
                              Shoes
                              <input
                                type="text"
                                name="shoes"
                                placeholder="The style of shoes required..."
                                defaultValue={danceClass.shoes}
                                onChange={this.handleChange}
                              />
                            </label>
                            <label htmlFor="notes">
                              Notes
                              <textarea
                                id="notes"
                                type="text"
                                name="notes"
                                rows="5"
                                defaultValue={danceClass.notes}
                                onChange={this.handleChange}
                              />
                            </label>
                            <label htmlFor="makeupSet">
                              Makeup:
                              <select
                                id="makeupSet"
                                name="makeupSet"
                                defaultValue={defaultMakeupSet}
                                onChange={this.handleChange}
                              >
                                {!defaultMakeupSet && (
                                  <option default disabled value={""}>
                                    Makeup...
                                  </option>
                                )}
                                {studioCategories.makeupSets.map(set => (
                                  <option key={set.id} value={set.id}>
                                    {set.name}
                                  </option>
                                ))}
                                <option value={"none"}>None</option>
                              </select>
                            </label>
                            <label htmlFor="music">
                              Add / Change the music for this dance...
                              <input
                                type="file"
                                id="music"
                                name="music"
                                placeholder="Upload music for this dance"
                                onChange={this.uploadSong}
                              />
                            </label>

                            <button type="submit" disabled={disableButton}>
                              SAV
                              {loading ? "ING " : "E "} Class
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                Router.push({
                                  pathname: "/studio/classes",
                                })
                              }
                            >
                              Cancel
                            </button>
                            <DeleteDanceClass id={this.props.id}>
                              Delete this Class
                            </DeleteDanceClass>
                          </fieldset>
                        </StyledCreateClassForm>
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
  }
}
