import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import StyledLink from "../StyledLink";

function ClassesSubNav() {
  return (
    <SubNavStyles>
      <h2 className="subNav-heading">Classes</h2>
      <ul>
        <li>
          <StyledLink activeClassName="active" href="createClass">
            <a>Create a Class</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" href="configureClassCategories">
            <a>Configure Class Categories</a>
          </StyledLink>
        </li>
      </ul>
    </SubNavStyles>
  );
}
export default ClassesSubNav;
