import React from "react";
import Card from "../styles/Card";
function StudioDancerCard({ dancer }) {
  console.log("dancer:", dancer);
  return (
    <Card>
      <h2>{dancer.firstName}</h2>

      <p>
        Parent:{"  "}
        <span>{dancer.parent.firstName}</span>
      </p>
      <p>
        Parent email:{"  "}
        <span>{dancer.parent.email}</span>
      </p>
      <div className="card__section">
        <h3>Dance Classes</h3>
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
