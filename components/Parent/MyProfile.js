import React from "react";
function MyProfile(props) {
  return (
    <div>
      <ul>
        <li>First Name {props.user.firstName}</li>
        <li>Last Name {props.user.lastName}</li>
        <li>Email {props.user.email}</li>
        <li>Address ....</li>
        <li>Phone ....</li>
        <li>Emergency Contact ....</li>
        <li>Reset Password ....</li>
      </ul>
    </div>
  );
}

export default MyProfile;
