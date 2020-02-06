import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { DesktopNavStyles } from "../styles/NavStyles";
import Signout from "../Signout";
import RequestsCount from "./RequestsCount";
import StyledLink from "../StyledLink";
import RequestsNavLink from "./RequestsNavLink";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

function StudioDesktopNav(props) {
  return (
    <DesktopNavStyles>
      <StyledLink activeClassName="active" href="/studio/home">
        <a>Home</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/studio/classes">
        <a>Classes</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/studio/dancers">
        <a>Dancers</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/studio/makeup">
        <a>Makeup</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/studio/hairstyles">
        <a>Hairstyles</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/studio/events">
        <a>Events</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/studio/account">
        <a>Account</a>
      </StyledLink>
      <RequestsNavLink />
      <Signout />
    </DesktopNavStyles>
  );
}

export default StudioDesktopNav;
