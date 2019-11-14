import Link from "next/link";
import SubNavStyles from "../styles/SubNavStyles";

import React, { Component } from "react";

export default class StudioAccountSubNav extends Component {
  render() {
    return (
      <SubNavStyles>
        <Link href="createClass">
          <a>Create a Class</a>
        </Link>
        <Link href="retail">
          <a>Retailers</a>
        </Link>
        <Link href="searchComps">
          <a>Find Comps/Conventions</a>
        </Link>
        <Link href="profile">
          <a>Profile</a>
        </Link>
      </SubNavStyles>
    );
  }
}
