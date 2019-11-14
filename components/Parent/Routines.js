import React, { Component } from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
import ParentUserQuery from "./ParentUserQuery";
import RoutinesDisplay from "./RoutinesDisplay";

class Routines extends Component {
  render() {
    return (
      <ParentUserQuery>
        {({ data: { parentUser } = {} }) => {
          return <RoutinesDisplay dancerIds={parentUser.dancersIds} />;
        }}
      </ParentUserQuery>
    );
  }
}

export default Routines;
