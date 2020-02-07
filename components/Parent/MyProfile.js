import React from "react";
import Card from "../styles/Card";
import DancernotesInfo from "../DancernotesInfo";

function MyProfile(props) {
  return (
    <>
      <Card>
        <div className="card__section">
          <ul>
            <li>First Name {props.user.firstName}</li>
            <li>Email {props.user.email}</li>

            <li>Reset Password</li>
          </ul>
        </div>
      </Card>
      <Card>
        <div className="card-section">
          <DancernotesInfo />
        </div>
      </Card>
    </>
  );
}

export default MyProfile;
