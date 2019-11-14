import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import Signout from "../Signout";
import SidebarPosition from "../styles/SidebarPosition";
import StyledLink from "../StyledLink";

function AccountSubNav() {
  return (
    <SidebarPosition>
      <SubNavStyles>
        <div className="blur-right"></div>
        <div className="blur-left"></div>
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
    </SidebarPosition>
  );
}
export default AccountSubNav;
