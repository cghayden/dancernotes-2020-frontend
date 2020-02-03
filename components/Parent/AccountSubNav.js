import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import Signout from "../Signout";
import StyledLink from "../StyledLink";

function AccountSubNav() {
  return (
    <SubNavStyles>
      <h2 className="subNav-heading">Account</h2>
      <ul>
        <li>
          <StyledLink activeClassName="active" href="/parent/account/dancers">
            <a>Dancers</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" href="/parent/account/studios">
            <a>Studios</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" href="/parent/account/profile">
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
export default AccountSubNav;
