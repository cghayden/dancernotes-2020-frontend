import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Link from "next/link";
import { CATEGORIES_QUERY } from "./EditClassCategories";
import { ALL_DANCE_CLASSES_QUERY } from "./Queries";
import Error from "../Error";
import StyledCreateClassForm from "../styles/Form";
import SuccessMessage from "../SuccessMessage";

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
    $music: String
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
      music: $music
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

class CreateDanceClass extends Component {
  state = {
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
    music: "",
    showSuccessMessage: false,
    loadingSong: false,
    makeupSet: "none",
    size: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadSong = async e => {
    this.setState({ loadingSong: true });
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dancernotes-music");
    data.append("tag", "studioMusic");

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
      loadingSong: false
    });
  };

  closeSuccessMessage = () => {
    this.setState({ showSuccessMessage: false });
  };

  onSuccess = danceClass => {
    if (danceClass.size === "Group") {
      this.setState({ showSuccessMessage: true });
    } else {
      Router.push({
        pathname: "/studio/addDancers",
        query: { id: danceClass.id }
      });
    }
  };

  render() {
    return (
      <Query query={CATEGORIES_QUERY}>
        {({ data, error, loading }) => {
          const studioCategories = data ? data.studioCategories : {};
          if (loading) return <p>5,6,7,8 ...</p>;
          if (error) return <Error error={error} />;
          return (
            <Mutation
              mutation={CREATE_DANCE_CLASS_MUTATION}
              variables={this.state}
              onCompleted={({ createDanceClass }) =>
                this.onSuccess(createDanceClass)
              }
              refetchQueries={[{ query: ALL_DANCE_CLASSES_QUERY }]}
              awaitRefetchQueries={true}
            >
              {(createDanceClass, { error, loading }) => {
                return (
                  <>
                    {this.state.showSuccessMessage && (
                      <SuccessMessage closeFunc={this.closeSuccessMessage} />
                    )}
                    <StyledCreateClassForm
                      method="post"
                      onSubmit={async e => {
                        e.preventDefault();
                        const res = await createDanceClass();
                        this.setState({
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
                          music: "",
                          makeupSet: "none"
                        });
                      }}
                    >
                      <fieldset disabled={loading} aria-busy={loading}>
                        <legend>Add A New Dance Class To Your Schedule</legend>
                        <Link href="configureClassCategories">
                          <a className="btn-dark">Configure Class Categories</a>
                        </Link>
                        <Error error={error} />
                        <div className="input-item">
                          <label htmlFor="name">Class Name</label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="input-item">
                          <label htmlFor="size">Size:</label>
                          <select
                            id="size"
                            name="size"
                            value={this.state.size}
                            onChange={this.handleChange}
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
                              value={this.state.day}
                              onChange={this.handleChange}
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
                              value={this.state.startTime}
                              onChange={this.handleChange}
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
                              value={this.state.endTime}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>

                        <div className="input-item">
                          <label htmlFor="style">Style:</label>
                          <select
                            required
                            id="style"
                            name="style"
                            value={this.state.style}
                            onChange={this.handleChange}
                          >
                            <option default value={""} disabled>
                              Style...
                            </option>
                            {studioCategories.styles.map(style => (
                              <option key={style} value={style}>
                                {style}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input-item">
                          <label htmlFor="level">Level:</label>
                          <select
                            required
                            id="level"
                            name="level"
                            value={this.state.level}
                            onChange={this.handleChange}
                          >
                            <option default disabled value={""}>
                              Level...
                            </option>
                            {studioCategories.levels.map(level => (
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
                            value={this.state.division}
                            onChange={this.handleChange}
                          >
                            <option default disabled value={""}>
                              Division...
                            </option>
                            {studioCategories.divisions.map(division => (
                              <option key={division} value={division}>
                                {division}
                              </option>
                            ))}
                          </select>
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
                          <label htmlFor="makeupSet">Makeup:</label>
                          <select
                            id="makeupSet"
                            name="makeupSet"
                            value={this.state.makeupSet}
                            onChange={this.handleChange}
                          >
                            <option default disabled value={""}>
                              Makeup...
                            </option>
                            {studioCategories.makeupSets.map(set => (
                              <option key={set.id} value={set.id}>
                                {set.name}
                              </option>
                            ))}
                            <option value={"none"}>
                              None at this time, N/A
                            </option>
                          </select>
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
                            onChange={this.uploadSong}
                          />
                        </div>

                        <div>
                          <button
                            type="submit"
                            disabled={loading || this.state.loadingSong}
                          >
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
  }
}

export default CreateDanceClass;
export { StyledCreateClassForm };
