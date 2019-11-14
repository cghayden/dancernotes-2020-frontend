import React from "react";
import Card from "../styles/Card";
function StudioDancerCard(props) {
  const { dancer } = props;
  return (
    <Card>
      <h2>{dancer.firstName}</h2>
      <div className="card__section">
        <h3>Dances / Classes</h3>
        <ul>
          {dancer.danceClasses.map((danceClass, index) => (
            <li key={index}>{danceClass.name}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default StudioDancerCard;
