import React from "react";
import Card from "../styles/Card";

function MyProfile(props) {
  return (
    <Card>
      <div className="card__section">
        <ul>
          <li>First Name {props.user.firstName}</li>
          <li>Email {props.user.email}</li>

          <li>Reset Password</li>
        </ul>
      </div>
    </Card>
  );
}

export default MyProfile;
