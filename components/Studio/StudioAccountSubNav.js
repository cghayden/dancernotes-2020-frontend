import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import Signout from "../Signout";
import StyledLink from "../StyledLink";

function StudioAccountSubNav() {
  return (
    <SubNavStyles>
      <h2 className="subNav-heading">Account</h2>
      <ul>
        <li>
          <StyledLink activeClassName="active" href="createClass">
            <a>Create a Class</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" href="retail">
            <a>Retailers</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" href="profile">
            <a>Profile</a>
          </StyledLink>
        </li>
        <li>
          <Signout />
        </li>
      </ul>
    </SubNavStyles>
  );
}
export default StudioAccountSubNav;
