import React, { Component } from "react";

export default class EnrollmentRequestsCart extends Component {
  render() {
    const { dancer } = this.props;
    return (
      <div>
        {!dancer.requests && (
          <p>{dancer.firstName} Has No Requests for Enrollment</p>
        )}
        {dancer.requests && (
          <p>
            enrollment requests for {dancer.firstName}:{" "}
            {dancer.requests.classesRequested.length}
          </p>
        )}
      </div>
    );
  }
}
