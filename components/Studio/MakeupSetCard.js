import { useState, useEffect } from "react";
import Card from "../styles/Card";
import Edit from "../Icons/Edit";
import EditMakeupForm from "./EditMakeupForm";

function MakeupSetCard({ makeupSet }) {
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => setShowEdit(false), [makeupSet]);

  return !showEdit ? (
    <Card>
      <div className="card__header">
        <h3>{makeupSet.name}</h3>

        <button
          onClick={() => setShowEdit(true)}
          className="card__header--editButton"
        >
          <Edit />
        </button>
      </div>
      <ul>
        <li>Lipstick: {makeupSet.lipstick}</li>
        <li>Eye Shadow: {makeupSet.eyeShadow}</li>
        <li>Notes:{makeupSet.notes}</li>
      </ul>
    </Card>
  ) : (
    <EditMakeupForm
      makeupSet={makeupSet}
      id={makeupSet.id}
      setShowEdit={setShowEdit}
    />
  );
}

export default MakeupSetCard;
