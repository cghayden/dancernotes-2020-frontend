import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import Signout from "../Signout";
import SidebarPosition from "../styles/SidebarPosition";
import StyledLink from "../StyledLink";

function AccountSubNav({ dancers }) {
  return (
    <SidebarPosition>
      <SubNavStyles>
        <h2 className="subNav-heading">Account</h2>
        <ul>
          <li>
            <StyledLink activeClassName="active" href="/parent/dancers">
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
        {/* <h2 className="subNav-heading">Dancers</h2>
        <ul>
          {dancers &&
            dancers.map(dancer => (
              <li key={dancer.id}>
                <StyledLink activeClassName="active" href={`/parent/dancers`}>
                  <a>{dancer.firstName}</a>
                </StyledLink>
              </li>
            ))}
        </ul> */}
      </SubNavStyles>
    </SidebarPosition>
  );
}
export default AccountSubNav;
