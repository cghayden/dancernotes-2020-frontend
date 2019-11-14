import React from "react";

function MyDancers(props) {
  return (
    <div>
      <h3>My Dancers:</h3>
      {props.dancers.map(dancer => (
        <p key={dancer.id}>{dancer.firstName}</p>
      ))}
    </div>
  );
}

export default MyDancers;
