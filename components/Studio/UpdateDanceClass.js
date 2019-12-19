import React, { useState } from "react";
import Router from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CATEGORIES_QUERY } from "./EditClassCategories";
import { DELETE_CLOUDINARY_ASSET } from "../../components/Mutations";
import { ALL_DANCE_CLASSES_QUERY, SINGLE_DANCE_QUERY } from "./Queries";
import Error from "../Error";
import { StyledCreateClassForm } from "../styles/Form";
import DeleteDanceClass from "./DeleteDanceClass";

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

const UpdateDanceClass = ({ danceClass }) => {
  const [values, setValues] = useState({});
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const [
    updateDanceClass,
    { loading: updatingClass, error: errorUpdatingClass }
  ] = useMutation(
    UPDATE_DANCECLASS_MUTATION,
    { variables: { ...values, id: danceClass.id } }
    //  {refetchQueries={query: ALL_DANCE_CLASSES_QUERY }
    // awaitRefetchQueries={true}
    // }
  );
  const [
    deleteCloudinaryAsset,
    { loading: deletingAsset, error: errorDeletingAsset }
  ] = useMutation(DELETE_CLOUDINARY_ASSET);

  const saveChanges = async e => {
    e.preventDefault();
    //1 if upload song,
    if (values.audioFile) {
      if (danceClass.musicId) {
        console.log("deleting asset from cloudinary");
        await deleteCloudinaryAsset({
          variables: { publicId: danceClass.musicId }
        });
      }
      console.log("uploading asset to cloudinary");
      await uploadSong(danceClass.id, values.audioFile);
      console.log("upload complete");
    }
    // 2 update class
    await updateDanceClass();
    Router.push({
      pathname: "/studio/classes"
    });
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

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error || errorLoadingClass} />;
  }
  // console.log("categories data:", data && data.studioCategories);

  return (
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

    //                       <label htmlFor="performanceName">
    //                         Performance Name
    //                         <input
    //                           type="text"
    //                           name="performanceName"
    //                           placeholder="Performance Name, or Name of Song"
    //                           defaultValue={danceClass.performanceName}
    //                           onChange={this.handleChange}
    //                         />
    //                       </label>
    //                       <label htmlFor="size">
    //                         {`Size...(Currently ${danceClass.size})`}

    //                         <select
    //                           id="size"
    //                           name="size"
    //                           defaultValue={danceClass.size}
    //                           onChange={this.handleChange}
    //                         >
    //                           <option value="Group">Group</option>
    //                           <option value="Solo">Solo</option>
    //                           <option value="Duo">Duo</option>
    //                           <option value="Trio">Trio</option>
    //                         </select>
    //                       </label>
    //                       <div className="form-row">
    //                         <div className="day form-row-item">
    //                           <label htmlFor="day">
    //                             Day:
    //                             <select
    //                               id="day"
    //                               name="day"
    //                               defaultValue={danceClass.day}
    //                               onChange={this.handleChange}
    //                             >
    //                               <option value="Mon.">Mon.</option>
    //                               <option value="Tue.">Tue.</option>
    //                               <option value="Wed.">Wed.</option>
    //                               <option value="Thur.">Thur.</option>
    //                               <option value="Fri.">Fri.</option>
    //                               <option value="Sat.">Sat.</option>
    //                               <option value="Sun.">Sun.</option>
    //                             </select>
    //                           </label>
    //                         </div>
    //                         <div className="form-row-item">
    //                           <label htmlFor="startTime">
    //                             Start Time:
    //                             <input
    //                               type="time"
    //                               id="startTime"
    //                               name="startTime"
    //                               min="0:00"
    //                               max="23:59"
    //                               defaultValue={danceClass.startTime}
    //                               onChange={this.handleChange}
    //                             />
    //                           </label>
    //                         </div>

    //                         <div className="form-row-item">
    //                           <label htmlFor="endTime">
    //                             End Time:
    //                             <input
    //                               type="time"
    //                               id="endTime"
    //                               name="endTime"
    //                               min="0:00"
    //                               max="23:59"
    //                               defaultValue={danceClass.endTime}
    //                               onChange={this.handleChange}
    //                             />
    //                           </label>
    //                         </div>
    //                       </div>

    //                       <div className="form-row">
    //                         <div className="form-row-item">
    //                           <label htmlFor="style">
    //                             Style:
    //                             <select
    //                               required
    //                               id="style"
    //                               name="style"
    //                               defaultValue={studioCategories.style}
    //                               onChange={this.handleChange}
    //                             >
    //                               {studioCategories.styles.map(style => (
    //                                 <option key={style} value={style}>
    //                                   {style}
    //                                 </option>
    //                               ))}
    //                             </select>
    //                           </label>
    //                         </div>
    //                         <div className="form-row-item">
    //                           <label htmlFor="level">
    //                             Level:
    //                             <select
    //                               required
    //                               id="level"
    //                               name="level"
    //                               defaultValue={studioCategories.level}
    //                               onChange={this.handleChange}
    //                             >
    //                               {studioCategories.levels.map(level => (
    //                                 <option key={level} value={level}>
    //                                   {level}
    //                                 </option>
    //                               ))}
    //                             </select>
    //                           </label>
    //                         </div>
    //                         <div className="form-row-item">
    //                           <label htmlFor="division">
    //                             Division:
    //                             <select
    //                               required
    //                               id="division"
    //                               name="division"
    //                               defaultValue={studioCategories.division}
    //                               onChange={this.handleChange}
    //                             >
    //                               {studioCategories.divisions.map(
    //                                 division => (
    //                                   <option key={division} value={division}>
    //                                     {division}
    //                                   </option>
    //                                 )
    //                               )}
    //                             </select>
    //                           </label>
    //                         </div>
    //                       </div>
    //                       <label htmlFor="tights">
    //                         Tights
    //                         <input
    //                           type="text"
    //                           name="tights"
    //                           placeholder="The style of tights required..."
    //                           defaultValue={danceClass.tights}
    //                           onChange={this.handleChange}
    //                         />
    //                       </label>
    //                       <label htmlFor="shoes">
    //                         Shoes
    //                         <input
    //                           type="text"
    //                           name="shoes"
    //                           placeholder="The style of shoes required..."
    //                           defaultValue={danceClass.shoes}
    //                           onChange={this.handleChange}
    //                         />
    //                       </label>
    //                       <label htmlFor="notes">
    //                         Notes
    //                         <textarea
    //                           id="notes"
    //                           type="text"
    //                           name="notes"
    //                           rows="5"
    //                           defaultValue={danceClass.notes}
    //                           onChange={this.handleChange}
    //                         />
    //                       </label>
    //                       <label htmlFor="makeupSet">
    //                         Makeup:
    //                         <select
    //                           id="makeupSet"
    //                           name="makeupSet"
    //                           defaultValue={defaultMakeupSet}
    //                           onChange={this.handleChange}
    //                         >
    //                           {!defaultMakeupSet && (
    //                             <option default disabled value={""}>
    //                               Makeup...
    //                             </option>
    //                           )}
    //                           {studioCategories.makeupSets.map(set => (
    //                             <option key={set.id} value={set.id}>
    //                               {set.name}
    //                             </option>
    //                           ))}
    //                           <option value={"none"}>None</option>
    //                         </select>
    //                       </label>
    //
  );
};

export default UpdateDanceClass;
export { UPDATE_DANCECLASS_MUTATION };
// handleChange = e => {
//   const { name, type, value } = e.target;
//   const val = type === "number" ? parseFloat(value) : value;
//   this.setState({ [name]: val });
// };
